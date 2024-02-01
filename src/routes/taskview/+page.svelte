<script lang="ts">
  import Calendar from "@event-calendar/core";
  import TimeGrid from "@event-calendar/time-grid";
  import DayGrid from "@event-calendar/day-grid";
  import List from "@event-calendar/list";
  import ResourceTimeGrid from "@event-calendar/resource-time-grid";
  import Interaction from "@event-calendar/interaction";
  import server_url from "$lib/stores/server_store";
  import type { CalendarViewTask } from "$lib/interfaces/task";
  import { Toast, Spinner } from "flowbite-svelte";

  let task_fetching: boolean = false;
  let ec: any;

  async function update_task_time(
    request_id: string,
    task_id: string,
    start: string,
    end: string
  ) {
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
          request_id: request_id,
          id: task_id,
          start: start,
          end: end,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let res = await response.json();
      console.log("success", res);
      return res;
    } catch (error) {
      console.error(request_id, "Error updating task time:", error);
      // need to restore the task to its original time
      let update_info = task_update_queue.find(
        (x) => x.requestID === request_id
      );
      if (update_info) {
        let task: CalendarViewTask = ec.getEventById(update_info.id);
        if (task) {
          task.start = update_info.oldStart;
          task.end = update_info.oldEnd;
        }
        ec.updateEvent(task);
      }
      throw error;
    } finally {
      // remove the request from the queue
      task_update_queue = task_update_queue.filter(
        (x) => x.requestID !== request_id
      );
    }
  }

  // interfaces for fetching tasks
  interface FetchInfo {
    startStr: string;
    endStr: string;
    start: Date;
    end: Date;
  }

  interface TaskUpdateInfo {
    requestID: string;
    id: string;
    oldStart: string;
    oldEnd: string;
    newStart: string;
    newEnd: string;
    handled: boolean;
  }

  let task_update_queue: TaskUpdateInfo[] = [];

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
    eventDrop: function (info: any) {
      console.log("drag & drop", info.event);
      let request_id: number =
        task_update_queue.length > 0
          ? Math.max(...task_update_queue.map((x) => parseInt(x.requestID))) + 1
          : 1;
      task_update_queue.push({
        requestID: request_id.toString(),
        id: info.event.id,
        oldStart: info.oldEvent.start.toISOString(),
        oldEnd: info.oldEvent.end.toISOString(),
        newStart: info.event.start.toISOString(),
        newEnd: info.event.end.toISOString(),
        handled: false,
      });
      update_task_time(
        request_id.toString(),
        info.event.id,
        info.event.start.toISOString(),
        info.event.end.toISOString()
      );
    },
    eventResize: function (info: any) {
      console.log("resize", info.event);
      let request_id: number =
        task_update_queue.length > 0
          ? Math.max(...task_update_queue.map((x) => parseInt(x.requestID))) + 1
          : 1;
      task_update_queue.push({
        requestID: request_id.toString(),
        id: info.event.id,
        oldStart: info.oldEvent.start.toISOString(),
        oldEnd: info.oldEvent.end.toISOString(),
        newStart: info.event.start.toISOString(),
        newEnd: info.event.end.toISOString(),
        handled: false,
      });
      update_task_time(
        request_id.toString(),
        info.event.id,
        info.event.start.toISOString(),
        info.event.end.toISOString()
      );
    },
    firstDay: 6, // Saturday
    pointer: true,
    nowIndicator: true,
    selectable: true,
    loading: function (isLoading: boolean) {
      task_fetching = isLoading;
    },
    eventSources: [
      {
        events: function (
          fetchInfo: FetchInfo,
          successCallback: (events: CalendarViewTask[]) => void,
          failureCallback: (error: any) => void
        ) {
          // console.log(fetchInfo);
          const requestBody = {
            start: fetchInfo.startStr,
            end: fetchInfo.endStr,
          };

          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("access_token") || "",
            },
            body: JSON.stringify(requestBody),
          };

          const url = $server_url + "/task/get-ranged-tasks";

          fetch(url, requestOptions)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((eventsData) => {
              const events = eventsData.map((event: any) => {
                return {
                  id: event.id,
                  start: event.start,
                  end: event.end,
                  title: event.title,
                  editable: event.editable,
                  backgroundColor: event.backgroundcolor,
                };
              });
              console.log("Fetching done", events);
              successCallback(events);
            })
            .catch((error) => {
              console.error("Error fetching tasks:", error);
              failureCallback(error);
            })
            .finally(() => {});
        },
      },
    ],
  };
</script>

<svelte:head>
  <title>Task View</title>
</svelte:head>

<div
  class="px-20 py-3 bg-accent-50 dark:bg-accent-700 rounded-lg shadow-md dark:bg-gray-800 min-h-screen"
>
  <h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-100">Tasks</h1>
  <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
    View and manage your tasks
    <Calendar bind:this={ec} {plugins} {options} />
  </p>

  {#if task_fetching}
    <Toast
      divClass="fixed bottom-5 z-10 right-5 w-full max-w-xs p-4 bg-accent-200 text-ink-light dark:ink-dark shadow dark:bg-gray-800 gap-3 font-bold"
    >
      <Spinner />
      <span class="text-sm ml-5">Loading your tasks...</span>
    </Toast>
  {/if}
</div>
