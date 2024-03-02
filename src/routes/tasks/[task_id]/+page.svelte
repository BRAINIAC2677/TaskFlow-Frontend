<script lang="ts">
  import { onMount } from "svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import server_url from "$lib/stores/server_store";
  import ChatWindow from "$lib/components/ChatWindow.svelte";
  import { page } from "$app/stores";

  let task_id: number = Number($page.params.task_id);

  let task: Task = {
    id: 0,
    name: "",
    description: "",
    start_time: new Date(),
    due_time: new Date(),
    labels: [],
    label_color: "#000000",
    cover_url: "",
    checklist_items: [],
  };

  let new_checklist_item: CheckListItem = {
    item_id: 0,
    item_name: "",
    is_completed: false,
  };

  async function upload_cover_photo(event: any) {
    const file = event.target.files[0];
    if (!file) {
      toast.push("No file selected", {
        theme: {
          "--toastBackground": "red",
          "--toastProgressBackground": "pink",
          "--toastProgressText": "red",
          "--toastText": "white",
        },
      });
      return;
    }

    const form_data = new FormData();
    form_data.append("taskcover", file);
    form_data.append("task_id", task.id.toString());

    const headers = new Headers({
      Authorization: localStorage.getItem("access_token") || "",
    });

    try {
      const response = await fetch($server_url + "/task/taskcover-upload", {
        method: "POST",
        headers,
        body: form_data,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      toast.push("Cover photo uploaded successfully", {
        theme: {
          "--toastBackground": "green",
          "--toastProgressBackground": "lightgreen",
          "--toastProgressText": "green",
          "--toastText": "white",
        },
      }); 
      task.cover_url = data.url;
      // console.log("Cover photo uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.push("Error uploading cover photo", {
        theme: {
          "--toastBackground": "red",
          "--toastProgressBackground": "pink",
          "--toastProgressText": "red",
          "--toastText": "white",
        },
      });
    }
  }

  async function delete_cover_photo() {
    const headers = new Headers({
      Authorization: localStorage.getItem("access_token") || "",
      "Content-Type": "application/json",
    });

    try {
      const url = new URL($server_url + "/task/taskcover-delete");
      url.searchParams.set("task_id", task.id.toString());
      const response = await fetch(url.toString(), {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      task.cover_url = "";
      toast.push("Cover photo deleted successfully", {
        theme: {
          "--toastBackground": "green",
          "--toastProgressBackground": "lightgreen",
          "--toastProgressText": "green",
          "--toastText": "white",
        },
      });
      // console.log("Cover photo deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.push("Error deleting cover photo", {
        theme: {
          "--toastBackground": "red",
          "--toastProgressBackground": "pink",
          "--toastProgressText": "red",
          "--toastText": "white",
        },
      });
    }
  }

  async function get_task_detail() {
    const token = localStorage.getItem("access_token") || "";

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    const request = {
      method: "GET",
      headers,
    };

    try {
      const url = new URL($server_url + "/task/get-detail");
      url.searchParams.set("task_id", String(task_id));
      const response = await fetch(url.toString(), request);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        // console.log("Error fetching task detail");
      }
    } catch (error) {
      // console.log("Error fetching task detail");
    }
  }

  onMount(async () => {
    try {
      // console.log("Fetching task detail");
      if (task_id) {
        const data = await get_task_detail();
        // console.log(data);
        task = data;
        console.log(task);
      }
    } catch (error) {
      // console.log("Error fetching task detail");
    } finally {
      // console.log("Task detail fetched");
    }
  });

  // Dragging
  let start_x: number;
  let start_width: number;
  // This will be set using bind:this on the element
  let left_panel: HTMLElement;
  let left_panel_width: number = 600;

  function init_drag(e: MouseEvent) {
    start_x = e.clientX;
    start_width = left_panel.offsetWidth;
    document.documentElement.addEventListener("mousemove", do_drag, false);
    document.documentElement.addEventListener("mouseup", stop_drag, false);
  }

  function do_drag(e: MouseEvent) {
    let min_percentage = 0;
    let width = start_width + e.clientX - start_x;
    let total_width = document.documentElement.clientWidth;
    if (
      width < total_width * min_percentage ||
      width > total_width * (1 - min_percentage)
    )
      return;
    left_panel.style.width = start_width + e.clientX - start_x + "px";
    left_panel_width = start_width + e.clientX - start_x;
  }

  function stop_drag() {
    document.documentElement.removeEventListener("mousemove", do_drag, false);
    document.documentElement.removeEventListener("mouseup", stop_drag, false);
  }

  // Convert Date objects to the appropriate string format for the inputs
  // YYYY-MM-DDTHH:mm:ss.sssZ
  let start_date_str: string = task.start_time.toISOString().split("T")[0];
  let start_time_str: string = task.start_time
    .toISOString()
    .split("T")[1]
    .substring(0, 5);
  let due_date_str: string = task.due_time.toISOString().split("T")[0];
  let due_time_str: string = task.due_time
    .toISOString()
    .split("T")[1]
    .substring(0, 5);
</script>

<svelte:head>
  <title>Task Detail</title>
</svelte:head>

<div class="flex flex-wrap md:flex-nowrap">
  <div
    bind:this={left_panel}
    class="flex flex-col p-4 bg-accent-100 dark:bg-accent-900"
    style="width: 35%"
  >
    <div class="flex flex-col gap-10 lg:flex-row">
      <div
        class="w-full max-w-xl p-6 mx-auto rounded-lg shadow-lg bg-accent-100 lg:w-2/3"
      >
        <h2 class="mb-4 text-2xl font-semibold text-black">
          {task.name}
        </h2>
        <div class="mb-4">
          {#if task.cover_url}
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src="{task.cover_url}?t={new Date().getTime()}" alt="Cover Photo" class="w-full mb-4" />
            <button
              class="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
              on:click={delete_cover_photo}
            >
              Delete Cover Photo
            </button>
          {/if}
          <input
            type="file"
            id="coverUpload"
            class="hidden"
            accept="image/*"
            on:change={upload_cover_photo}
          />
          <button
            class="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            on:click={() => document.getElementById("coverUpload")?.click()}
          >
            Upload Cover Photo
          </button>
        </div>

        <div class="mb-4">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="font-bold text-gray-700">Label Color</label>
          <input
            type="color"
            class="block w-full mt-1"
            bind:value={task.label_color}
            on:change={() => {
              // console.log(task.label_color);
            }}
          />
        </div>

        <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <label class="font-bold text-gray-700" for="start-date"
              >Start Date</label
            >
            <input
              id="start-date"
              type="date"
              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              bind:value={start_date_str}
              on:change={() => {
                const [year, month, day] = start_date_str.split("-");
                task.start_time.setFullYear(
                  parseInt(year),
                  parseInt(month) - 1,
                  parseInt(day)
                );
              }}
            />
          </div>
          <div>
            <label class="font-bold text-gray-700" for="start-time"
              >Start Time</label
            >
            <input
              id="start-time"
              type="time"
              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              bind:value={start_time_str}
              on:change={() => {
                const [hours, minutes] = start_time_str.split(":");
                task.start_time.setHours(parseInt(hours), parseInt(minutes));
              }}
            />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
          <div>
            <label class="font-bold text-gray-700" for="due-date"
              >Due Date</label
            >
            <input
              id="due-date"
              type="date"
              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              bind:value={due_date_str}
              on:change={() => {
                const [year, month, day] = due_date_str.split("-");
                task.due_time.setFullYear(
                  parseInt(year),
                  parseInt(month) - 1,
                  parseInt(day)
                );
              }}
            />
          </div>
          <div>
            <label class="font-bold text-gray-700" for="due-time"
              >Due Time</label
            >
            <input
              id="due-time"
              type="time"
              class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              bind:value={due_time_str}
              on:change={() => {
                const [hours, minutes] = due_time_str.split(":");
                task.due_time.setHours(parseInt(hours), parseInt(minutes));
              }}
            />
          </div>
        </div>

        <div class="mb-4">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="font-bold text-gray-700">Checklist</label>
          <div class="mt-1">
            {#if task.checklist_items != undefined}
              {#each task.checklist_items as item, i}
                <div class="flex items-center mb-2">
                  <input
                    type="checkbox"
                    class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    bind:checked={item.is_completed}
                  />
                  <span class="ml-2 text-gray-700">{item.item_name}</span>
                </div>
              {/each}
            {/if}
          </div>
          <div class="flex flex-col p-4 mt-4 rounded-lg">
            <input
              type="text"
              class="flex-1 mr-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Add a new item"
              bind:value={new_checklist_item.item_name}
            />
            <button
              class="w-20 h-10 px-4 py-2 mx-auto my-2 font-bold text-black bg-blue-500 rounded hover:bg-blue-700"
              on:click={() => {
                if (new_checklist_item.item_name.trim() === "") return;
                task.checklist_items.push(new_checklist_item);
                task.checklist_items = task.checklist_items;
                new_checklist_item = {
                  item_name: "",
                  is_completed: false,
                  item_id: 0,
                };
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="p-1 my-3 cursor-col-resize bg-accent-50 dark:bg-accent-600"
    on:mousedown={init_drag}
  ></div>
  <ChatWindow bind:task_id />
</div>
