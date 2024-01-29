import { writable } from "svelte/store";
import { readable } from "svelte/store";

export function get_color_hex_code(color_name: string): string {
  switch (color_name) {
    case "red":
      return "#FF0000";
    case "green":
      return "#00FF00";
    case "blue":
      return "#0000FF";
    case "yellow":
      return "#FFFF00";
    case "orange":
      return "#FFA500";
    default:
      return "#000000";
  }
}

export const accentColors = readable([
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
]);

// Create a writable store with a default value
const theme_store = writable({
  darkMode: false, // default value, will be updated after mount
  accentCurrentColor: "red", // default value, will be updated after mount
});

export default theme_store;
