<script lang="ts">
  import Calendar from "@event-calendar/core";
  import TimeGrid from "@event-calendar/time-grid";
  import DayGrid from "@event-calendar/day-grid";
  import List from "@event-calendar/list";
  import ResourceTimeGrid from "@event-calendar/resource-time-grid";
  import Interaction from "@event-calendar/interaction";

  let plugins = [TimeGrid, DayGrid, List, ResourceTimeGrid, Interaction];
  let options = {
    editable: true,
    dragScroll: true,
    view: "dayGridMonth",
    headerToolbar: {
      start: "title",
      center: "",
      end: "dayGridMonth listDay listWeek listYear timeGridDay timeGridWeek today prev,next",
    },
    buttonText: {
      close: "Close",
      dayGridMonth: "Month View",
      listDay: "Daily List",
      listMonth: "Monthly List",
      listWeek: "Weekly List",
      listYear: "Yearly List",
      resourceTimeGridDay: "day",
      resourceTimeGridWeek: "week",
      timeGridDay: "Day Breakdown",
      timeGridWeek: "Week Breakdown",
      today: "Today",
    },
    events: [
      {
        title: "CG: Ray Tracing Workshop",
        start: "2023-12-19T01:46:00",
        end: "2023-12-19T03:46:00",
        backgroundColor: "#8B0000",
      },
      {
        title: "AI: Ethics in Artificial Intelligence",
        start: "2023-12-22T23:16:00",
        end: "2023-12-23T01:16:00",
        backgroundColor: "#228B22",
      },
      {
        title: "ML: Clustering Algorithms Discussion",
        start: "2023-12-20T01:16:00",
        end: "2023-12-20T03:16:00",
        backgroundColor: "#8B0000",
      },
      {
        title: "Comp. Security: Cybersecurity Seminar",
        start: "2023-12-19T05:19:00",
        end: "2023-12-19T07:19:00",
        backgroundColor: "#228B22",
      },
      {
        title: "Economics: Market Analysis Presentation",
        start: "2023-12-16T14:26:00",
        end: "2023-12-16T16:26:00",
        backgroundColor: "#8B0000",
      },
      {
        title: "Graph Theory: Graph Coloring Challenge",
        start: "2023-12-20T23:38:00",
        end: "2023-12-21T01:38:00",
        backgroundColor: "#8B008B",
      },
      {
        title: "AI: Reinforcement Learning Workshop",
        start: "2023-12-21T08:19:00",
        end: "2023-12-21T10:19:00",
        backgroundColor: "#8B0000",
      },
      {
        title: "ML: Natural Language Processing Assignment",
        start: "2023-12-17T01:49:00",
        end: "2023-12-17T03:49:00",
        backgroundColor: "#228B22",
      },
      {
        title: "Comp. Security: Penetration Testing Lab",
        start: "2023-12-17T02:57:00",
        end: "2023-12-17T05:57:00",
        backgroundColor: "#8B0000",
      },
      {
        title: "Graph Theory: Hamiltonian Paths Exercise",
        start: "2023-12-17T04:25:00",
        end: "2023-12-17T08:25:00",
        backgroundColor: "#A0522D",
      },
      {
        title: "CG: 3D Modeling Challenge",
        start: "2024-03-08T23:07:00",
        end: "2024-03-09T01:07:00",
        backgroundColor: "#8B0000",
      },
      {
        title: "AI: Deep Learning Project Presentation",
        start: "2024-07-22T19:26:00",
        end: "2024-07-22T21:26:00",
        backgroundColor: "#228B22",
      },
      {
        title: "Economics: Economic Policy Analysis",
        start: "2024-07-12T05:57:00",
        end: "2024-07-12T07:57:00",
        backgroundColor: "#A0522D",
      },
      {
        title: "CG: Animation Rendering Workshop",
        start: "2024-12-14T13:24:00",
        end: "2024-12-14T15:24:00",
        backgroundColor: "#8B0000",
      },
      {
        title: "Graph Theory: Planar Graphs Seminar",
        start: "2024-06-15T10:39:00",
        end: "2024-06-15T12:39:00",
        backgroundColor: "#8B0000",
      },
      {
        title: "AI: Computer Vision Research",
        start: "2024-03-25T18:15:00",
        end: "2024-03-25T20:15:00",
        backgroundColor: "#A0522D",
      },
      {
        title: "Economics: International Trade Simulation",
        start: "2023-12-17T09:05:00",
        end: "2023-12-17T11:05:00",
        backgroundColor: "#003900",
      },
      {
        title: "Comp. Security: Network Security Workshop",
        start: "2024-05-26T06:44:00",
        end: "2024-05-26T08:44:00",
        backgroundColor: "#A0522D",
      },
      {
        title: "AI: Natural Language Generation Project",
        start: "2024-02-05T08:25:00",
        end: "2024-02-05T10:25:00",
        backgroundColor: "#A0522D",
      },
      {
        title: "ML: Time Series Analysis Seminar",
        start: "2024-07-12T20:25:00",
        end: "2024-07-12T22:25:00",
        backgroundColor: "#228B22",
      },
      {
        title: "Economics: Economic Forecasting Workshop",
        start: "2024-08-28T01:01:00",
        end: "2024-08-28T03:01:00",
        backgroundColor: "#8B0000",
      },
      {
        title: "Graph Theory: Network Flow Analysis",
        start: "2024-05-17T04:28:00",
        end: "2024-05-17T06:28:00",
        backgroundColor: "#A0522D",
      },
      {
        title: "AI: Machine Learning Ethics Debate",
        start: "2023-12-22T08:03:00",
        end: "2023-12-22T09:03:00",
        backgroundColor: "#8B0000",
      },
      {
        title: "ML: Ensemble Learning Challenge",
        start: "2024-09-10T14:31:00",
        end: "2024-09-10T16:31:00",
        backgroundColor: "#228B22",
      },
      {
        title: "Comp. Security: Digital Forensics Lab",
        start: "2024-09-19T02:12:00",
        end: "2024-09-19T04:12:00",
        backgroundColor: "#A0522D",
      },
      {
        title: "Graph Theory: Graph Traversal Exercise",
        start: "2024-03-24T16:18:00",
        end: "2024-03-24T18:18:00",
        backgroundColor: "#228B22",
      },
      {
        title: "AI: Advanced Reinforcement Learning",
        start: "2024-07-03T02:42:00",
        end: "2024-07-03T04:42:00",
        backgroundColor: "#A0522D",
      },
      {
        title: "Economics: Behavioral Economics Seminar",
        start: "2024-12-13T05:04:00",
        end: "2024-12-13T07:04:00",
        backgroundColor: "#8B0000",
      },
      {
        title: "AI: Natural Language Processing Symposium",
        start: "2024-11-07T05:21:00",
        end: "2024-11-07T07:21:00",
        backgroundColor: "#8B0000",
      },
      {
        title: "ML: Reinforcement Learning in Robotics",
        start: "2024-10-29T11:08:00",
        end: "2024-10-29T13:08:00",
        backgroundColor: "#228B22",
      },
    ],
  };
</script>

<div
  class="px-10 py-3 mb-8 bg-accent-50 dark:bg-accent-700 rounded-lg shadow-md dark:bg-gray-800 min-h-screen"
>
  <h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-100">Tasks</h1>
  <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
    View your tasks here.
    <Calendar {plugins} {options} />
  </p>
</div>
