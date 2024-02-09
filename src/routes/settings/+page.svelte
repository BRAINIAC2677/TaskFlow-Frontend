<script lang="ts">
  import { user_info_store } from "$lib/stores/user_store";
  import type { RegistrationInfo } from "$lib/interfaces/user";
  import { Label, Input, Helper } from "flowbite-svelte";
  import { EnvelopeSolid, UserOutline } from "flowbite-svelte-icons";
  import server_url from "$lib/stores/server_store";

  let user_info: RegistrationInfo = {
    first_name: $user_info_store.first_name,
    middle_name: $user_info_store.middle_name,
    last_name: $user_info_store.last_name,
    username: $user_info_store.username,
    email: $user_info_store.email,
    password: "",
  };

  let current_password: string = "";
  let new_password: string = "";
  let confirm_new_password: string = "";

  async function update_user_info(): Promise<void> {
    const headers = new Headers({
      Authorization: localStorage.getItem("access_token") || "",
      "Content-Type": "application/json",
    });

    const request = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        first_name: user_info.first_name,
        middle_name: user_info.middle_name,
        last_name: user_info.last_name,
        username: user_info.username,
        email: user_info.email,
      }),
    };

    try {
      const response = await fetch($server_url + "/profile/update", request);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  let unchanged: boolean = false;

  $: does_match = new_password === confirm_new_password;
  $: {
    unchanged =
      user_info.first_name === $user_info_store.first_name &&
      user_info.middle_name === $user_info_store.middle_name &&
      user_info.last_name === $user_info_store.last_name &&
      user_info.username === $user_info_store.username &&
      user_info.email === $user_info_store.email;
  }
</script>

<svelte:head>
  <title>Profile Settings</title>
</svelte:head>

<div
  class="container mx-auto p-8 bg-accent-50 my-5 h-full shadow-lg rounded-lg w-2/3"
>
  <form class="space-y-8 divide-gray-200">
    <div class="flex flex-col space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-6">
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img
            src="https://unsplash.it/200/200"
            alt="Profile Picture"
            class="h-24 w-24 rounded-full object-cover"
          />
          <div>
            <div class="text-xl font-bold">
              {$user_info_store.first_name + " " + $user_info_store.last_name}
            </div>
          </div>
        </div>
        <div class="flex">
          <button
            type="button"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
            >Upload New Photo</button
          >
          <button
            type="button"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out ml-2"
            >Delete</button
          >
        </div>
      </div>
    </div>

    <!-- Contact Information -->
    <div class="grid gap-6 mb-6 md:grid-cols-2 pt-5">
      <div>
        <Label for="first_name" class="mb-2">First Name</Label>
        <Input type="text" id="first_name" bind:value={user_info.first_name} />
      </div>
      <div>
        <Label for="middle_name" class="mb-2">Middle Name</Label>
        <Input
          type="text"
          id="middle_name"
          bind:value={user_info.middle_name}
        />
      </div>
      <div>
        <Label for="last_name" class="mb-2">Last Name</Label>
        <Input type="text" id="last_name" bind:value={user_info.last_name} />
      </div>
      <div>
        <Label for="last_name" class="mb-2">Username</Label>
        <Input type="text" id="last_name" bind:value={user_info.username}>
          <UserOutline slot="left" class="w-4 h-4" />
        </Input>
      </div>
    </div>
    <div class="mb-6 w-1/2">
      <Label for="email" class="mb-2">Email Address</Label>
      <Input type="email" id="email">
        <EnvelopeSolid slot="left" class="w-4 h-4" />
      </Input>
    </div>
    <div class="pt-5">
      <div class="flex justify-end">
        <button
          type="submit"
          disabled={unchanged}
          on:click|preventDefault={update_user_info}
          class="ml-3 bg-accent-600 hover:bg-accent-700 dark:bg-accent-700 dark:hover:bg-accent-800 text-ink-light dark:text-ink-dark py-2 px-4 rounded-md transition duration-150 ease-in-out font-bold disabled:opacity-50"
          >Save Changes</button
        >
      </div>
    </div>

    <div class="grid gap-2 mb-3 md:grid-cols-1 pt-5 w-1/2">
      <div class="mb-6">
        <Label for="password" class="mb-2">Current Password</Label>
        <Input type="password" id="password" bind:value={current_password} />
      </div>
      <div class="mb-6">
        <Label for="password" class="mb-2">New Password</Label>
        <Input type="password" id="new_password" bind:value={new_password} />
      </div>
      <div class="mb-6">
        <Label for="success" class="block mb-2">Confirm Password</Label>
        {#if new_password === "" || confirm_new_password === ""}
          <Input
            type="password"
            id="confirm_password"
            bind:value={confirm_new_password}
          />
        {:else if does_match}
          <Input
            type="password"
            id="success"
            color="green"
            bind:value={confirm_new_password}
          />
          <Helper class="mt-2" color="green">
            <span class="font-medium">Well done!</span>
            Passwords match.
          </Helper>
        {:else}
          <Input
            type="password"
            id="success"
            color="red"
            bind:value={confirm_new_password}
          />
          <Helper class="mt-2" color="red">
            <span class="font-medium">Oh, snapp!</span>
            Passwords do not match.
          </Helper>
        {/if}
      </div>
    </div>
    <div class="flex justify-end">
      <button
        type="submit"
        on:click|preventDefault={() => {}}
        class="ml-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out font-bold"
        >Update Password</button
      >
    </div>
  </form>
</div>
