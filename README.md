[![NPM](https://img.shields.io/npm/v/mapbox-gl-draw-split-line-mode.svg)](https://www.npmjs.com/package/mapbox-gl-draw-split-line-mode)
![Develop](https://github.com/reyhanemasumi/mapbox-gl-draw-split-line-mode/workflows/Develop/badge.svg)
![Release](https://github.com/reyhanemasumi/mapbox-gl-draw-split-line-mode/workflows/Release/badge.svg)

# mapbox-gl-draw-split-line-mode

A custom mode for [MapboxGL-Draw](https://github.com/mapbox/mapbox-gl-draw) to split line

## [DEMO](https://reyhanemasumi.github.io/mapbox-gl-draw-split-line-mode/)

## Install

```bash
npm install mapbox-gl-draw-split-line-mode
```

## Usage

```js
import mapboxGl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import SplitLineMode from 'mapbox-gl-draw-split-line-mode';

const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-91.874, 42.76], // starting position
  zoom: 12, // starting zoom
});

const draw = new MapboxDraw({
  userProperties: true,
  displayControlsDefault: false,
  modes: Object.assign(MapboxDraw.modes, {
    splitLineMode: SplitLineMode,
  }),
});
map.addControl(draw);

// when mode drawing should be activated
draw.changeMode('splitLineMode');
```

## [Example](https://github.com/ReyhaneMasumi/mapbox-gl-draw-split-line-mode/blob/main/demo/src/App.js)

## License

MIT © [ReyhaneMasumi](LICENSE)
