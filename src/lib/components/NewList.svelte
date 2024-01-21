<script lang="ts">
  import { Button, Modal, Label, Input, Textarea } from "flowbite-svelte";
  export let formModal = false;
</script>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
  <form class="flex flex-col space-y-6" action="#">
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      New List
    </h3>
    <Label class="space-y-2">
      <span>List Name</span>
      <Input type="text" name="name" required />
    </Label>
    <Label class="space-y-2">
      <span>Description</span>
      <Textarea
        id="message"
        placeholder="Write list description..."
        rows="4"
        name="message"
      />
    </Label>
    <Label class="space-y-2">
      <span>Due Time</span>
      <Input type="datetime-local" name="date" required />
    </Label>
    <Button type="submit" class="w-full1">Create List</Button>
  </form>
</Modal>
