<script lang="ts">
  import type { BoardContentListForm } from "$lib/interfaces/list";
  import TaskCard from "./TaskCard.svelte";
  export let list: BoardContentListForm;
</script>

<div class="p-3 rounded bg-accent-200 dark:bg-accent-700">
  <h3 class="mb-2 font-bold text-ink-light dark:text-ink-dark">
    {list.list_name}
  </h3>
  <div class="space-y-2">
    {#if list.list_tasks != undefined}
      {#each list.list_tasks as task}
        <TaskCard {task} />
      {/each}
    {/if}
    <button class="mt-2 text-ink-light dark:text-ink-dark">+ Add a task</button>
  </div>
</div>
