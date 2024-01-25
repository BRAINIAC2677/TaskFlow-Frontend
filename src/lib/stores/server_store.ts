import { readable } from "svelte/store";
const server_url = readable("http://192.168.0.113:3000");

export default server_url;
