<!-- <script>
    // Dummy Gantt chart data (simplified)
    let projects = [
        { name: "Project Alpha", start: "2023-01-01", end: "2023-03-01" },
        { name: "Project Beta", start: "2023-02-15", end: "2023-04-15" },
        // Real Gantt chart would need a more complex implementation
    ];
</script>

<div class="p-4 bg-white rounded shadow">
    <h2>Project Progress</h2>
    <ul>
        {#each projects as project}
            <li>{project.name}: {project.start} to {project.end}</li>
        {/each}
    </ul>
</div> -->
<!-- <script>
    import Gantt from "svelte-gantt";

    // Extended Dummy Gantt chart data
    let tasks = [
        { id: 1, name: "Project Alpha", from: "2023-01-01", to: "2023-03-01" },
        { id: 2, name: "Project Beta", from: "2023-02-15", to: "2023-04-15" },
        { id: 3, name: "Project Gamma", from: "2023-04-01", to: "2023-06-01" },
        { id: 4, name: "Project Delta", from: "2023-05-15", to: "2023-07-15" },
        // Add more projects as needed
    ];

    let options = {
        fitWidth: true, // Fit tasks to width
        // Other options can be added as needed
    };
</script>

<div class="p-4 bg-white rounded shadow">
    <h2>Project Progress</h2>
    <Gantt {tasks} {options} />
</div> -->
<!-- <script lang="ts">
    import { onMount } from "svelte";

    let Gantt: any = null;
    let tasks = [
        { id: 1, name: "Project Alpha", from: "2023-01-01", to: "2023-03-01" },
        { id: 2, name: "Project Beta", from: "2023-02-15", to: "2023-04-15" },
        // ... other tasks
    ];

    let options = {
        fitWidth: true,
        // ... other options
    };

    onMount(async () => {
        console.log("Loading Gantt chart...");
        const ganttModule = await import("svelte-gantt");
        console.log("Gantt chart loaded!");
        Gantt = ganttModule.default;
        console.log("Gantt chart component ready!");
    });
</script>

<div class="p-4 bg-white rounded shadow">
    <h2>Project Progress</h2>
    {#if Gantt}
        <Gantt {tasks} {options} />
    {:else}
        <p>Loading...</p>
    {/if}
</div> -->
<script lang="ts">
    import { onMount } from "svelte";
    import { SvelteGantt, SvelteGanttTable } from "svelte-gantt";
    import { MomentSvelteGanttDateAdapter } from "svelte-gantt";
    import moment from "Moment";

    let GanttComponent: any = null;
    let tasks = [
        { id: 1, name: "Project Alpha", from: "2023-01-01", to: "2023-03-01" },
        { id: 2, name: "Project Beta", from: "2023-02-15", to: "2023-04-15" },
        // ... other tasks
    ];
    let dateAdapter = new MomentSvelteGanttDateAdapter(moment);

    let options = {
        fitWidth: true,
        // all dates in unix timestamp (milliseconds)
        dateAdapter: dateAdapter,
        rows: [
            {
                id: 1,
                name: "Project Alpha",
                tasks: [
                    {
                        id: 1,
                        name: "Task 1",
                        start: 1614556800000,
                        end: 1617244800000,
                    },
                    {
                        id: 2,
                        name: "Task 2",
                        start: 1617244800000,
                        end: 1619836800000,
                    },
                ],
            },
            {
                id: 2,
                name: "Project Beta",
                tasks: [
                    {
                        id: 3,
                        name: "Task 1",
                        start: 1617244800000,
                        end: 1619836800000,
                    },
                    {
                        id: 4,
                        name: "Task 2",
                        start: 1619836800000,
                        end: 1622515200000,
                    },
                ],
            },
        ],

        // ... other options
    };

    onMount(() => {
        var gantt = new SvelteGantt({
            // target a DOM element
            target: document.getElementById("example-gantt"),
            // svelte-gantt options
            props: options,
        });
    });

    // let key: number = 0;

    // onMount(async () => {
    //     console.log("Loading Gantt chart...");
    //     const ganttModule = await import("svelte-gantt");
    //     console.log("Gantt chart loaded!");
    //     console.log(ganttModule);
    //     console.log(ganttModule.SvelteGantt);
    //     GanttComponent = ganttModule.SvelteGantt;
    //     console.log("Gantt chart component ready!");
    //     key++;
    // });
</script>

<div class="p-4 bg-white rounded shadow">
    <h2>Project Progress</h2>
    <div id="example-gantt"></div>
</div>
