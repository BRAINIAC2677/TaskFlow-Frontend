<script lang="ts">
  import {
    Label,
    Input,
    Helper,
    Spinner,
    Button,
    Popover,
  } from "flowbite-svelte";
  import { CheckOutline, CloseOutline } from "flowbite-svelte-icons";
  import { toast } from "@zerodevx/svelte-toast";
  import server_url from "$lib/stores/server_store";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  let new_password: string = "";
  let confirm_password: string = "";

  let changing_password: boolean = false;

  let both_case: boolean = false;
  let have_symbols: boolean = false;
  let score: number = 0;
  let password_match: number = 0; // 0: not retyped, 1: mismatch, 2: match

  $: {
    if (confirm_password === "" || new_password === "") password_match = 0;
    else if (new_password === confirm_password) password_match = 2;
    else password_match = 1;

    both_case = /[a-z]/.test(new_password) && /[A-Z]/.test(new_password);
    have_symbols = /[!@#$%^&*]/.test(new_password);
    score = 0;
    if (both_case) score++;
    if (have_symbols) score++;
    if (new_password.length >= 12) score += 2;
    else if (new_password.length >= 6) score++;
  }

  async function change_password() {
    let url = $page.url.href;
    let token = "";
    try {
      token = url.split("token=")[1].split("&")[0];
    } catch (error) {
      console.error(error);
      toast.push("Invalid token, please try again!", {
        theme: {
          "--toastBackground": "var(--accent-50)",
          "--toastProgressBackground": "var(--accent-100)",
          "--toastColor": "black",
        },
      });
    }

    const headers = new Headers({
      method: "POST",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    });

    const request = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        type: "reset",
        email: "",
        current_password: "",
        new_password: new_password,
      }),
    };

    try {
      const response = await fetch(
        $server_url + "/auth/change-password",
        request
      );
      if (!response.ok) {
        console.error(response);
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  $: does_match = new_password === confirm_password;
</script>

<svelte:head>
  <title>Enter New Password</title>
</svelte:head>

<div
  class="flex justify-center items-center min-h-screen bg-accent-50 dark:bg-gray-800"
>
  <div class="px-4 py-8 space-y-4 rounded-lg shadow-lg max-w-lg w-1/2 mx-auto">
    <span class="text-3xl font-bold text-center block">
      Enter New Password
    </span>
    <form
      class="space-y-2 divide-gray-200"
      on:submit|preventDefault={() => {
        changing_password = true;
        let success = false;
        change_password()
          .then((data) => {
            success = true;
            toast.push("Password changed successfully", {
              theme: {
                "--toastBackground": "var(--accent-50)",
                "--toastProgressBackground": "var(--accent-100)",
                "--toastColor": "black",
              },
            });
          })
          .catch((error) => {
            console.error(error);
            toast.push("An error occurred while changing your password", {
              theme: {
                "--toastBackground": "var(--accent-50)",
                "--toastProgressBackground": "var(--accent-100)",
                "--toastColor": "black",
              },
            });
          })
          .finally(() => {
            changing_password = false;
            if (success) {
              goto("/login");
            }
          });
      }}
    >
      <div class="grid gap-2 mb-3 md:grid-cols-1 pt-5 w-1/2">
        <div class="mb-6">
          <Label for="password" class="mb-2">Password</Label>
          <Input
            type="password"
            id="password"
            required
            bind:value={new_password}
          />
          {#if new_password.length > 0 && new_password.length < 6}
            <Helper class="mt-2" color="red">
              Password must be of at least <span class="font-medium"
                >6 characters</span
              >
            </Helper>
          {/if}
        </div>
        <div class="mb-6">
          <Label for="confirm_password" class="block mb-2"
            >Confirm Password</Label
          >
          <Input
            type="password"
            id="confirm_password"
            color={new_password === "" || confirm_password === ""
              ? "base"
              : does_match
                ? "green"
                : "red"}
            bind:value={confirm_password}
          />
          {#if new_password != "" && confirm_password != ""}
            {#if does_match}
              <Helper class="mt-2" color="green">
                <span class="font-medium">Well done!</span>
                Passwords match.
              </Helper>
            {:else}
              <Helper class="mt-2" color="red">
                <span class="font-medium">Sorry!</span>
                Passwords do not match.
              </Helper>
            {/if}
          {/if}
        </div>
      </div>

      <div class="flex justify-end">
        {#if changing_password}
          <Button
            class="ml-3 bg-accent-300 disabled:hover:bg-accent-300 hover:bg-accent-500 dark:bg-accent-700 disabled:dark:hover:bg-accent-700 dark:hover:bg-accent-800 text-ink-light dark:text-ink-dark py-2 px-4 rounded-md transition duration-150 ease-in-out font-bold disabled:opacity-50"
          >
            <Spinner class="me-3" size="4" color="white" /> Updating ...
          </Button>
        {:else}
          <Button
            type="submit"
            disabled={new_password.length < 6 ||
              new_password != confirm_password}
            class="ml-3 bg-accent-300 disabled:hover:bg-accent-300 hover:bg-accent-500 dark:bg-accent-700 disabled:dark:hover:bg-accent-700 dark:hover:bg-accent-800 text-ink-light dark:text-ink-dark py-2 px-4 rounded-md transition duration-150 ease-in-out font-bold disabled:opacity-50"
            >Change Password</Button
          >
        {/if}
      </div>
    </form>
  </div>
</div>

<Popover class="text-sm" triggeredBy="#password" placement="top">
  <h3 class="font-semibold text-gray-900 dark:text-white">
    Must have at least 6 characters
  </h3>
  <div class="grid grid-cols-4 gap-2">
    <!-- score number of oranges -->
    {#each Array(score) as _, i}
      <div class="h-1 bg-orange-300 dark:bg-orange-400" />
    {/each}
    <!-- 4 - score number of grays -->
    {#each Array(4 - score) as _, i}
      <div class="h-1 bg-gray-200 dark:bg-gray-600" />
    {/each}
  </div>
  <p class="py-2">It’s better to have:</p>
  <ul>
    <li class="flex items-center mb-1">
      {#if both_case}
        <CheckOutline class="me-2 w-4 h-4 text-green-400 dark:text-green-500" />
      {:else}
        <CloseOutline class="me-2 w-4 h-4 text-gray-300 dark:text-gray-400" />
      {/if}
      Upper &amp; lower case letters
    </li>
    <li class="flex items-center mb-1">
      {#if have_symbols}
        <CheckOutline class="me-2 w-4 h-4 text-green-400 dark:text-green-500" />
      {:else}
        <CloseOutline class="me-2 w-4 h-4 text-gray-300 dark:text-gray-400" />
      {/if}
      A symbol (#$&amp;)
    </li>
    <li class="flex items-center">
      {#if new_password.length >= 12}
        <CheckOutline class="me-2 w-4 h-4 text-green-400 dark:text-green-500" />
      {:else}
        <CloseOutline class="me-2 w-4 h-4 text-gray-300 dark:text-gray-400" />
      {/if}
      A longer password (min. 12 chars.)
    </li>
  </ul>
</Popover>
