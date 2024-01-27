<script lang="ts">
  import type { BoardDashboardInfo } from "$lib/interfaces/board";
  import { Input } from "flowbite-svelte";
  import { SearchOutline } from "flowbite-svelte-icons";
  import { Pulse } from "svelte-loading-spinners";
  import theme_store from "$lib/stores/theme_store";
  export let loading: boolean = false;
  export let all_boards: BoardDashboardInfo[] = [];

  let search_term: string = "";
  let showable_boards: BoardDashboardInfo[] = all_boards;

  function get_spinner_color(color_name: string): string {
    switch (color_name) {
      case "red":
        return "#FF0000";
      case "green":
        return "#00FF00";
      case "blue":
        return "#0000FF";
      case "yellow":
        return "#FFFF00";
      case "orange":
        return "#FFA500";
      default:
        return "#000000";
    }
  }

  let spinner_color: string = "#000000";
  $: {
    spinner_color = get_spinner_color($theme_store.accentCurrentColor);
  }

  $: {
    showable_boards = all_boards.filter((board) =>
      board.board_name.toLowerCase().includes(search_term.toLowerCase())
    );
  }
</script>

<div
  class="details-section bg-accent-50 dark:bg-accent-900 p-4 rounded-lg shadow"
>
  {#if loading}
    <div class="flex justify-center items-center h-screen flex-col my-auto">
      <Pulse size="3" color={spinner_color} unit="cm" duration="1s" />
      <div class="ml-4 text-2xl font-bold tracking-wider pt-5">
        Loading Your Boards...
      </div>
    </div>
  {:else}
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Your Boards</h2>
      <div class="flex space-x-2">
        <!-- Filter dropdowns or sorting controls can be added here -->
        <Input
          id="search"
          placeholder="Search"
          size="md"
          bind:value={search_term}
        >
          <SearchOutline
            slot="left"
            class="w-6 h-6 text-gray-500 dark:text-gray-400"
          />
        </Input>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr>
            <th
              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >Board</th
            >
            <th
              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >Owner</th
            >
            <th
              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >Due Date</th
            >
            <th
              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >Status</th
            >
            <th
              class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >Progress</th
            >
          </tr>
        </thead>
        <tbody
          class="bg-accent-50 dark:bg-accent-900 divide-y divide-accent-400 dark:divide-accent-800"
        >
          {#each showable_boards as board}
            <tr>
              <a href="/boards/{board.board_id}">
                <td class="px-4 py-4 whitespace-nowrap hover:text-blue-500"
                  >{board.board_name}</td
                >
              </a>
              <td class="px-4 py-4 whitespace-nowrap"
                >{board.owner_info.username}</td
              >
              <td class="px-4 py-4 whitespace-nowrap"
                >{new Date(board.due_timestamp).toLocaleDateString()}</td
              >
              <!-- randomly generated numbers for now -->
              <!-- <td class="px-4 py-4 whitespace-nowrap">
              {#if board.status === "In Progress"}
                <span
                  class="px-2 inline-flex text-xs leading-5 font-bold rounded-full bg-yellow-100 text-yellow-800 dark:bg-blue-500 dark:text-blue-50"
                >
                  In Progress
                </span>
              {:else if board.status === "Completed"}
                <span
                  class="px-2 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800 dark:bg-green-500 dark:text-green-50"
                >
                  Completed
                </span>
              {:else if board.status === "Not Started"}
                <span
                  class="px-2 inline-flex text-xs leading-5 font-bold rounded-full bg-red-100 text-red-800 dark:bg-red-500 dark:text-red-50"
                >
                  Not Started
                </span>
              {/if}
            </td>
            <td class="px-4 py-4 whitespace-nowrap">
              {#if board.progress === 0}
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-red-800"
                  style="width: {board.progress}%"
                >
                  {board.progress}%
                </span>
              {:else if board.progress < 100}
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-blue-500 dark:text-blue-50"
                  style="width: {board.progress}%"
                >
                  {board.progress}%
                </span>
              {:else}
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-500 dark:text-green-50"
                  style="width: {board.progress}%"
                >
                  {board.progress}%
                </span>
              {/if}
            </td> -->
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
