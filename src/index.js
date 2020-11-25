import { geojsonTypes, modes } from '@mapbox/mapbox-gl-draw/src/constants';
import lineSplit from '@turf/line-split';

const SplitLineMode = {
  onSetup: function ({ spliter }) {
    let main = this.getSelected().map((f) => f.toGeoJSON());
    if (main.length < 1)
      throw new Error('Please select a Linestring/MultiLinestring!');
    const state = {
      main,
      spliter: `passing_mode_${spliter}`,
    };
    return state;
  },

  toDisplayFeatures: function (state, geojson, display) {
    display(geojson);
    this.changeMode(state.spliter, (cut) => {
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
    });
  },

  onKeyUp: function (state, e) {
    if (e.keyCode === 27) return this.exitMode();
  },

  exitMode: function (state, e) {
    return this.changeMode(modes.SIMPLE_SELECT);
  },
};

export default SplitLineMode;
