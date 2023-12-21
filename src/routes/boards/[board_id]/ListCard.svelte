<script lang="ts">
  import type { List } from "$lib/interfaces/list";
  import TaskCard from "./TaskCard.svelte";
  export let list: List;
</script>

<!-- {#each list.tasks as task}
    <TaskCard {task} />
{/each} -->
<div class="p-3 bg-gray-400 rounded dark:bg-gray-700">
  <h3 class="mb-2 font-bold text-white dark:text-gray-200">
    {list.title}
  </h3>
  <div class="space-y-2">
    {#each list.tasks as task}
      <TaskCard {task} />
    {/each}
    <button class="mt-2 text-white dark:text-gray-200">+ Add a task</button>
  </div>
</div>
