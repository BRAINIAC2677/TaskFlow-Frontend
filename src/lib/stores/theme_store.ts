import { writable } from "svelte/store";

// Create a writable store with a default value
const theme_store = writable({
  darkMode: false, // default value, will be updated after mount
  accentCurrentColor: "red",
  accentColors: ["red", "green", "blue", "yellow", "orange"],
});

export default theme_store;
