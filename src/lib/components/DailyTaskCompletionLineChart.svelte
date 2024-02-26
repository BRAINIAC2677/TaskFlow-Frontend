<script lang="ts">
  import Chart from "./Chart.svelte";
  import { onMount } from "svelte";
  import { format, parseISO } from "date-fns";
  import server_url from "$lib/stores/server_store";

  let loading = false;
  let options: any;

  async function fetchDailyTaskCompletion() {
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
      const url = new URL(`${$server_url}/insight/daily-task-completion`);
      url.searchParams.set("start_date", "-1");
      url.searchParams.set("end_date", "-1");
      const response = await fetch(url.toString(), request);
      const res = await response.json();

      let data = [] as any;

      res.forEach((item: any) => {
        const date = parseISO(item.date);
        data.push({ x: date.getTime(), y: item.done });
      });
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  onMount(async () => {
    loading = true;
    try {
      const data = (await fetchDailyTaskCompletion()) as any;
      options = {
        series: [
          {
            name: "Tasks Completed",
            data: data,
          },
        ],
        chart: {
          type: "line",
          animations: {
            enabled: true,
          },
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "Date",
          },
        },
        yaxis: {
          title: {
            text: "Tasks Completed",
          },
        },
        annotations: {
          xaxis: [
            {
              x: data[0].x,
              strokeDashArray: 0,
              borderColor: "#775DD0",
              label: {
                borderColor: "#775DD0",
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
                text: "Account Created",
              },
            },
          ],
        },
        tooltip: {
          x: {
            format: "MMM dd, yyyy",
          },
          y: {
            formatter: function (val: any) {
              return val.toFixed(0);
            },
          },
        },
        title: {
          text: "Daily Task Completion Statistics",
          align: "left",
        },
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
