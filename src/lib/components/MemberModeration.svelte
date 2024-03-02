<script lang="ts">
  import { Modal, Label, Button } from "flowbite-svelte";
  import Autocomplete from "./Autocomplete.svelte";
  import server_url from "$lib/stores/server_store";
  import type {
    UserMemberInfo,
    UserSuggestion,
    UserMinimalForm,
  } from "$lib/interfaces/user";
  import type { BoardContent } from "$lib/interfaces/board";
  import { user_info_store } from "$lib/stores/user_store";

  export let board: BoardContent;
  export let showModal = false;

  async function fetchUsers(search_term: string) {
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
    }
  }

  let loading: boolean = false;
  let search_term: string = "";
  let selected_users: UserMemberInfo[] = [];
  let retrieved_users: UserMinimalForm[] = [];

  let admins: Array<UserMemberInfo> = [];
  let members: Array<UserMemberInfo> = [];
  let owner: UserMemberInfo;

  $: admins = board?.board_members.filter((member) => member.role === 2);
  $: members = board?.board_members.filter((member) => member.role === 3);
  $: {
    let res = board?.board_members.find((member) => member.role === 1);
    if (res) owner = res;
  }

  function removeAdmin(adminId: string) {
    // Implement the logic to remove admin role
  }

  function removeMember(memberId: string) {
    // Implement the logic to remove a member
  }

  let suggestions: Array<UserSuggestion> = [];

  let textClass: string = "text-slate-800 dark:text-slate-100 text-sm";
</script>

<Modal bind:open={showModal} size="lg" autoclose={false}>
  <Label for="members" class="mb-2 text-lg font-medium">Add Members</Label>
  <Autocomplete
    bind:loading
    bind:suggestions
    bind:searchTerm={search_term}
    on:select={(e) => {}}
  />

  <div class="mt-4">
    <h2 class="text-xl font-semibold mb-2">Owner</h2>
    {#if owner}
      <div
        class="flex items-center gap-4 py-2 px-4 bg-accent-100 dark:bg-gray-800 rounded-lg shadow"
      >
        <img
          class="w-12 h-12 rounded-full"
          src={owner.dp_url}
          alt={owner.username}
        />
        <div class="flex flex-col">
          <strong class={`${textClass} font-bold`}>{owner.username}</strong>
          <span class={`${textClass}`}>{owner.full_name}</span>
        </div>
      </div>
    {/if}
  </div>

  <div class="mt-6">
    <h2 class="text-xl font-semibold mb-2">Admins</h2>
    {#if admins}
      {#each admins as admin, index (admin.user_id)}
        <div
          class="flex items-center justify-between pt-4 px-4 bg-accent-100 dark:bg-gray-800 shadow py-2 {index ===
          0
            ? 'rounded-t-lg'
            : index === admins.length - 1
              ? 'rounded-b-lg'
              : 'rounded-none'}"
        >
          <div class="flex items-center gap-4">
            <img
              class="w-12 h-12 rounded-full"
              src={admin.dp_url}
              alt={admin.username}
            />
            <div class="flex flex-col">
              <strong class={`${textClass} font-bold`}>{admin.username}</strong>
              <span class={`${textClass}`}>{admin.full_name}</span>
            </div>
          </div>
          <!-- Board Owner gets to remove admins -->
          {#if board.board_access === 1 && $user_info_store.id !== admin.user_id}
            <Button
              color="red"
              size="xs"
              on:click={() => removeAdmin(admin.user_id)}
            >
              {#if $user_info_store.id !== admin.user_id}
                Remove Admin
              {/if}
            </Button>
          {:else if board.board_access === 2 && $user_info_store.id === admin.user_id}
            <Button
              color="red"
              size="xs"
              on:click={() => removeAdmin(admin.user_id)}
            >
              Resign as Admin
            </Button>
          {/if}
        </div>
      {/each}
    {/if}
  </div>
  <div class="mt-6">
    <h2 class="text-xl font-semibold mb-2">Members</h2>
    {#if members}
      {#each members as member, index (member.user_id)}
        <div
          class="flex items-center justify-between pt-4 px-4 bg-accent-100 dark:bg-gray-800 shadow py-2 {index ===
          0
            ? 'rounded-t-lg'
            : index === members.length - 1
              ? 'rounded-b-lg'
              : 'rounded-none'}"
        >
          <div class="flex items-center gap-4">
            <img
              class="w-12 h-12 rounded-full"
              src={member.dp_url}
              alt={member.username}
            />
            <div class="flex flex-col">
              <strong class={`${textClass} font-bold`}>{member.username}</strong
              >
              <span class={`${textClass}`}>{member.full_name}</span>
            </div>
          </div>
          <Button
            color="red"
            size="xs"
            on:click={() => removeMember(member.user_id)}
          >
            Remove Member
          </Button>
        </div>
      {/each}
    {/if}
  </div>
</Modal>
