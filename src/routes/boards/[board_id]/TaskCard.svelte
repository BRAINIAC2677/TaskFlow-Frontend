<script lang="ts">
  import type { Task } from "$lib/interfaces/task";
  import Layout from "../../+layout.svelte";
  export let task: Task;
</script>

<div
  class="p-2 text-black bg-gray-200 rounded cursor-pointer dark:bg-gray-600 dark:text-gray-300"
>
  <div>{task.name}</div>
  <div>Due Date: {task.due_date.toLocaleDateString()}</div>
  <!-- <div>Remaining Time: {task.remainingTime}</div> -->
</div>
