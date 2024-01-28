<script lang="ts">
  import "../app.css";
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownHeader,
    DropdownDivider,
  } from "flowbite-svelte";
  import { SunSolid, MoonSolid } from "flowbite-svelte-icons";
  import { user_info_store } from "$lib/stores/user_store";
  import theme_store from "$lib/stores/theme_store";
  import { accentColors } from "$lib/stores/theme_store";
  import { is_logged_in } from "$lib/stores/user_store";
  import { bounceOut } from "svelte/easing";
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
    $accentColors.forEach((color) => {
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
</script>

<div class="text-ink-light dark:text-ink-dark bg-accent-50 dark:bg-accent-900">
  <Navbar class="dark:bg-accent-900 bg-accent-200 py-0">
    <NavBrand href="/">
      <span
        class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
        >TaskFlow</span
      >
    </NavBrand>

    <NavUl slideParams={{ delay: 10, duration: 10, easing: bounceOut }}>
      <NavLi href="/">Home</NavLi>
      {#if $is_logged_in}
        <NavLi href="/dashboard">Dashboard</NavLi>
        <NavLi href="/taskview">Task View</NavLi>
        <NavLi href="/insights">Insights</NavLi>
      {:else}
        <NavLi href="/login">Login</NavLi>
        <NavLi href="/register">Register</NavLi>
      {/if}
      <NavLi href="/about">About</NavLi>
    </NavUl>

    <div class="flex items-center md:order-2">
      {#if $is_logged_in}
        <Avatar id="avatar-menu" src={$user_info_store.dp_url} />

        <Dropdown placement="bottom" triggeredBy="#avatar-menu">
          <DropdownHeader>
            <span class="block text-sm">{$user_info_store.username}</span>
            <span class="block text-sm font-medium truncate"
              >{$user_info_store.email}</span
            >
          </DropdownHeader>
          <DropdownItem>
            <a href="/profile">Public Profile</a>
          </DropdownItem>
          <DropdownItem>
            <a href="/settings">Profile Settings</a>
          </DropdownItem>
          <DropdownDivider></DropdownDivider>
          <DropdownItem>
            <button on:click={signOut} class="w-full text-left">
              <span class="mr-2">👋</span>
              Sign out
            </button>
          </DropdownItem>
        </Dropdown>
      {/if}

      <div class="flex items-center justify-between p-4">
        <button
          on:click={toggleTheme}
          class="p-2 mx-3 bg-gray-200 rounded dark:bg-gray-700"
        >
          <span class="text-gray-800 dark:text-gray-200">
            {#if $theme_store.darkMode}
              <SunSolid />
            {:else}
              <MoonSolid />
            {/if}
          </span>
        </button>

        <Avatar
          id="theme-menu"
          src="https://png.pngtree.com/png-vector/20221010/ourmid/pngtree-theme-icon-vector-png-image_6293125.png"
          size="sm"
        />
        <Dropdown placement="bottom" triggeredBy="#theme-menu">
          <DropdownHeader>
            <span class="block text-sm">All Themes</span>
          </DropdownHeader>
          {#each $accentColors as color}
            <DropdownItem>
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
            </DropdownItem>
          {/each}
          <DropdownDivider />
        </Dropdown>
      </div>
    </div></Navbar
  >
  <slot />
</div>
