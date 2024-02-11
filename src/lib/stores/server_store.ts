import { readable } from "svelte/store";
const server_url = readable("http://localhost:3000");

export default server_url;