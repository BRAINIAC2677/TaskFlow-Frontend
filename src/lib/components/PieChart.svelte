<script lang="ts">
  import { Pie } from "svelte-chartjs";

  export let data: any;
  export let title: string;

  let options = {
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 24,
        },
        padding: {
          bottom: 50,
        },
        color: "black",
      },
    },
  };
</script>

<div class="p-4 bg-accent-100 dark:bg-accent-700 rounded shadow-xl">
  <Pie {data} {options} />
</div>
