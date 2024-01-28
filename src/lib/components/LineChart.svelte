<script lang="ts">
  import { Line } from "svelte-chartjs";
  import Chart from "chart.js/auto";
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
    scales: {
      x: {
        title: {
          display: true,
          text: "Weeks",
          color: "black", // You can change the color
          font: {
            size: 16, // You can adjust the font size
          },
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: "Number of Completed Tasks",
          color: "black", // You can change the color
          font: {
            size: 16, // You can adjust the font size
          },
        },
        beginAtZero: true,
      },
    },
  };
</script>

<div class="p-4 bg-accent-100 dark:bg-accent-700 rounded shadow-xl">
  <Line {data} {options} />
</div>
