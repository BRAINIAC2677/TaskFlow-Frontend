<script lang="ts">
  import server_url from "$lib/stores/server_store";
  import InsightOverview from "../../lib/components/InsightOverview.svelte";
  import LineChart from "../../lib/components/LineChart.svelte";
  import PieChart from "../../lib/components/PieChart.svelte";
  import BarChart from "../../lib/components/BarChart.svelte";
  import HeatMap from "../../lib/components/HeatMap.svelte";

  import { heatmapData } from "$lib/dummy_data/heatmap";
  import { onMount } from "svelte";

  // Weekly Task Completion Stats : Line Chart
  let weekly_task_fetching: boolean = false;
  let daily_task_fetching: boolean = false;
  let linechart_title: string = "Progress Over Time";
  let linechart_data: any = {
    labels: [],
    datasets: [
      {
        label: "Weekly Task Completion",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  async function fetchWeeklyTaskCompletion() {
    const token: string = localStorage.getItem("access_token") || "";
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    const request = {
      method: "GET",
      headers: headers,
    };

    try {
      const url = new URL($server_url + "/insight/weekly-task-completion");
      url.searchParams.set("start_date", "-1"); // account creation date
      url.searchParams.set("end_date", "-1"); // current date
      const response = await fetch(url.toString(), request);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function fetchDailyTaskCompletion() {
    const token: string = localStorage.getItem("access_token") || "";
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    const request = {
      method: "GET",
      headers: headers,
    };

    try {
      const url = new URL($server_url + "/insight/daily-task-completion");
      const start_date = new Date();
      start_date.setMonth(start_date.getMonth() - 1);
      url.searchParams.set("start_date", start_date.toISOString());
      url.searchParams.set("end_date", "-1"); // current date
      url.searchParams.set("format", "DD-Mon-YYYY");
      const response = await fetch(url.toString(), request);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  let barchart_x: Array<string> = [];
  let barchart_y: Array<number> = [];
  let barchart_title = "Tasks in Last 30 Days";

  onMount(() => {
    try {
      weekly_task_fetching = true;
      const res1 = fetchWeeklyTaskCompletion();
      daily_task_fetching = true;
      const res2 = fetchDailyTaskCompletion();

      res1.then(
        (data) => {
          data.weekly_data.forEach((element: any) => {
            linechart_data.labels.push(element.label);
            linechart_data.datasets[0].data.push(element.completed_task_count);
          });
          linechart_data = { ...linechart_data };
          console.log("Line Chart Data:", linechart_data);
        },
        (error) => {
          console.error("Error:", error);
        }
      );

      res2.then(
        (data) => {
          barchart_x = data.barchart_x;
          barchart_y = data.barchart_y;
          console.log("Daily Task Completion Data:", barchart_x, barchart_y);
        },
        (error) => {
          console.error("Error:", error);
        }
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      weekly_task_fetching = false;
      daily_task_fetching = false;
    }
  });

  let piechart_title_1 = "Task Status";
  let piechart_data_1 = {
    labels: ["Not Started", "In Progress", "Completed"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
      },
    ],
  };

  let piechart_title_2 = "Task Progression";
  let piechart_data_2 = {
    labels: [
      "10%",
      "20%",
      "30%",
      "40%",
      "50%",
      "60%",
      "70%",
      "80%",
      "90%",
      "100%",
    ],
    datasets: [
      {
        label: "Number of Tasks",
        data: [3, 5, 2, 3, 10, 3, 5, 2, 3, 10],
        backgroundColor: [
          "#d9dcd6",
          "#ffd166",
          "#06d6a0",
          "#118ab2",
          "#073b4c",
          "#d9dcd6",
          "#ffd166",
          "#06d6a0",
          "#118ab2",
          "#073b4c",
        ],
      },
    ],
  };
</script>

<svelte:head>
  <title>Insights</title>
</svelte:head>

<div class="flex-col pb-32 mt-32 mx-80">
  <div class="chart-container">
    <InsightOverview title="Overview" />
  </div>

  <div class="mt-32 chart-container">
    <LineChart
      bind:title={linechart_title}
      bind:data={linechart_data}
      bind:loading={weekly_task_fetching}
    />
  </div>

  <div class="flex justify-between w-full mt-32">
    <div class="w-1/2 px-4">
      <PieChart title={piechart_title_1} data={piechart_data_1} />
    </div>
    <div class="w-1/2 px-4">
      <PieChart title={piechart_title_2} data={piechart_data_2} />
    </div>
  </div>

  <div class="mt-32 chart-container">
    <BarChart
      x_title="Date"
      y_title="Daily Task Completion Count"
      bind:x={barchart_x}
      bind:y={barchart_y}
      title={barchart_title}
    />
  </div>

  <div class="mt-32 chart-container">
    <HeatMap
      data={heatmapData}
      title="Focus Times"
      startDate="2022-05-01"
      endDate="2023-05-01"
    />
  </div>
</div>
