<script lang="ts">
  import ListCard from "./ListCard.svelte";
  import NewListModal from "$lib/components/NewListModal.svelte";
  import { sineIn } from "svelte/easing";
  import server_url from "$lib/stores/server_store";
  import type { BoardContent } from "$lib/interfaces/board";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { user_info_store } from "$lib/stores/user_store";
  import { Wave } from "svelte-loading-spinners";
  import { get_color_hex_code } from "$lib/stores/theme_store";
  import theme_store from "$lib/stores/theme_store";
  import { fade } from "svelte/transition";
  import {
    Drawer,
    Sidebar,
    SidebarDropdownWrapper,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper,
  } from "flowbite-svelte";
  import {
    PieChartSolid,
    UsersSolid,
    AnnotationSolid,
    ClipboardCheckSolid,
    AngleRightSolid,
    AngleLeftSolid,
    FileCodeSolid,
  } from "flowbite-svelte-icons";
  let formModal = false;

  let hiddenSideBar = true;
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };

  function toggleSidebar() {
    hiddenSideBar = !hiddenSideBar;
  }

  async function fetchBoardContent() {
    const token: string = localStorage.getItem("access_token") || "";
    const headers = new Headers({
      Authorization: token,
      "Content-Type": "application/json",
    });

    try {
      const url = new URL($server_url + "/board/get-content");
      console.log("id", $page.params.board_id);
      url.searchParams.set("board_id", $page.params.board_id);
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  let spinner_color: string = "#000000";
  $: {
    spinner_color = get_color_hex_code($theme_store.accentCurrentColor);
  }

  let content_loading: boolean = false;
  let board_content: BoardContent;
  import type { BoardContentListForm } from "$lib/interfaces/list";
  let tasklist_collection: BoardContentListForm[] =
    Array<BoardContentListForm>();
  onMount(async () => {
    console.log("Fetching board content");
    try {
      content_loading = true;
      if ($page.params.board_id) {
        board_content = await fetchBoardContent();
      }
      board_content.board_lists.forEach((list) => {
        tasklist_collection.push(list);
      });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      content_loading = false;
    }
  });
</script>

<svelte:head>
  <title>Board Content</title>
</svelte:head>

<div class="flex h-screen bg-accent-50 dark:bg-accent-900">
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
    divClass="bg-accent-100 dark:bg-accent-700 shadow-lg dark:shadow-none"
    width="w-72"
  >
    <div class="flex items-center justify-between px-3">
      <h5
        id="drawer-navigation-label-3"
        class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        Hello, {$user_info_store.username}
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
              <PieChartSolid
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
            <!-- this can be later added from database -->
            <!-- {#each recent_board_ids as id}
                <SidebarDropdownItem
                  label="Board {id}"
                  target="_self"
                  href={`/boards/${id}`}
                />
              {/each} -->
          </SidebarDropdownWrapper>
          <SidebarDropdownWrapper label="Your Boards">
            <svelte:fragment slot="icon">
              <ClipboardCheckSolid
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
            </svelte:fragment>
          </SidebarDropdownWrapper>

          <SidebarItem label="Log out">
            <svelte:fragment slot="icon">
              <FileCodeSolid
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
            </svelte:fragment>
          </SidebarItem>
        </SidebarGroup>
      </SidebarWrapper>
    </Sidebar>
  </Drawer>

  <div
    class={`flex-grow p-4 ${
      !hiddenSideBar ? "ml-72" : "ml-0"
    } transition-margin duration-300`}
  >
    {#if content_loading}
      <div class="flex flex-col items-center justify-center h-full">
        <div>
          <Wave color={spinner_color} size="100" duration="0.75s" />
        </div>
        <span class="mt-4 text-3xl font-bold tracking-wider">
          Loading Board Content...
        </span>
      </div>
    {:else}
      <div class="grid grid-cols-4 gap-4">
        {#if tasklist_collection != undefined}
          {#each tasklist_collection as list}
            <ListCard {list} />
          {/each}
        {/if}
        <button
          class="p-3 rounded text-ink-light bg-accent-200 dark:text-ink-dark dark:bg-accent-700 hover:bg-accent-600 dark:hover:bg-accent-600"
          on:click={() => (formModal = true)}>+ Add another list</button
        >
      </div>
    {/if}
  </div>
</div>

{#if formModal}
  <div transition:fade={{ duration: 250 }}>
    <NewListModal bind:showModal={formModal} />
  </div>
{/if}
