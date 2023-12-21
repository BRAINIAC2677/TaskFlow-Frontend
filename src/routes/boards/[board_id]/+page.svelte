<script lang="ts">
  import type { Board } from "$lib/interfaces/board";
  import ListCard from "./ListCard.svelte";
  import { sineIn } from "svelte/easing";
  import {
    Drawer,
    Sidebar,
    SidebarDropdownItem,
    SidebarDropdownWrapper,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from "flowbite-svelte";
  import {
    ChartPieSolid,
    ShoppingCartSolid,
    GridSolid,
    MailBoxSolid,
    UsersSolid,
    BagSolid,
    ArrowRightToBracketSolid,
    AnnotationSolid,
    ClipboardCheckSolid,
    AngleRightSolid,
    AngleLeftSolid,
    FileEditSolid,
  } from "flowbite-svelte-icons";

  let recent_board_ids = [1, 2, 3];
  let your_board_ids = [1, 2, 3];

  let hiddenSideBar = true;
  let spanClass = "flex-1 ms-3 whitespace-nowrap";
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };
  export let data: any;
  let board: Board = data.board;
  function toggleSidebar() {
    hiddenSideBar = !hiddenSideBar;
  }
</script>

<div class="flex h-screen bg-white dark:bg-gray-800">
  <button
    on:click={toggleSidebar}
    class="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100"
  >
    <AngleRightSolid />
  </button>
  <Drawer
    transitionType="fly"
    {transitionParams}
    bind:hidden={hiddenSideBar}
    id="sidebar2"
    backdrop={false}
    leftOffset="top-16 h-screen start-0"
    width="w-72"
  >
    <div class="flex items-center justify-between px-3">
      <h5
        id="drawer-navigation-label-3"
        class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        Hello, Asif
      </h5>
      <button
        on:click={toggleSidebar}
        class="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-100"
      >
        <AngleLeftSolid />
      </button>
    </div>
    <Sidebar>
      <SidebarWrapper
        divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800"
      >
        <SidebarGroup>
          <SidebarItem label="Board Settings">
            <svelte:fragment slot="icon">
              <ChartPieSolid
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
            </svelte:fragment>
          </SidebarItem>
          <SidebarItem label="Members">
            <svelte:fragment slot="icon">
              <UsersSolid
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
            </svelte:fragment>
          </SidebarItem>

          <SidebarDropdownWrapper label="Recent Boards">
            <svelte:fragment slot="icon">
              <AnnotationSolid
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
            </svelte:fragment>
            {#each recent_board_ids as id}
              <SidebarDropdownItem
                label="Board {id}"
                target="_self"
                href={`/boards/${id}`}
              />
            {/each}
          </SidebarDropdownWrapper>
          <SidebarDropdownWrapper label="Your Boards">
            <svelte:fragment slot="icon">
              <ClipboardCheckSolid
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
            </svelte:fragment>
            {#each your_board_ids as id}
              <SidebarDropdownItem label="Board {id}" href={`/boards/${id}`} />
            {/each}
          </SidebarDropdownWrapper>

          <SidebarItem label="Log out">
            <svelte:fragment slot="icon">
              <FileEditSolid
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
            </svelte:fragment>
          </SidebarItem>
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>
  </Drawer>

  <!-- Main content -->
  <div
    class={`flex-grow p-4 ${
      !hiddenSideBar ? "ml-72" : "ml-0"
    } transition-margin duration-300`}
  >
    <div class="grid grid-cols-4 gap-4">
      {#each board.lists as list}
        <ListCard {list} />
      {/each}
      <button
        class="p-3 text-white bg-gray-700 rounded dark:bg-gray-700 dark:text-gray-200"
        >+ Add another list</button
      >
    </div>
  </div>
</div>

<style>
  .transition-width {
    transition: width 0.5s;
  }
</style>
