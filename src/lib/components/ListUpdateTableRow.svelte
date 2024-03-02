<script lang="ts">
  import { Button, Input, TableBodyCell, TableBodyRow } from "flowbite-svelte";
  import type { BoardContentListForm } from "$lib/interfaces/list";
  import { Spinner } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import server_url from "$lib/stores/server_store";
  import { slide } from "svelte/transition";

  export let list: BoardContentListForm;
  let updating: boolean = false;

  let name: string = "";
  let deadline: string = "";
  let askForConfirmation: boolean = false;

  name = list?.list_name;
  deadline = list?.list_deadline;

  $: console.log("List:", list);

  const dispatch = createEventDispatcher();

  async function updateList(
    listId: number,
    newName: string,
    newDeadline: string
  ) {
    try {
      const response = await fetch($server_url + "/list/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access_token") || "",
        },
        body: JSON.stringify({
          list_id: listId,
          list_name: newName,
          list_deadline: newDeadline,
        }),
      });
      if (!response.ok) throw new Error("Failed to update list");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating list:", error);
      throw new Error("Failed to update list");
    }
  }

  function handleListUpdate(
    listId: number,
    newName: string,
    newDeadline: string
  ) {
    updating = true;
    updateList(listId, newName, newDeadline)
      .then(() => {
        dispatch("listUpdated", {
          list_id: listId,
          list_name: newName,
          list_deadline: newDeadline,
        });
        toast.push("List updated successfully", {
          theme: {
            "--toastBackground": "var(--accent-50)",
            "--toastProgressBackground": "var(--accent-100)",
            "--toastColor": "black",
          },
        });
      })
      .catch((error) => {
        console.error("Error updating list:", error);
        toast.push("Failed to update list", {
          theme: {
            "--toastBackground": "var(--accent-50)",
            "--toastProgressBackground": "var(--accent-100)",
            "--toastColor": "black",
          },
        });
      })
      .finally(() => {
        updating = false;
      });
  }

  async function deleteList(listId: number) {
    try {
      const response = await fetch($server_url + "/list/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access_token") || "",
        },
        body: JSON.stringify({
          list_id: listId,
        }),
      });
      if (!response.ok) throw new Error("Failed to delete list");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting list:", error);
      throw new Error("Failed to delete list");
    }
  }

  function deleteListConfirmed(listId: number) {
    deleteList(listId)
      .then(() => {
        dispatch("listDeleted", { list_id: listId });
        toast.push("List deleted successfully", {
          theme: {
            "--toastBackground": "var(--accent-50)",
            "--toastProgressBackground": "var(--accent-100)",
            "--toastColor": "black",
          },
        });
      })
      .catch((error) => {
        console.error("Error deleting list:", error);
        toast.push("Failed to delete list", {
          theme: {
            "--toastBackground": "var(--accent-50)",
            "--toastProgressBackground": "var(--accent-100)",
            "--toastColor": "black",
          },
        });
      });
  }
</script>

<TableBodyRow class="border-none">
  <TableBodyCell>
    <Input type="text" bind:value={name} />
  </TableBodyCell>
  <TableBodyCell>
    <Input type="datetime-local" bind:value={deadline} />
  </TableBodyCell>
  <TableBodyCell class="flex flex-col space-y-2 items-end">
    <div class="w-full flex justify-between">
      {#if updating}
        <Button
          color="green"
          size="xs"
          disabled
          class="disabled:opacity-100 w-full"
        >
          <Spinner class="me-2" size="4" color="white" /> Updating
        </Button>
      {:else}
        <Button
          disabled={name === list.list_name && deadline === list.list_deadline}
          color="green"
          size="xs"
          class="w-full"
          on:click={() => handleListUpdate(list.list_id, name, deadline)}
        >
          Update</Button
        >
      {/if}
    </div>
    <Button
      color="red"
      size="xs"
      class="w-full"
      on:click={() => {
        askForConfirmation = true;
      }}>Delete</Button
    >
  </TableBodyCell>
</TableBodyRow>

{#if askForConfirmation}
  <div transition:slide>
    <div class="flex justify-between items-center bg-red-100 p-3 rounded-lg">
      <span class="font-bold text-red-700"
        >Are you sure you want to delete this list?</span
      >
      <div class="space-x-2">
        <button
          class="btn-red"
          on:click={() => {
            deleteListConfirmed(list.list_id);
            askForConfirmation = false;
          }}>Confirm</button
        >
        <button
          class="btn-gray"
          on:click={() => {
            askForConfirmation = false;
          }}>Cancel</button
        >
      </div>
    </div>
  </div>
{/if}
