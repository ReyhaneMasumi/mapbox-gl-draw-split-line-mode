[![NPM](https://img.shields.io/npm/v/mapbox-gl-draw-split-line-mode.svg)](https://www.npmjs.com/package/mapbox-gl-draw-split-line-mode)
![Develop](https://github.com/reyhanemasumi/mapbox-gl-draw-split-line-mode/workflows/Develop/badge.svg)
![Release](https://github.com/reyhanemasumi/mapbox-gl-draw-split-line-mode/workflows/Release/badge.svg)

# mapbox-gl-draw-split-line-mode

A custom mode for [MapboxGL-Draw](https://github.com/mapbox/mapbox-gl-draw) to split line

> Check [mapbox-gl-draw-split-polygon-mode](https://github.com/ReyhaneMasumi/mapbox-gl-draw-split-polygon-mode) For splitting polygons.
> Check [mapbox-gl-draw-cut-polygon-mode](https://github.com/ReyhaneMasumi/mapbox-gl-draw-cut-polygon-mode) For cut polygons.

## [DEMO](https://reyhanemasumi.github.io/mapbox-gl-draw-split-line-mode/)

![A Gif showing demo usage](demo/public/demo.gif)

## Install

```bash
npm install mapbox-gl-draw-split-line-mode mapbox-gl-draw-passing-mode
```

or use CDN:

```html
<script src="https://unpkg.com/mapbox-gl-draw-passing-mode"></script>
<script src="https://unpkg.com/mapbox-gl-draw-split-line-mode"></script>
```

## Usage

```js
import mapboxGl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import SplitLineMode from "mapbox-gl-draw-split-line-mode";
import mapboxGlDrawPassingMode from "mapbox-gl-draw-passing-mode";

const map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-91.874, 42.76], // starting position
  zoom: 12, // starting zoom
});

const draw = new MapboxDraw({
  userProperties: true,
  displayControlsDefault: false,
  modes: Object.assign(MapboxDraw.modes, {
    splitLineMode: SplitLineMode,
    passing_mode_point: mapboxGlDrawPassingMode(MapboxDraw.modes.draw_point),
    passing_mode_line_string: mapboxGlDrawPassingMode(
      MapboxDraw.modes.draw_line_string
    ),
    passing_mode_polygon: mapboxGlDrawPassingMode(
      MapboxDraw.modes.draw_polygon
    ),
  }),
});
map.addControl(draw);

// when mode drawing should be activated
draw.changeMode("splitLineMode", { splitter: mode }); //mode can be point,line_string or polygon
```

## [Example](https://github.com/ReyhaneMasumi/mapbox-gl-draw-split-line-mode/blob/main/demo/src/App.js)

## License

MIT © [ReyhaneMasumi](LICENSE)
