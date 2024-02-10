<script lang="ts">
  import { Button, Modal, Label, Input, Textarea } from "flowbite-svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import server_url from "$lib/stores/server_store";
  import { page } from "$app/stores";
  export let showModal = true;

  let name: string = "";
  let description: string = "";
  let timestamp: string = "";

  async function create_list() {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("access_token") || "",
    });

    const request = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        list_name: name,
        list_description: description,
        list_deadline: timestamp,
      }),
    };

    try {
      const response = await fetch(
        $server_url + "/list/create/" + $page.params.board_id,
        request
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
</script>

<Modal bind:open={showModal} size="xs" autoclose={false} class="w-full">
  <form
    class="flex flex-col space-y-6"
    on:submit|preventDefault={() => {
      if (name === "" || timestamp === "") return;
      let success = false;
      create_list()
        .then((data) => {
          success = true;
          toast.push("List Created Successfully!", {
            theme: {
              "--toastBackground": "#E1F0DA",
              "--toastProgressBackground": "#294B29",
              "--toastProgressText": "#1A202C",
              "--toastColor": "#424242",
            },
          });
        })
        .catch((error) => {
          console.error(error);
          toast.push("An error occurred. Please try again.", {
            theme: {
              "--toastBackground": "#FDEDEE",
              "--toastProgressBackground": "#D2042D",
              "--toastProgressText": "#1A202C",
              "--toastColor": "#424242",
            },
          });
        })
        .finally(() => {
          showModal = false;
          //reload the page on success
          if (success) location.reload();
        });
    }}
  >
    <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
      New List
    </h3>
    <Label class="space-y-2">
      <span>List Name</span>
      <Input type="text" name="name" required bind:value={name} />
    </Label>
    <Label class="space-y-2">
      <span>Description</span>
      <Textarea
        id="message"
        placeholder="Write list description..."
        rows="4"
        name="message"
        bind:value={description}
      />
    </Label>
    <Label class="space-y-2">
      <span>Due Time</span>
      <Input
        type="datetime-local"
        name="date"
        required
        bind:value={timestamp}
      />
    </Label>
    <Button type="submit" class="w-full">Create List</Button>
  </form>
</Modal>
