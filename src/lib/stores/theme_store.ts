import { writable } from "svelte/store";
import { readable } from "svelte/store";

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
