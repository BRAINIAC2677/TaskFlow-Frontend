<script lang="ts">
  interface UserMinimalForm {
    id: string;
    user_name: string;
    full_name: string;
    img_url: string;
  }
  export let users: UserMinimalForm[] = [];
</script>

<div
  class="overflow-auto h-72 relative max-w-sm mx-auto bg-white dark:bg-slate-800 dark:highlight-white/5 shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col divide-y dark:divide-slate-200/5"
>
  {#each users as user}
    <div class="flex items-center gap-4 p-4">
      <img
        class="w-12 h-12 rounded-full"
        src={user.img_url}
        alt={user.user_name}
      />
      <div class="flex flex-col">
        <strong class="text-slate-900 text-sm font-medium dark:text-slate-200"
          >{user.user_name}</strong
        >
        <span class="text-slate-500 text-sm font-medium dark:text-slate-400"
          >{user.full_name}</span
        >
      </div>
    </div>
  {/each}
</div>
