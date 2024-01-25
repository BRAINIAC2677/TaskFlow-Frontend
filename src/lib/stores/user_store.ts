import { writable } from "svelte/store";
import type { User } from "../interfaces/user";

// for temporary testing
const bearer_token = writable<string>(
  "Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IndCOXVXdktUUGFPNWx2eFQiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA2MjA2NTc5LCJpYXQiOjE3MDYyMDI5NzksImlzcyI6Imh0dHBzOi8vZXdwZHZpeHFtZXFtc3ZrdWN0YXQuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjgyZWFjM2EwLTU5NzgtNDI1OS04NjM4LWRmZjYzODcwN2MwMCIsImVtYWlsIjoiYXNpZmF6YWQwMTc4QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzA2MjAyOTc5fV0sInNlc3Npb25faWQiOiJkODE1MGZiZS0xMTJmLTRlMTItYmVlMC1jNDM4MzAzZmVjNjIifQ.o7jnvTiCPNfqeLclUV2390rcXM2haIB4P_tzs4a9aRA"
);

const user_store = writable<User>({
  id: 1,
  first_name: "Arthur",
  last_name: "Morgan",
  user_name: "brainiac2677",
  img_url:
    "http://t2.gstatic.com/images?q=tbn:ANd9GcTyuioooFmNm7Ckj3BQvp_ELmzoRqFHGglph1R5TQKWAwxnTYllDQU1T8BGG96VlYQ1FFjO",
  email: "hello123@gmail.com",
  phone_number: "01234567890",
});

export { bearer_token };
export default user_store;
