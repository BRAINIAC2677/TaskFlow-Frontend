<script lang="ts">
  import type { Board } from "$lib/interfaces/board";
  import { Input } from "flowbite-svelte";
  import { SearchOutline } from "flowbite-svelte-icons";
  export let dummy_boards: Board[];

  let search_term: string = "";
  let showable_boards: Board[] = dummy_boards;

  $: {
    showable_boards = dummy_boards.filter((board) =>
      board.title.toLowerCase().includes(search_term.toLowerCase())
    );
  }
</script>

<div class="details-section bg-white p-4 rounded-lg shadow">
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
      <tbody class="bg-white divide-y divide-gray-200">
        {#each showable_boards as board}
          <tr>
            <a href="/boards/{board.id}">
              <td class="px-4 py-4 whitespace-nowrap hover:text-blue-500"
                >{board.title}</td
              >
            </a>
            <td class="px-4 py-4 whitespace-nowrap">{board.owner_name}</td>
            <td class="px-4 py-4 whitespace-nowrap"
              >{new Date(board.due_date).toLocaleDateString()}</td
            >
            <td class="px-4 py-4 whitespace-nowrap">
              {#if board.status === "In Progress"}
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                >
                  In Progress
                </span>
              {:else if board.status === "Completed"}
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                >
                  Completed
                </span>
              {:else if board.status === "Not Started"}
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
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
              {:else if board.progress < 20}
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                  style="width: {board.progress}%"
                >
                  {board.progress}%
                </span>
              {:else if board.progress < 50}
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                  style="width: {board.progress}%"
                >
                  {board.progress}%
                </span>
              {:else if board.progress < 80}
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  style="width: {board.progress}%"
                >
                  {board.progress}%
                </span>
              {:else if board.progress < 100}
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                  style="width: {board.progress}%"
                >
                  {board.progress}%
                </span>
              {:else}
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800"
                  style="width: {board.progress}%"
                >
                  {board.progress}%
                </span>
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
