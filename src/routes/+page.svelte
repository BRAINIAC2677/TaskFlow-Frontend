<script lang="ts">
  import { dummy_boards } from "$lib/dummy_data/boards";
  import BoardListView from "$lib/components/BoardListView.svelte";
  import DashBoardOverview from "$lib/components/DashBoardOverview.svelte";
  import NewBoardDrawer from "$lib/components/NewBoardDrawer.svelte";
  import { PlusOutline } from "flowbite-svelte-icons";

  let hidden = true;
</script>

<div class="min-h-screen bg-gray-100 p-8">
  <header class="mb-6 flex items-center justify-between">
    <h1 class="text-2xl font-semibold">Dashboard</h1>
    <div class="flex items-center space-x-4">
      <div class="profile-menu"></div>
    </div>
  </header>

  <div class="main-content grid grid-cols-12 gap-4">
    <section class="col-span-12">
      <DashBoardOverview />
      <BoardListView {dummy_boards} />
    </section>
  </div>

  <button
    class="h-14 w-14 fixed bottom-12 right-12 z-10 shadow-xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full lg:ml-40 ml-10 text-sm mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    on:click={() => (hidden = false)}
  >
    <PlusOutline class="w-6 h-6 m-auto" />
  </button>

  <NewBoardDrawer bind:hidden></NewBoardDrawer>
</div>
