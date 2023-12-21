import { writable } from "svelte/store";
import type { User } from "../interfaces/user";

const user_store = writable<User>({
  id: 1,
  first_name: "Arthur",
  last_name: "Morgan",
  user_name: "brainiac2677",
  img_url:
    "http://t2.gstatic.com/images?q=tbn:ANd9GcTyuioooFmNm7Ckj3BQvp_ELmzoRqFHGglph1R5TQKWAwxnTYllDQU1T8BGG96VlYQ1FFjO",
  email: "hello123@gmail.com",
  phone_number: "1234567890",
});

export default user_store;
