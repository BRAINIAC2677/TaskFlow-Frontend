<script lang="ts">
  import Chart from "$lib/components/Chart.svelte";
  import InsightOverview from "$lib/components/InsightOverview.svelte";
  import DailyTaskCompletionLineChart from "$lib/components/DailyTaskCompletionLineChart.svelte";
  import WeeklyTaskCompletionBarChart from "$lib/components/WeeklyTaskCompletionBarChart.svelte";
  import TaskProgressionPieChart from "$lib/components/TaskProgressionPieChart.svelte";

  let scatterPlotOptions = {
    chart: {
      type: "scatter",
      zoom: {
        enabled: true,
        type: "xy",
      },
    },
    series: [
      {
        name: "Sample A",
        data: [
          [16, 5.4],
          [21, 2],
          [25, 3],
          [18, 5],
          [23, 4],
        ],
      },
      {
        name: "Sample B",
        data: [
          [17, 4],
          [22, 2.5],
          [24, 3.5],
          [19, 4.5],
          [23, 3.5],
        ],
      },
    ],
    xaxis: {
      tickAmount: 10,
      labels: {
        formatter: function (val: any) {
          return parseFloat(val).toFixed(1);
        },
      },
    },
    yaxis: {
      tickAmount: 7,
    },
  };

  let heatmapOptions = {
    chart: {
      type: "heatmap",
    },
    series: Array.from({ length: 4 }, (_, i) => ({
      name: `Metric ${i + 1}`,
      data: Array.from({ length: 24 }, (_, j) => ({
        x: `Day ${j + 1}`,
        y: Math.floor(Math.random() * 100),
      })),
    })),
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 25,
              name: "low",
              color: "#00A100",
            },
            {
              from: 26,
              to: 75,
              name: "medium",
              color: "#128FD9",
            },
            {
              from: 76,
              to: 100,
              name: "high",
              color: "#FFB200",
            },
          ],
        },
      },
    },
  };

  let stackedBarChartOptions = {
    chart: {
      type: "bar",
      stacked: true,
    },
    series: [
      {
        name: "Product A",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "Product B",
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: "Product C",
        data: [11, 17, 15, 15, 21, 14],
      },
      {
        name: "Product D",
        data: [21, 7, 25, 13, 22, 8],
      },
    ],
    xaxis: {
      categories: [
        "2011 Q1",
        "2011 Q2",
        "2011 Q3",
        "2011 Q4",
        "2012 Q1",
        "2012 Q2",
      ],
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  let containerClass: string =
    "text-center mx-auto w-full md:w-3/4 lg:w-3/4 xl:w-2/3 2xl:w-1/2";
  let titleClass: string =
    "text-2xl font-bold text-gray-800 dark:text-white mb-4";
</script>

<svelte:head>
  <title>Insights</title>
</svelte:head>

<div
  class="flex flex-col space-y-8 mx-8 mt-8 sm:mx-4 md:mx-8 lg:mx-10 xl:mx-20 2xl:mx-32"
>
  <div class={containerClass}>
    <h2 class={titleClass}>Insights Overview</h2>
    <div>
      <InsightOverview />
    </div>
  </div>

  <div class={containerClass}>
    <h2 class={titleClass}>Daily Task Completion</h2>
    <div class="shadow-lg rounded-lg overflow-hidden p-4">
      <DailyTaskCompletionLineChart />
    </div>
  </div>

  <div class={containerClass}>
    <h2 class={titleClass}>Weekly Task Completion</h2>
    <div class="shadow-lg rounded-lg overflow-hidden p-4">
      <WeeklyTaskCompletionBarChart />
    </div>
  </div>

  <div class={containerClass}>
    <h2 class={titleClass}>Task Progression</h2>
    <div class="shadow-lg rounded-lg overflow-hidden p-4">
      <TaskProgressionPieChart />
    </div>
  </div>

  <div class={containerClass}>
    <h2 class={titleClass}>Performance Analysis</h2>
    <div class="shadow-lg rounded-lg overflow-hidden p-4">
      <Chart options={stackedBarChartOptions} />
    </div>
  </div>

  <div class={containerClass}>
    <h2 class={titleClass}>Daily Task Heatmap</h2>
    <div class="shadow-lg rounded-lg overflow-hidden p-4">
      <Chart options={heatmapOptions} />
    </div>
  </div>

  <div class={containerClass}>
    <h2 class={titleClass}>Detailed Performance Analysis</h2>
    <div class="shadow-lg rounded-lg overflow-hidden p-4">
      <Chart options={scatterPlotOptions} />
    </div>
  </div>
</div>
