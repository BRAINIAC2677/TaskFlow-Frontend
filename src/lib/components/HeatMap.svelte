<script lang="ts">
  import Heatmap from "svelte-heatmap";

  export let title: string;
  export let data: any;
  export let startDate: string;
  export let endDate: string;
</script>

<div class="mt-4 shadow-lg rounded-lg p-4 bg-accent-100 dark:bg-accent-700">
  <div class="mb-16 text-2xl text-black font-bold text-center">
    {title}
  </div>
  <Heatmap {data} {startDate} {endDate} />
</div>
