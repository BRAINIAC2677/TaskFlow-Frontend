<!-- <script lang="ts">
  import type { UserMemberInfo } from "$lib/interfaces/user";
  import { user_info_store } from "$lib/stores/user_store";
  export let admins: Array<UserMemberInfo> = [];
  export let isOwner: boolean = false;

  let textClass: string = "text-slate-800 dark:text-slate-100 text-sm";
</script>

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
{/if} -->
