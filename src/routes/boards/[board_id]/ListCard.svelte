<script lang="ts">
    import type { BoardContentListForm } from "$lib/interfaces/list";
    import TaskCard from "./TaskCard.svelte";
    export let list: BoardContentListForm;
</script>

<div class="p-3 rounded shadow-md bg-accent-100 dark:bg-accent-800">
    <h3 class="mb-2 font-bold text-accent-900 dark:text-accent-100">
        {list.list_name}
    </h3>
    <div class="space-y-2">
        {#if list.list_tasks != undefined}
            {#each list.list_tasks as task}
                <TaskCard {task} />
            {/each}
        {/if}
        <button class="mt-2 text-accent-900 dark:text-accent-100"
            >+ Add a task</button
        >
    </div>
</div>
