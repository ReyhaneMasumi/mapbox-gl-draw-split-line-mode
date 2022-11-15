import { default as splitLineStringMode } from "./mode.js";
import { default as drawStyles } from "./customDrawStyles.js";

import {
  passing_draw_point,
  passing_draw_line_string,
  passing_draw_polygon,
} from "mapbox-gl-draw-passing-mode";

import { modeName } from "./constants";

export { splitLineStringMode };
export { drawStyles };

export default function SplitLineStringMode(modes) {
  return {
    ...modes,
    [`${modeName}_passing_draw_point`]: passing_draw_point,
    [`${modeName}_passing_draw_line_string`]: passing_draw_line_string,
    [`${modeName}_passing_draw_polygon`]: passing_draw_polygon,
    [modeName]: splitLineStringMode,
  };
}
