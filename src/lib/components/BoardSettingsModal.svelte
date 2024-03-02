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

  export let showModal: boolean = false;
  export let board: BoardContent;

  $: console.log(board);

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
        <Input type="text" required bind:value={board.board_name} />
      </Label>
      <Label>
        <span>Board Description</span>
        <Textarea bind:value={board.board_description} rows="3" />
      </Label>
      <Label>
        <span>Board Deadline</span>
        <Input type="datetime-local" bind:value={board.board_deadline} />
      </Label>
      <div class="mt-4">
        <h4
          class="text-lg font-medium text-accent-900 dark:text-accent-100 mb-2"
        >
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
                  <Input
                    type="datetime-local"
                    bind:value={list.list_deadline}
                  />
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
      <div class="flex justify-center mt-4">
        <Button
          type="button"
          class="w-1/3 md:w-1/4 bg-accent-50 hover:bg-accent-600 text-accent-900 dark:bg-accent-50 dark:hover:bg-accent-600"
          on:click={() => (showModal = false)}>Save Changes</Button
        >
      </div>
    </form>
  </Modal>
{/if}
