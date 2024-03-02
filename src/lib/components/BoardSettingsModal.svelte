<script lang="ts">
  import {
    Modal,
    Button,
    Input,
    Label,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Textarea,
  } from "flowbite-svelte";
  import type { BoardContent } from "$lib/interfaces/board";
  import server_url from "$lib/stores/server_store";
  import { Spinner } from "flowbite-svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import { createEventDispatcher } from "svelte";

  export let showModal: boolean = false;
  export let board: BoardContent;

  const dispatch = createEventDispatcher();

  let name: string = board.board_name || "";
  let description: string = board.board_description || "";
  let deadline: string = board.board_deadline || "";
  let updatingBoard: boolean = false;

  async function updateBoard() {
    try {
      const response = await fetch($server_url + "/board/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access_token") || "",
        },
        body: JSON.stringify({
          board_id: board.board_id,
          board_name: name,
          board_description: description,
          board_deadline: deadline,
        }),
      });
      if (!response.ok) throw new Error("Failed to update board");
      const data = await response.json();
      dispatch("boardUpdated", {
        board_id: board.board_id,
        board_name: name,
        due_timestamp: deadline,
        description: description,
      });
      return data;
    } catch (error) {
      console.error("Error updating board:", error);
      throw new Error("Failed to update board");
    }
  }

  function handleListUpdate(
    listId: number,
    newName: string,
    newDeadline: string
  ) {
    console.log("List updated:", listId, newName, newDeadline);
    // Implement the update logic here
  }

  function deleteList(listId: number) {
    console.log("List deleted:", listId);
    // Implement the delete logic here
  }
</script>

{#if board !== undefined}
  <Modal bind:open={showModal} size="lg" autoclose={false}>
    <form class="flex flex-col space-y-6">
      <h3 class="mb-4 text-xl font-medium text-accent-900 dark:text-accent-100">
        <strong> {board.board_name} </strong>
      </h3>
      <Label>
        <span>Board Title</span>
        <Input type="text" required bind:value={name} />
      </Label>
      <Label>
        <span>Board Description</span>
        <Textarea bind:value={description} rows="3" />
      </Label>
      <Label>
        <span>Board Deadline</span>
        <Input type="datetime-local" bind:value={deadline} />
      </Label>
      <div class="flex justify-center mt-4">
        {#if updatingBoard}
          <Button
            disabled
            type="button"
            class="w-1/3 md:w-1/4 bg-accent-50 hover:bg-accent-600 text-accent-900 dark:bg-accent-50 dark:hover:bg-accent-600 disabled:hover:bg-accent-50 disabled:dark:hover:bg-accent-50 disabled:opacity-100"
          >
            <Spinner class="me-3" size="4" color="white" />
            Saving Changes</Button
          >
        {:else}
          <Button
            disabled={name === board.board_name &&
              description === board.board_description &&
              deadline === board.board_deadline}
            type="button"
            class="w-1/3 md:w-1/4 bg-accent-50 hover:bg-accent-600 text-accent-900 dark:bg-accent-50 dark:hover:bg-accent-600 disabled:hover:bg-accent-50 disabled:dark:hover:bg-accent-50"
            on:click={() => {
              updatingBoard = true;
              updateBoard()
                .then(() => {
                  updatingBoard = false;
                  showModal = false;
                  toast.push("Board updated successfully", {
                    theme: {
                      "--toastBackground": "var(--accent-50)",
                      "--toastProgressBackground": "var(--accent-100)",
                      "--toastColor": "black",
                    },
                  });
                })
                .catch((error) => {
                  updatingBoard = false;
                  console.error("Error updating board:", error);
                  toast.push("Failed to update board", {
                    theme: {
                      "--toastBackground": "var(--accent-50)",
                      "--toastProgressBackground": "var(--accent-100)",
                      "--toastColor": "black",
                    },
                  });
                });
            }}>Save Changes</Button
          >
        {/if}
      </div>
    </form>
    <div class="mt-4">
      <h4 class="text-lg font-medium text-accent-900 dark:text-accent-100 mb-2">
        Lists
      </h4>
      <Table>
        <TableHead>
          <TableHeadCell>List Name</TableHeadCell>
          <TableHeadCell>List Deadline</TableHeadCell>
          <TableHeadCell></TableHeadCell>
        </TableHead>
        <TableBody>
          {#each board.board_lists as list (list.list_id)}
            <TableBodyRow>
              <TableBodyCell>
                <Input type="text" bind:value={list.list_name} />
              </TableBodyCell>
              <TableBodyCell>
                <Input type="datetime-local" bind:value={list.list_deadline} />
              </TableBodyCell>
              <TableBodyCell class="flex justify-end space-x-2">
                <!-- Flex container for right-aligned buttons -->
                <Button
                  color="green"
                  size="xs"
                  on:click={() =>
                    handleListUpdate(
                      list.list_id,
                      list.list_name,
                      list.list_deadline
                    )}>Update</Button
                >
                <Button
                  color="red"
                  size="xs"
                  on:click={() => deleteList(list.list_id)}>Delete</Button
                >
              </TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    </div>
  </Modal>
{/if}
