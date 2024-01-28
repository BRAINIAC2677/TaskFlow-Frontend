<script lang="ts">
    import InsightOverview from "../../lib/components/InsightOverview.svelte";
    import LineChart from "../../lib/components/LineChart.svelte";
    import PieChart from "../../lib/components/PieChart.svelte";
    import BarChart from "../../lib/components/BarChart.svelte";
    import HeatMap from "../../lib/components/HeatMap.svelte";

    import { heatmapData } from "$lib/dummy_data/heatmap";

    let barchart_x = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let barchart_y = [12, 19, 3, 5, 2, 3, 10];
    let barchart_title = "Tasks in Last 7 Days";

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

    let linechart_title = "Progress Over Time";
    let linechart_data = {
        labels: [
            "Jan W1",
            "Jan W2",
            "Jan W3",
            "Jan W4",
            "Feb W1",
            "Feb W2",
            "Feb W3",
            "Feb W4",
            "Mar W1",
            "Mar W2",
            "Mar W3",
            "Mar W4",
            "Apr W1",
            "Apr W2",
            "Apr W3",
            "Apr W4",
            "May W1",
            "May W2",
            "May W3",
            "May W4",
            "Jun W1",
            "Jun W2",
            "Jun W3",
            "Jun W4",
        ],
        datasets: [
            {
                label: "Weekly Task Completion",
                data: Array.from({ length: 24 }, () =>
                    Math.floor(Math.random() * 5),
                ),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };
</script>

<div class="flex-col pb-32 mt-32 mx-80">
    <div class="chart-container">
        <InsightOverview title="Overview" />
    </div>

    <div class="mt-32 chart-container">
        <LineChart title={linechart_title} data={linechart_data} />
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
        <BarChart x={barchart_x} y={barchart_y} title={barchart_title} />
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
