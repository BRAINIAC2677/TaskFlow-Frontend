<script lang="ts">
  import Chart from "./Chart.svelte";
  import { onMount } from "svelte";
  import server_url from "$lib/stores/server_store";

  let loading = false;
  let options: any;

  async function fetchTaskProgressionStats() {
    const token = localStorage.getItem("access_token") || "";
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    const request = {
      method: "GET",
      headers: headers,
    };
    try {
      const url = new URL(`${$server_url}/insight/task-progression`);
      const response = await fetch(url.toString(), request);
      const data = await response.json();
      let series = [] as any;
      let labels = [] as any;
      data.forEach((element: any) => {
        series.push(parseInt(element.task_count));
        labels.push(element.progress_range);
      });
      return { series, labels };
    } catch (error) {
      console.error("Error:", error);
    }
  }

  onMount(async () => {
    loading = true;
    try {
      const data = (await fetchTaskProgressionStats()) as any;
      console.log(data.series, data.labels);
      options = {
        chart: {
          type: "pie",
        },
        series: data.series,
        labels: data.labels,
      };
    } catch (error) {
      console.error("Error:", error);
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <div class="spinner"></div>
{:else}
  <Chart bind:options />
{/if}

<style>
  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.2);
    border-left-color: #09f;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    margin: 50px auto;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
