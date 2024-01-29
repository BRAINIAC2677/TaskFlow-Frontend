<script lang="ts">
  import {
    Toast,
    Button,
    Label,
    Input,
    Checkbox,
    A,
    Helper,
  } from "flowbite-svelte";
  import { fade, slide } from "svelte/transition";
  import { goto } from "$app/navigation";
  import server_url from "$lib/stores/server_store";
  import type { RegistrationInfo } from "$lib/interfaces/user";

  let new_user: RegistrationInfo = {
    first_name: "",
    middle_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  };
  let confirm_password: string = "";

  let show_mismatch_error: boolean = false;
  let show_toast: boolean = false;
  let toast_type: string = "success";
  let toast_message: string = "";

  function check_password(password: string) {
    if (password.length < 8) return false;
    let has_uppercase = false;
    let has_lowercase = false;
    let has_number = false;
    let has_special = false;
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= "A" && password[i] <= "Z") has_uppercase = true;
      else if (password[i] >= "a" && password[i] <= "z") has_lowercase = true;
      else if (password[i] >= "0" && password[i] <= "9") has_number = true;
      else has_special = true;
    }
    let score: number = 0;
    if (has_uppercase) score++;
    if (has_lowercase) score++;
    if (has_number) score++;
    if (has_special) score++;

    return score >= 2 ? true : false;
  }

  $: {
    if (new_user.password !== confirm_password && confirm_password !== "")
      show_mismatch_error = true;
    else show_mismatch_error = false;
  }

  async function register() {
    console.log(new_user);

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(new_user),
    };

    try {
      const response = await fetch($server_url + "/auth/signup", request);
      console.log(response);
      if (!response.ok) {
        console.error("Network response was not ok");
        return;
      }
      const data = await response.json();
      console.log("Registration successful", data);
      goto("/login");
    } catch (error) {
      console.error(error);
      return;
    }
  }
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div class="flex h-screen overflow-hidden">
  <div
    class="w-3/4 h-full bg-cover bg-center"
    style="background-image: url('https://wallpaperset.com/w/full/3/f/6/31549.jpg');"
  >
    <div class="h-full flex flex-col justify-center items-start p-12">
      <h2 class="text-4xl font-bold mb-4 typewriter-text text-white">
        Join TaskFlow Today
      </h2>
      <p class="text-xl typewriter-text text-white">
        Unleash your productivity.
      </p>
    </div>
  </div>

  <div
    class="w-1/4 h-full flex flex-col justify-center items-center bg-accent-50 dark:bg-gray-700"
    in:slide={{ delay: 300, duration: 500 }}
  >
    <div
      class="flex flex-col items-center justify-center px-6 mx-auto py-8 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl dark:bg-gray-800 bg-accent-100"
      in:fade={{ duration: 500 }}
    >
      <h2 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Register
      </h2>
      <form class="flex flex-col space-y-6" on:submit|preventDefault={register}>
        <div class="grid gap-6 pt-5 md:grid-cols-2">
          <div>
            <Label for="first_name" class="mb-2">First name</Label>
            <Input
              type="text"
              id="first_name"
              bind:value={new_user.first_name}
              required
            />
          </div>
          <div>
            <Label for="middle" class="mb-2">Middle name</Label>
            <Input
              type="text"
              id="middle_name"
              bind:value={new_user.middle_name}
            />
          </div>
          <div>
            <Label for="last_name" class="mb-2">Last name</Label>
            <Input
              type="text"
              id="last_name"
              bind:value={new_user.last_name}
              required
            />
          </div>
          <div>
            <Label for="username" class="mb-2">Username</Label>
            <Input
              type="text"
              id="username"
              bind:value={new_user.username}
              required
            />
          </div>
        </div>
        <div class="mb-6">
          <Label for="email" class="mb-2">Email address</Label>
          <Input type="email" id="email" required bind:value={new_user.email} />
        </div>
        <div class="mb-6">
          <Label for="password" class="mb-2">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="•••••••••"
            required
            bind:value={new_user.password}
          />
        </div>
        <div class="mb-6">
          <Label for="confirm_password" class="mb-2">Confirm password</Label>
          <Input
            type="password"
            id="confirm_password"
            placeholder="•••••••••"
            bind:value={confirm_password}
            required
          />
          {#if show_mismatch_error}
            <Helper class="mt-2" color="red">
              <span class="font-medium">Sorry!</span>
              Passwords do not match.
            </Helper>
          {/if}
        </div>
        <Checkbox class="mb-6 space-x-1 rtl:space-x-reverse" required>
          I agree with the <A
            href="/about"
            class="text-primary-700 dark:text-primary-600 hover:underline"
            >terms and conditions</A
          >.
        </Checkbox>
        <Button
          class="w-3/4 mx-auto"
          on:click={() => {
            if (new_user.password !== confirm_password) return;
            if (!check_password(new_user.password)) return;
            register();
          }}>Submit</Button
        >
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account? <A
            href="/login"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Sign in</A
          >.
        </p>
      </form>
    </div>
  </div>
</div>

<style>
  .typewriter-text {
    overflow: hidden;
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: 0.15em;
    animation:
      typing 4s steps(40, end) forwards,
      blink-caret 0.75s step-end infinite;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: white;
    }
  }
</style>
