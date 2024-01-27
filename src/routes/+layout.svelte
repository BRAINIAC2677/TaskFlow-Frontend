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
</script>

<svelte:head>
  <script>
    $theme_store.darkMode = localStorage.getItem("theme") === "dark";
    $theme_store.accentMode = parseInt(localStorage.getItem("accent") || "0");
    setThemeClass();
    setAccentClass($theme_store.accentMode);
  </script>
</svelte:head>

<div class="text-ink-light dark:text-ink-dark bg-accent-50 dark:bg-accent-900">
  <Navbar class="dark:bg-accent-900 bg-accent-50">
    <NavBrand href="/">
      <span
        class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
        >TaskFlow</span
      >
    </NavBrand>
    <div class="flex items-center md:order-2">
      <Avatar id="avatar-menu" src={$user_store.img_url} />
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
        <span class="block text-sm">{$user_store.user_name}</span>
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
      <DropdownItem>Sign out</DropdownItem>
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
