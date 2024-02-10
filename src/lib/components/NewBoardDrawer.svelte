<script lang="ts">
  import ScrollableUserList from "$lib/components/ScrollableUserList.svelte";
  import Autocomplete from "$lib/components/Autocomplete.svelte";
  import { sineIn } from "svelte/easing";
  import { InfoCircleSolid, CalendarEditSolid } from "flowbite-svelte-icons";
  import type { UserMinimalForm } from "$lib/interfaces/user";
  import type { BoardCreationInfo } from "$lib/interfaces/board";
  import server_url from "$lib/stores/server_store";
  import type { UserMemberInfo } from "$lib/interfaces/user";
  import {
    Drawer,
    Button,
    CloseButton,
    Label,
    Input,
    Textarea,
    Helper,
  } from "flowbite-svelte";
  import { onMount, onDestroy } from "svelte";

  export let hidden = true;
  let transitionParams = {
    x: 320,
    duration: 200,
    easing: sineIn,
  };

  let search_term: string = "";
  let last_fetched_term: string = "";
  let fetch_interval: NodeJS.Timeout;
  let interval_time: number = 100;

  let retrieved_users: UserMinimalForm[] = [];
  let selected_users: UserMemberInfo[] = [];
  let board_creation_info: BoardCreationInfo = {
    board_name: "",
    board_description: "",
    board_deadline: "",
    board_members: [],
  };
  let users_loading: boolean = false;
  let deadline_ok: boolean = false;

  $: {
    if (board_creation_info.board_deadline.length > 0) {
      let deadline = new Date(board_creation_info.board_deadline);
      let now = new Date();
      deadline_ok = deadline > now;
    }
  }

  function get_final_input() {
    selected_users.forEach((user) => {
      board_creation_info.board_members.push({
        user_id: user.user_id,
        role: user.role,
      });
    });
  }

  async function createBoard() {
    const headers = new Headers({
      Authorization: localStorage.getItem("access_token") || "",
      "Content-Type": "application/json",
    });

    const request = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(board_creation_info),
    };

    try {
      const response = await fetch($server_url + "/board/create", request);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  onMount(() => {
    fetch_interval = setInterval(() => {
      if (search_term !== last_fetched_term && search_term.length > 0) {
        fetchUsers(search_term)
          .then((users) => {
            retrieved_users = users;
            last_fetched_term = search_term;
          })
          .catch((err) => {
            console.error("Fetch error:", err);
          });
      }
    }, interval_time);
  });

  onDestroy(() => {
    clearInterval(fetch_interval);
  });

  async function fetchUsers(search_term: string) {
    users_loading = true;
    const headers = new Headers({
      Authorization: localStorage.getItem("access_token") || "",
      "Content-Type": "application/json",
    });

    const request = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        term: search_term,
        count: 10,
      }),
    };

    try {
      const response = await fetch(
        $server_url + "/profile/get-usernames",
        request
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw error;
    } finally {
      users_loading = false;
    }
  }

  let suggestions: Array<{
    id: string;
    name: string;
  }> = [];

  $: {
    retrieved_users = retrieved_users.filter((user) => {
      return selected_users.every((selected) => selected.user_id !== user.id);
    });
    suggestions = retrieved_users.map((user) => {
      return {
        id: user.id,
        name: user.username,
      };
    });
  }
</script>

<Drawer
  placement="right"
  transitionType="fly"
  {transitionParams}
  bind:hidden
  id="sidebar4"
  class="w-96 bg-accent-50 dark:bg-gray-900"
>
  <div class="flex items-center max-h-screen">
    <h5
      id="drawer-label"
      class="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
    >
      <InfoCircleSolid class="w-4 h-4 me-2.5" />New Board
    </h5>
    <CloseButton
      on:click={() => (hidden = true)}
      class="mb-4 dark:text-white"
    />
  </div>
  <form class="mb-6">
    <div class="mb-6">
      <Label for="title" class="block mb-2">Board Name</Label>
      <Input
        id="title"
        name="title"
        required
        placeholder="Board Name"
        bind:value={board_creation_info.board_name}
      />
    </div>
    <div class="mb-6">
      <Label for="description" class="mb-2">Description</Label>
      <Textarea
        id="message"
        placeholder="Write board description..."
        rows="4"
        name="message"
        bind:value={board_creation_info.board_description}
      />
    </div>
    <div class="mb-6">
      <Label for="due-time" class="mb-2">Deadline</Label>
      <Input
        id="datetime"
        name="date"
        required
        type="datetime-local"
        bind:value={board_creation_info.board_deadline}
      />
      {#if board_creation_info.board_deadline.length > 0 && !deadline_ok}
        <Helper class="mt-2" color="red">
          <span class="font-medium">Deadline must be in the future</span>
        </Helper>
      {/if}
    </div>
    <div class="mb-4">
      <Label for="members" class="mb-2">Add Members</Label>
      <Autocomplete
        bind:loading={users_loading}
        bind:suggestions
        bind:searchTerm={search_term}
        on:select={(e) => {
          let user = retrieved_users.find((user) => user.id === e.detail.index);
          if (user) {
            selected_users = [
              ...selected_users,
              {
                user_id: user.id,
                full_name: user.full_name,
                username: user.username,
                role: 3,
                dp_url: user.dp_url,
              },
            ];
          }
          search_term = "";
          retrieved_users = retrieved_users.filter((user) => {
            return user.id !== e.detail.index;
          });
        }}
      />
    </div>
    {#if selected_users.length > 0}
      <ScrollableUserList bind:users={selected_users} />
    {/if}
    <Button
      type="submit"
      class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex w-40 mx-auto bg-accent-700 hover:bg-accent-800"
      on:click={() => {
        if (!deadline_ok) return;
        get_final_input();
        createBoard()
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            hidden = true;
          });
      }}
    >
      <CalendarEditSolid class="w-3.5 h-3.5 me-2.5 text-white" /> Create Board
    </Button>
  </form>
</Drawer>
