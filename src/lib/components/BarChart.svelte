<script lang="ts">
  import { Bar } from "svelte-chartjs";

  export let title: string;
  export let x: string[];
  export let y: number[];

  let data = {
    labels: x,
    datasets: [
      {
        label: title,
        data: y,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(25, 20, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(25, 20, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

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
          text: "Day Name",
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

<div class="p-4 bg-accent-100 dark:bg-accent-700 rounded-lg shadow-xl">
  <Bar {data} {options} />
</div>
