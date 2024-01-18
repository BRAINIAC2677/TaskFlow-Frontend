<script>
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
  import user_store from "$lib/stores/user_store";
</script>

<Navbar>
  <NavBrand href="/">
    <span
      class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
      >TaskFlow</span
    >
  </NavBrand>
  <div class="flex items-center md:order-2">
    <Avatar id="avatar-menu" src={$user_store.img_url} />
    <NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
  </div>
  <Dropdown placement="bottom" triggeredBy="#avatar-menu">
    <DropdownHeader>
      <span class="block text-sm">{$user_store.user_name}</span>
      <span class="block text-sm font-medium truncate">{$user_store.email}</span
      >
    </DropdownHeader>
    <DropdownItem>
      <a href="/profile">Public Profile</a>
    </DropdownItem>
    <DropdownItem>
      <a href="/settings">Profile Settings</a>
    </DropdownItem>
    <DropdownDivider />
    <DropdownItem>Sign out</DropdownItem>
  </Dropdown>
  <NavUl>
    <NavLi href="/" active={true}>Dashboard</NavLi>
    <NavLi href="/taskview">Task View</NavLi>
    <NavLi href="/insights">Insights</NavLi>
    <NavLi href="/about">About</NavLi>
  </NavUl>
</Navbar>
<slot />
