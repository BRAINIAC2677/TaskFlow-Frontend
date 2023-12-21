<script lang="ts">
  import type { Task } from "$lib/interfaces/task";
  import { Status, Label } from "$lib/interfaces/task";
  import { Circle } from "svelte-loading-spinners";

  export let data: any;

  let task: Task = data.task;
  let img_loaded: boolean = false;

  let new_checklist_item: { name: string; is_checked: boolean } = {
    name: "",
    is_checked: false,
  };

  function upload_cover_photo(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
  }

  // Messaging
  let chatMessages = [
    {
      id: 1,
      text: "Hey, have you finished the report? You seem to be putting it off.",
      sender: "TaskFlow",
      timestamp: "10:15 AM",
    },
    {
      id: 2,
      text: "Not yet, I'll upload it by tonight. Actually I'm stuck at a point. Can you help me out? I'm not sure how to proceed.",
      sender: "Asif Azad",
      timestamp: "10:17 AM",
    },
    {
      id: 3,
      text: "Okay, let me know if you need any help.",
      sender: "TaskFlow",
      timestamp: "10:18 AM",
    },
    {
      id: 4,
      text: "Sure, thanks.",
      sender: "Asif Azad",
      timestamp: "10:19 AM",
    },
  ];

  function send_message() {}

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

<div class="flex flex-wrap md:flex-nowrap min-h-screen">
  <!-- Left side: Task Detail Editing -->
  <div
    bind:this={left_panel}
    class="flex flex-col bg-white dark:bg-gray-800 p-4"
    style="width: 35%"
  >
    <div class="flex flex-col lg:flex-row gap-10">
      <!-- Task Details Section -->
      <div
        class="bg-white shadow-lg rounded-lg p-6 w-full lg:w-2/3 max-w-xl mx-auto"
      >
        <h2 class="text-2xl font-semibold mb-4">{task.name}</h2>

        <!-- Cover Photo -->
        <div class="mb-4">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="text-gray-700 font-bold">Cover Photo</label>

          {#if !img_loaded}
            <div
              class="flex justify-center items-center h-auto flex-col my-auto"
            >
              <Circle size="3" color="#000000" unit="cm" duration="1s" />
            </div>
          {/if}
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img
            src={task.cover_photo_link}
            alt="Uploaded Photo"
            class={img_loaded ? "mt-4 w-full h-auto" : "hidden"}
            on:load={() => {
              img_loaded = true;
            }}
            on:error={() => {
              img_loaded = false;
            }}
          />
          <input
            type="file"
            class="mt-3 block w-full"
            on:change={upload_cover_photo}
          />
          <!-- Conditional display of uploaded image -->
        </div>

        <!-- Color -->
        <div class="mb-4">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="text-gray-700 font-bold">Label Color</label>
          <input
            type="color"
            class="mt-1 block w-full"
            bind:value={task.color}
            on:change={() => {
              console.log(task.color);
            }}
          />
        </div>

        <!-- Start Date and Time -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="text-gray-700 font-bold" for="start-date"
              >Start Date</label
            >
            <input
              id="start-date"
              type="date"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            <label class="text-gray-700 font-bold" for="start-time"
              >Start Time</label
            >
            <input
              id="start-time"
              type="time"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              bind:value={start_time_str}
              on:change={() => {
                const [hours, minutes] = start_time_str.split(":");
                task.start_time.setHours(parseInt(hours), parseInt(minutes));
              }}
            />
          </div>
        </div>

        <!-- Due Date and Time -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="text-gray-700 font-bold" for="due-date"
              >Due Date</label
            >
            <input
              id="due-date"
              type="date"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            <label class="text-gray-700 font-bold" for="due-time"
              >Due Time</label
            >
            <input
              id="due-time"
              type="time"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              bind:value={due_time_str}
              on:change={() => {
                const [hours, minutes] = due_time_str.split(":");
                task.due_time.setHours(parseInt(hours), parseInt(minutes));
              }}
            />
          </div>
        </div>

        <!-- Label -->
        <div class="mb-4">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="text-gray-700 font-bold">Label</label>
          <select
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            bind:value={task.label}
          >
            {#each Object.values(Label) as label}
              <option value={label}>{label}</option>
            {/each}
          </select>
        </div>

        <!-- Checklist -->
        <div class="mb-4">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="text-gray-700 font-bold">Checklist</label>
          <div class="mt-1">
            {#each task.checklist_items as item, i}
              <div class="flex items-center mb-2">
                <input
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  bind:checked={item.is_checked}
                />
                <span class="ml-2 text-gray-700">{item.name}</span>
              </div>
            {/each}
          </div>
          <div class="flex flex-col p-4 rounded-lg mt-4">
            <input
              type="text"
              class="flex-1 mr-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Add a new item"
              bind:value={new_checklist_item.name}
            />
            <button
              class="w-20 h-10 bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 my-2 px-4 rounded mx-auto"
              on:click={() => {
                if (new_checklist_item.name.trim() === "") return;
                task.checklist_items.push(new_checklist_item);
                task.checklist_items = task.checklist_items;
                new_checklist_item = { name: "", is_checked: false };
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Draggable Divider -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="cursor-col-resize bg-gray-400 dark:bg-gray-700 p-1"
    on:mousedown={init_drag}
  >
    <!-- This is the draggable area -->
  </div>
  <!-- Right side: Chat Window-->
  <div class="flex-1 bg-white dark:bg-gray-900 p-4">
    <h2 class="text-xl font-semibold text-black dark:text-black mb-4">
      Chat Window
    </h2>
    <div class="space-y-6 mb-6">
      {#each chatMessages as message}
        <div
          class={message.sender === "TaskFlow"
            ? "flex items-end space-x-2"
            : "flex items-end space-x-2 justify-end"}
        >
          <div>
            <p class="text-sm font-bold">{message.sender}</p>
            <div
              class="p-3 bg-blue-800 dark:bg-gray-600 text-white dark:text-white rounded-lg rounded-br-none max-w-xs lg:max-w-md"
            >
              <p class="text-sm">{message.text}</p>
            </div>
            <p class="text-xs text-black dark:text-gray-400 text-right mt-1">
              {message.timestamp}
            </p>
          </div>
        </div>
      {/each}
    </div>
    <div class="pt-4 text-center">
      <textarea
        class="w-full p-2 text-sm text-black dark:text-gray-300 bg-white dark:bg-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
        rows="2"
        placeholder="Type your message..."
      ></textarea>
      <button
        class="mt-2 w-20 h-10 mx-auto max-w-3px bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded flex items-center justify-center"
        on:click={send_message}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="16"
          viewBox="0 0 512 512"
          ><path
            d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"
          /></svg
        >

        Send
      </button>
    </div>
  </div>
</div>
