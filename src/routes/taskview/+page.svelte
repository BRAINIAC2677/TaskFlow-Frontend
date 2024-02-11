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
  import { toast } from "@zerodevx/svelte-toast";

  let taskFetching: boolean = false;
  let ec: any;

  let titleMaxLength = 40;

  function clipString(str: string, len: number): string {
    return str.length > len ? str.substring(0, len) + "..." : str;
  }

  async function updateTaskTime(
    requestID: string,
    taskID: string,
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
          request_id: requestID,
          id: taskID,
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
      console.error(requestID, "Error updating task time:", error);
      // need to restore the task to its original time
      let updateInfo = taskUpdateQueue.find((x) => x.requestID === requestID);
      if (updateInfo) {
        let task: CalendarViewTask = ec.getEventById(updateInfo.id);
        if (task) {
          task.start = updateInfo.oldStart;
          task.end = updateInfo.oldEnd;
        }
        ec.updateEvent(task);
      }
      throw error;
    } finally {
      // remove the request from the queue
      taskUpdateQueue = taskUpdateQueue.filter(
        (x) => x.requestID !== requestID
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
    title: string;
    oldStart: string;
    oldEnd: string;
    newStart: string;
    newEnd: string;
    handled: boolean;
  }

  let taskUpdateQueue: TaskUpdateInfo[] = [];

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
      let requestID: number =
        taskUpdateQueue.length > 0
          ? Math.max(...taskUpdateQueue.map((x) => parseInt(x.requestID))) + 1
          : 1;
      taskUpdateQueue.push({
        requestID: requestID.toString(),
        id: info.event.id,
        title: info.event.title,
        oldStart: info.oldEvent.start.toISOString(),
        oldEnd: info.oldEvent.end.toISOString(),
        newStart: info.event.start.toISOString(),
        newEnd: info.event.end.toISOString(),
        handled: false,
      });
      updateTaskTime(
        requestID.toString(),
        info.event.id,
        info.event.start.toISOString(),
        info.event.end.toISOString()
      )
        .then((res) => {
          console.log(info.event.title);
          toast.push(
            `Timeline shifting successful for \"<strong>${clipString(
              info.event.title,
              titleMaxLength
            )}</strong>\"`,
            {
              theme: {
                "--toastBackground": "#4caf50",
                "--toastProgressBackground": "#2e7d32",
              },
            }
          );
        })
        .catch((error) => {
          toast.push(
            `Error shifting timeline for \"<strong>${clipString(
              info.event.title,
              titleMaxLength
            )}</strong>\"`,
            {
              theme: {
                "--toastBackground": "#f44336",
                "--toastProgressBackground": "#c62828",
              },
            }
          );
        });
    },
    eventResize: function (info: any) {
      console.log("resize", info.event);
      let requestID: number =
        taskUpdateQueue.length > 0
          ? Math.max(...taskUpdateQueue.map((x) => parseInt(x.requestID))) + 1
          : 1;
      taskUpdateQueue.push({
        requestID: requestID.toString(),
        id: info.event.id,
        title: info.event.title,
        oldStart: info.oldEvent.start.toISOString(),
        oldEnd: info.oldEvent.end.toISOString(),
        newStart: info.event.start.toISOString(),
        newEnd: info.event.end.toISOString(),
        handled: false,
      });
      updateTaskTime(
        requestID.toString(),
        info.event.id,
        info.event.start.toISOString(),
        info.event.end.toISOString()
      )
        .then((res) => {
          console.log(info.event.title);
          toast.push(
            `Timeline extension successful for \"<strong>${clipString(
              info.event.title,
              titleMaxLength
            )}</strong>\"`,
            {
              theme: {
                "--toastBackground": "#4caf50",
                "--toastProgressBackground": "#2e7d32",
              },
            }
          );
        })
        .catch((error) => {
          toast.push(
            `Error extending timeline for \"<strong>${clipString(
              info.event.title,
              titleMaxLength
            )}</strong>\"`,
            {
              theme: {
                "--toastBackground": "#f44336",
                "--toastProgressBackground": "#c62828",
              },
            }
          );
        });
    },
    firstDay: 6, // Saturday
    pointer: true,
    nowIndicator: true,
    selectable: true,
    loading: function (isLoading: boolean) {
      taskFetching = isLoading;
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

  {#if taskFetching}
    <Toast
      divClass="fixed bottom-5 z-10 right-5 w-full max-w-xs p-4 bg-accent-200 text-ink-light dark:ink-dark shadow dark:bg-gray-800 gap-3 font-bold"
    >
      <Spinner />
      <span class="text-sm ml-5">Loading your tasks...</span>
    </Toast>
  {/if}
</div>
