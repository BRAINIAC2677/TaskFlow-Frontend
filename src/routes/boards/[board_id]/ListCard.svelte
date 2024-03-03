<script lang="ts">
  import type { BoardContentListForm } from "$lib/interfaces/list";
  import TaskCard from "./TaskCard.svelte";
  import { fade } from "svelte/transition";
  import NewTaskModal from "$lib/components/NewTaskModal.svelte";

  export let list: BoardContentListForm;

  function handleTaskCreated(event: any) {
    console.log(event.detail);
    list.list_tasks = [...list.list_tasks, event.detail];
  }

  let addTaskModal: boolean = false;
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
    <button
      class="mt-2 text-accent-900 dark:text-accent-100 hover:text-accent-700 dark:hover:text-accent-200"
      on:click={() => (addTaskModal = true)}>+ Add a task</button
    >
  </div>
</div>

{#if addTaskModal}
  <div transition:fade={{ duration: 250 }}>
    <NewTaskModal
      bind:listID={list.list_id}
      bind:showModal={addTaskModal}
      on:taskCreated={handleTaskCreated}
    />
  </div>
{/if}
