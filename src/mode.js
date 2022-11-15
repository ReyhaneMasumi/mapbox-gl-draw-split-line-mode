import { geojsonTypes, events } from "@mapbox/mapbox-gl-draw/src/constants";

import lineSplit from "@turf/line-split";
import combine from "@turf/combine";
import flatten from "@turf/flatten";
import { featureCollection } from "@turf/helpers";

import { modeName, highlightPropertyName, defaultOptions } from "./constants";

const SplitLineMode = {
  onSetup: function (opt) {
    const { splitTool, highlightColor, lineWidth, lineWidthUnit } = opt || {};

    const main = this.getSelected()
      .filter(
        (f) =>
          f.type === geojsonTypes.LINE_STRING ||
          f.type === geojsonTypes.MULTI_LINE_STRING
      )
      .map((f) => f.toGeoJSON());

    console.log("🚀 ~ file: mode.js ~ line 15 ~ main", main);

    if (main.length < 1)
      throw new Error("Please select a Linestring/MultiLinestring!");

    const api = this._ctx.api;

    /// `onSetup` job should complete for this mode to work.
    /// so `setTimeout` is used to bupass mode change after `onSetup` is done executing.
    setTimeout(() => {
      const passingModeName = `${modeName}_passing_draw_${splitTool}`;
      this.changeMode(passingModeName, {
        onDraw: (cuttingLineString) => {
          const splitedFeatures = [];
          main.forEach((mainFeature) => {
            flatten(mainFeature).features.forEach((feature) => {
              if (
                feature.geometry.type === geojsonTypes.LINE_STRING ||
                feature.geometry.type === geojsonTypes.MULTI_LINE_STRING
              ) {
                const afterCut = lineSplit(feature, cuttingLineString);
                if (afterCut.features.length < 1)
                  splitedFeatures.push(featureCollection([feature]));
                else splitedFeatures.push(afterCut);
              } else {
                throw new Error(
                  "The feature is not Linestring/MultiLinestring!"
                );
              }
            });

            const collected = featureCollection(
              splitedFeatures.flatMap((featureColl) => featureColl.features)
            );
            const afterCutMultiLineString = combine(collected).features[0];
            afterCutMultiLineString.id = mainFeature.id;
            api.add(afterCutMultiLineString);
          });

          this.fireUpdate(splitedFeatures);

          if (main?.[0]?.id)
            api.setFeatureProperty(
              main[0].id,
              highlightPropertyName,
              undefined
            );
        },
        onCancel: () => {
          if (main?.[0]?.id)
            api.setFeatureProperty(
              main[0].id,
              highlightPropertyName,
              undefined
            );
        },
      });
    }, 0);

    if (main?.[0]?.id)
      api.setFeatureProperty(
        main[0].id,
        highlightPropertyName,
        highlightColor || defaultOptions.highlightColor
      );

    return { main };
  },

  toDisplayFeatures: function (state, geojson, display) {
    display(geojson);
  },

  fireUpdate: function (newF) {
    this.map.fire(events.UPDATE, {
      action: "SplitLine",
      features: newF,
    });
  },
};

export default SplitLineMode;
