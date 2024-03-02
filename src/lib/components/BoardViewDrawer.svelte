<script lang="ts">
  import { user_info_store } from "$lib/stores/user_store";
  import BoardSettingsModal from "$lib/components/BoardSettingsModal.svelte";
  import type { BoardContent } from "$lib/interfaces/board";
  import { sineIn } from "svelte/easing";
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
    AngleLeftSolid,
    AngleRightSolid,
    FileCodeSolid,
  } from "flowbite-svelte-icons";

  export let hiddenSideBar: boolean = true;
  export let board: BoardContent;

  function handleBoardUpdate(event: any) {
    board = {
      ...board,
      board_name: event.detail.board_name,
      board_deadline: event.detail.due_timestamp,
      board_description: event.detail.description,
    };
  }

  function toggleSidebar() {
    hiddenSideBar = !hiddenSideBar;
  }

  let boardSettingsModal: boolean = false;
  let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn,
  };
</script>

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
  divClass="bg-gray-100 dark:bg-accent-800 shadow-lg dark:shadow-none"
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
        <SidebarItem
          label="Board Settings"
          on:click={() => (boardSettingsModal = true)}
        >
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

{#if boardSettingsModal}
  <div transition:fade={{ duration: 250 }}>
    <BoardSettingsModal
      bind:board
      bind:showModal={boardSettingsModal}
      on:boardUpdated={handleBoardUpdate}
    />
  </div>
{/if}
