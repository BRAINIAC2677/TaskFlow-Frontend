<script lang="ts">
    import { dummy_boards } from "$lib/dummy_data/boards";
    import BoardListView from "$lib/components/BoardListView.svelte";
    import DashBoardOverview from "$lib/components/DashBoardOverview.svelte";
    import NewBoardDrawer from "$lib/components/NewBoardDrawer.svelte";
    import { PlusOutline } from "flowbite-svelte-icons";

    let hidden = true;
</script>

<div class="min-h-screen p-8">
    <header class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold">Dashboard</h1>
        <div class="flex items-center space-x-4">
            <div class="profile-menu"></div>
        </div>
    </header>

    <div class="grid grid-cols-12 gap-4 main-content">
        <section class="col-span-12">
            <DashBoardOverview />
            <BoardListView {dummy_boards} />
        </section>
    </div>

    <button
        class="fixed z-10 mb-2 ml-10 mr-2 text-sm font-medium text-white bg-blue-700 rounded-full shadow-xl h-14 w-14 bottom-12 right-12 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 lg:ml-40 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        on:click={() => (hidden = false)}
    >
        <PlusOutline class="w-6 h-6 m-auto" />
    </button>

    <NewBoardDrawer bind:hidden></NewBoardDrawer>
</div>
