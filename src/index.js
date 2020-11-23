import {
  geojsonTypes,
  modes,
  events,
} from '@mapbox/mapbox-gl-draw/src/constants';
import lineSplit from '@turf/line-split';

const SplitLineMode = {
  onSetup: function ({ spliter }) {
    let main = this.getSelected().map((f) => f.toGeoJSON());
    const state = {
      main,
      spliter: modes[`DRAW_${spliter}`],
    };
    return state;
  },

  onClick: function (state, e) {
    if (state.main.length > 0) {
      this.changeMode(state.spliter);
      let cut;
      this.map.once(events.CREATE, (e) => {
        cut = e.features[0];
        state.main.forEach((feature, idx) => {
          if (
            feature.geometry.type === geojsonTypes.LINE_STRING ||
            feature.geometry.type === geojsonTypes.MULTI_LINE_STRING
          ) {
            let afterCut = lineSplit(feature, cut);
            if (afterCut.features.length < 1) return;
            afterCut.features.forEach((el) => {
              let newF = this.newFeature(el);
              this.addFeature(newF);
            });
            this.deleteFeature([feature.id], { silent: true });
          } else {
            throw new Error('The feature is not Linestring/MultiLinestring!');
          }
        });
        this.deleteFeature([cut.id], { silent: true });
        this.exitMode();
      });
    } else {
      state.main = this.getFeature(e.featureTarget.properties.id).toGeoJSON();
      let cut;
      this.changeMode(state.spliter);
      this.map.once(events.CREATE, (e) => {
        cut = e.features[0];
        if (
          state.main.geometry.type === geojsonTypes.LINE_STRING ||
          state.main.geometry.type === geojsonTypes.MULTI_LINE_STRING
        ) {
          let afterCut = lineSplit(state.main, cut);
          if (afterCut.features.length < 1) return;
          afterCut.features.forEach((el) => {
            let newF = this.newFeature(el);
            this.addFeature(newF);
          });
          this.deleteFeature([cut.id], { silent: true });
          this.deleteFeature([state.main.id], { silent: true });
        } else {
          throw new Error('The feature is not Linestring/MultiLinestring!');
        }
        this.exitMode();
      });
    }
  },

  onTap: function (state, e) {
    return this.onClick(state, e);
  },

  toDisplayFeatures: function (state, geojson, display) {
    display(geojson);
  },

  onKeyUp: function (state, e) {
    if (e.keyCode === 27) return this.exitMode();
  },

  exitMode: function (state, e) {
    return this.changeMode(modes.SIMPLE_SELECT);
  },
};

export default SplitLineMode;
