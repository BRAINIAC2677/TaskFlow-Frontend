<script lang="ts">
  import Calendar from "@event-calendar/core";
  import TimeGrid from "@event-calendar/time-grid";
  import DayGrid from "@event-calendar/day-grid";
  import List from "@event-calendar/list";
  import ResourceTimeGrid from "@event-calendar/resource-time-grid";
  import Interaction from "@event-calendar/interaction";
  import server_url from "$lib/stores/server_store";
  import { onMount } from "svelte";
  import type { CalendarViewTask } from "$lib/interfaces/task";

  async function fetch_tasks(): Promise<CalendarViewTask[]> {
    const token: string = localStorage.getItem("access_token") || "";
    const headers = new Headers({
      Authorization: token,
      "Content-Type": "application/json",
    });

    try {
      const response = await fetch($server_url + "/task/get-all", {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let res = await response.json();
      let ret: Array<CalendarViewTask> = [];
      res.forEach((task: any) => {
        let t: CalendarViewTask = {
          id: task.id,
          start: task.start,
          end: task.end,
          title: task.title,
          editable: task.editable,
          backgroundColor: task.backgroundcolor,
        };
        ret.push(t);
      });
      return ret;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function update_task_time(task_id: string, start: string, end: string) {
    const token: string = localStorage.getItem("access_token") || "";
    const headers = new Headers({
      Authorization: token,
      "Content-Type": "application/json",
    });

    try {
      const response = await fetch($server_url + "/task/update-time", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          id: task_id,
          start: start,
          end: end,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let res = await response.json();
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  let plugins = [TimeGrid, DayGrid, List, ResourceTimeGrid, Interaction];
  let options = {
    allDaySlot: true, // default true anyway
    editable: true,
    dragScroll: true,
    view: "dayGridMonth",
    headerToolbar: {
      start: "prev,next today",
      center: "title",
      end: "dayGridMonth listDay listWeek listYear timeGridDay timeGridWeek",
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
    events: [] as CalendarViewTask[],
    eventDrop: function (info: any) {
      console.log("drag & drop", info.event);
      update_task_time(
        info.event.id,
        info.event.start.toISOString(),
        info.event.end.toISOString()
      );
    },
    eventResize: function (info: any) {
      console.log("resize", info.event);
      update_task_time(
        info.event.id,
        info.event.start.toISOString(),
        info.event.end.toISOString()
      );
    },
    firstDay: 6, // Saturday
    pointer: true,
    eventAllUpdated: function (info: any) {
      console.log("all updated", info.event);
    },
    nowIndicator: true,
    selectable: true,
  };

  onMount(async () => {
    options.events = await fetch_tasks();
  });
</script>

<svelte:head>
  <title>Task View</title>
</svelte:head>

<div
  class="px-20 py-3 bg-accent-50 dark:bg-accent-700 rounded-lg shadow-md dark:bg-gray-800 min-h-screen"
>
  <h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-100">Tasks</h1>
  <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
    View your tasks here.
    <Calendar {plugins} {options} />
  </p>
</div>
