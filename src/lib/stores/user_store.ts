import { writable } from "svelte/store";
import type { User } from "../interfaces/user";

export const user_store = writable<User>();

export const is_logged_in = writable<boolean>(false);
export default user_store;
