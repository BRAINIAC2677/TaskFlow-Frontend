<script lang="ts">
  import "../app.css";
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownHeader,
    DropdownDivider,
  } from "flowbite-svelte";
  import { SunSolid, MoonSolid } from "flowbite-svelte-icons";
  import user_store from "$lib/stores/user_store";
  import theme_store from "$lib/stores/theme_store";
  import { onMount } from "svelte";
  import { is_logged_in } from "$lib/stores/user_store";
  import server_url from "$lib/stores/server_store";
  import { goto } from "$app/navigation";

  function setThemeClass() {
    if ($theme_store.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function toggleTheme() {
    $theme_store.darkMode = !$theme_store.darkMode;
    localStorage.setItem("theme", $theme_store.darkMode ? "dark" : "light");
    setThemeClass();
  }

  function setAccentClass(_accent_color: string) {
    $theme_store.accentColors.forEach((color) => {
      document.documentElement.classList.remove(`accent-${color}`);
    });
    document.documentElement.classList.add(`accent-${_accent_color}`);
  }

  function changeAccent(_accent_color: string) {
    $theme_store.accentCurrentColor = _accent_color;
    localStorage.setItem("accent", _accent_color);
    setAccentClass(_accent_color);
  }

  async function signOut() {
    const headers = new Headers({
      authorization: localStorage.getItem("access_token") || "",
      "Content-Type": "application/json",
    });

    try {
      const response = await fetch($server_url + "/auth/signout", {
        method: "POST",
        headers: headers,
      });

      console.log(response);
      // logging out anyway
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      $is_logged_in = false;
    } catch (error) {
      console.error(error);
    }

    goto("/login");
  }

  function fix_user_stores() {
    if (localStorage.getItem("user")) {
      $user_store = JSON.parse(localStorage.getItem("user") || "");
      $is_logged_in = true;
    } else {
      $user_store = {
        id: "",
        username: "",
        email: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        dp_url: "",
      };
      $is_logged_in = false;
    }
  }

  $: console.log($user_store, $is_logged_in);

  onMount(() => {
    fix_user_stores();
    if (!$user_store.dp_url || $user_store.dp_url === "") {
      $user_store.dp_url =
        "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg";
    }
    $theme_store.accentCurrentColor = localStorage.getItem("accent") || "red";
    $theme_store.darkMode = localStorage.getItem("theme") === "dark";
  });
</script>

<div class="text-ink-light dark:text-ink-dark bg-accent-50 dark:bg-accent-900">
  <Navbar class="dark:bg-accent-900 bg-accent-50">
    <NavBrand href="/">
      <span
        class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
        >TaskFlow</span
      >
    </NavBrand>
    <div class="flex items-center md:order-2">
      <!-- {#if $user_store.dp_url != undefined && $user_store.dp_url !== ""}
        <Avatar id="avatar-menu" src={$user_store.dp_url} />
      {:else} -->
      <Avatar
        id="avatar-menu"
        src="https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg"
      />
      <!-- {/if} -->
      <button
        on:click={toggleTheme}
        class="p-2 mx-3 bg-gray-200 rounded dark:bg-gray-700"
      >
        <!-- replace with your toggle mode icon -->
        <span class="text-gray-800 dark:text-gray-200">
          {#if $theme_store.darkMode}
            <!-- icon for light mode -->
            <SunSolid />
          {:else}
            <!-- icon for dark mode -->
            <MoonSolid />
          {/if}
        </span>
      </button>

      <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
    </div>
    <Dropdown placement="bottom" triggeredBy="#avatar-menu">
      <DropdownHeader>
        <span class="block text-sm">{$user_store.username}</span>
        <span class="block text-sm font-medium truncate"
          >{$user_store.email}</span
        >
      </DropdownHeader>
      <DropdownItem>
        <a href="/profile">Public Profile</a>
      </DropdownItem>
      <DropdownItem>
        <a href="/settings">Profile Settings</a>
      </DropdownItem>
      <DropdownDivider />

      <!-- Color theme selector starts here -->
      <div class="flex items-center justify-between p-4">
        {#each $theme_store.accentColors as color}
          {#if $theme_store.accentCurrentColor === color}
            <button
              class="cursor-pointer rounded-full border-8 border-{color}-500 text-{color}-500 w-8 h-8"
              on:click={() => changeAccent(color)}
            >
            </button>
          {:else}
            <button
              class="cursor-pointer rounded-full border-8 border-{color}-300 text-{color}-500 w-4 h-4"
              on:click={() => changeAccent(color)}
            >
            </button>
          {/if}
        {/each}
      </div>
      <!-- Color theme selector ends here -->

      <DropdownDivider />
      <DropdownItem>
        <button on:click={signOut} class="w-full text-left">
          <!-- replace with your icon -->
          <span class="mr-2">👋</span>
          Sign out
        </button>
      </DropdownItem>
    </Dropdown>
    <NavUl>
      <NavLi href="/dashboard" active={true}>Dashboard</NavLi>
      <NavLi href="/taskview">Task View</NavLi>
      <NavLi href="/insights">Insights</NavLi>
      <NavLi href="/about">About</NavLi>
    </NavUl>
  </Navbar>
  <slot />
</div>
