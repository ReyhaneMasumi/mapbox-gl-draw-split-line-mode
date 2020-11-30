import { geojsonTypes, modes } from "@mapbox/mapbox-gl-draw/src/constants";
import lineSplit from "@turf/line-split";
import combine from "@turf/combine";
import flatten from "@turf/flatten";
import { featureCollection } from "@turf/helpers";

const SplitLineMode = {
  onSetup: function ({ spliter }) {
    let main = this.getSelected().map((f) => f.toGeoJSON());
    if (main.length < 1)
      throw new Error("Please select a Linestring/MultiLinestring!");
    const state = {
      main,
      spliter: `passing_mode_${spliter}`,
    };
    return state;
  },

  toDisplayFeatures: function (state, geojson, display) {
    display(geojson);
    this.changeMode(state.spliter, (cut) => {
      state.main.forEach((mainFeature, idx) => {
        const splitedFeatures = [];
        flatten(mainFeature).features.forEach((feature) => {
          if (
            feature.geometry.type === geojsonTypes.LINE_STRING ||
            feature.geometry.type === geojsonTypes.MULTI_LINE_STRING
          ) {
            const afterCut = lineSplit(feature, cut);
            if (afterCut.features.length < 1)
              splitedFeatures.push(featureCollection([feature]));
            else splitedFeatures.push(afterCut);
          } else {
            throw new Error("The feature is not Linestring/MultiLinestring!");
          }
        });

        const collected = featureCollection(
          splitedFeatures.flatMap((featureColl) => featureColl.features)
        );
        const afterCutMultiLineString = combine(collected).features[0];
        afterCutMultiLineString.id = mainFeature.id;
        this._ctx.api.add(afterCutMultiLineString);
      });
    });
  },
};

export default SplitLineMode;
