<script lang="ts">
  import { CloseCircleSolid, CheckCircleSolid } from "flowbite-svelte-icons";
  import { Toast, Button, Label, Input } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import server_url from "$lib/stores/server_store";
  import type { SignInInfo } from "$lib/interfaces/user";
  import user_store, { is_logged_in } from "$lib/stores/user_store";

  let user_info: SignInInfo = {
    email: "",
    password: "",
  };

  let show_toast: boolean = false;
  let toast_type: string = "success";
  let toast_message: string = "";

  function enable_toast(error: boolean, message: string) {
    show_toast = true;
    toast_type = error ? "error" : "success";
    toast_message = message;
  }

  async function signIn() {
    console.log(user_info);

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user_info),
    };

    try {
      const response = await fetch($server_url + "/auth/signin", request);
      console.log(response);
      if (!response.ok) {
        enable_toast(true, "Invalid Credentials");
        console.error("Network response was not ok");
        return;
      }
      const data = await response.json();
      enable_toast(false, "Sign In Successful");
      localStorage.setItem(
        "access_token",
        "Bearer " + data.signInData.session.access_token
      );
      $is_logged_in = true;
      $user_store = data.userProfileData[0];
      localStorage.setItem("user", JSON.stringify(data.userProfileData[0]));
      goto("/dashboard");
    } catch (error) {
      console.error(error);
      enable_toast(true, "An error occurred during sign-in. Please try again.");
      return;
    }
  }
</script>

<svelte:head>
  <title>Sign In</title>
</svelte:head>

<div class="flex h-screen overflow-hidden">
  <div
    class="w-1/4 h-full flex flex-col justify-center items-center bg-gray-200 dark:bg-gray-900"
  >
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl dark:bg-gray-800 bg-white
      "
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form class="flex flex-col space-y-6">
          <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
            Sign In
          </h3>
          <Label class="space-y-2">
            <span>Email</span>
            <Input
              name="email"
              placeholder="abc@gmail.com"
              bind:value={user_info.email}
              required
            />
          </Label>
          <Label class="space-y-2">
            <span>Password</span>
            <Input
              type="password"
              name="password"
              bind:value={user_info.password}
              placeholder="•••••"
              required
            />
          </Label>
          <div class="flex items-start">
            <a
              href="/"
              class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
              >Forgot password?</a
            >
          </div>
          <Button
            on:click={() => {
              signIn();
            }}
            class="w-full1">Sign in</Button
          >
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet? <a
              href="/register"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >Sign up</a
            >
          </p>
        </form>
      </div>
    </div>
    {#if show_toast}
      <Toast
        on:close={() => {
          show_toast = false;
        }}
        color={toast_type === "error" ? "red" : "green"}
        class={toast_type === "error"
          ? "w-full max-w-xs p-4 text-gray-500 bg-red-200 shadow dark:text-gray-400 dark:bg-red-800 gap-3"
          : "w-full max-w-xs p-4 text-gray-500 bg-green-200 shadow dark:text-gray-400 dark:bg-green-800 gap-3"}
        position="bottom-right"
      >
        <svelte:fragment slot="icon">
          {#if toast_type === "error"}
            <CloseCircleSolid class="w-5 h-5" />
          {:else}
            <CheckCircleSolid class="w-5 h-5" />
          {/if}
        </svelte:fragment>
        <span>{toast_message}</span>
      </Toast>
    {/if}
  </div>

  <div
    class="w-3/4 h-full bg-cover bg-center typewriter"
    style="background-image: url('https://wallpaperset.com/w/full/3/f/6/31549.jpg');"
  >
    <div class="h-full flex flex-col justify-center items-start p-12">
      <h2
        class="text-4xl font-bold mb-4 typewriter-text text-white
      "
      >
        Welcome to TaskFlow
      </h2>
      <p
        class="text-xl typewriter-text text-white
      "
      >
        Manage your tasks efficiently and effectively.
      </p>
    </div>
  </div>
</div>

<style>
  .typewriter-text {
    overflow: hidden;
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: 0.15em;
    animation: typing 4s steps(40, end) forwards;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
</style>
