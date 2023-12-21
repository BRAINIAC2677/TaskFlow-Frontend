import { readable } from "svelte/store";
const server_url = readable("localhost:5173/"); // server address

export default server_url;
