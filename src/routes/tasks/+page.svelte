<script lang="ts">
  import type { Task } from "$lib/interfaces/task";
  import { Status, Label } from "$lib/interfaces/task";
  import { dummy_tasks } from "$lib/dummy_data/tasks";

  export let task: Task = dummy_tasks[0];

  let new_checklist_item: { name: string; is_checked: boolean } = {
    name: "",
    is_checked: false,
  };

  function upload_cover_photo(event: Event) {
    // Handle file upload logic here
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
      text: "Not yet, I'll upload it by tonight.",
      sender: "Asif Azad",
      timestamp: "10:17 AM",
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
    console.log(left_panel_width);
  }

  function stop_drag() {
    document.documentElement.removeEventListener("mousemove", do_drag, false);
    document.documentElement.removeEventListener("mouseup", stop_drag, false);
  }
</script>

<div class="flex flex-wrap md:flex-nowrap min-h-screen">
  <!-- Left side: Task Detail Editing -->
  {#if left_panel_width >= 100}
  <div
    bind:this={left_panel}
    class="flex flex-col bg-white dark:bg-gray-800 p-4"
    style="width: 60%"
  >
    <div class="md:flex-1 p-8 overflow-auto">
      <div class="mb-12">
        <h1 class="text-2xl font-bold mb-2 text-black dark:text-gray-400">
          {task.name}
        </h1>
      </div>

      <div class="mb-6">
        <h3 class="text-black dark:text-gray-300 mb-2">Due Date</h3>
        <input
          type="date"
          class="w-1/2 rounded-lg bg-white dark:bg-gray-800 p-4 text-black dark:text-gray-300 focus:ring-2 focus:ring-blue-600"
          bind:value={task.due_date}
        />
      </div>

      <div class="mb-6">
        <h3 class="text-black dark:text-gray-300 mb-2">Label</h3>
        <select
          class="w-1/2 rounded-lg bg-white dark:bg-gray-800 p-4 text-black dark:text-gray-300 focus:ring-2 focus:ring-blue-600"
          bind:value={task.label}
        >
          {#each Object.values(Label) as label}
            <option value={label}>{label}</option>
          {/each}
        </select>
      </div>

      <div class="mb-6 border p-4 rounded-lg">
        <h3 class="text-black dark:text-gray-300 mb-2">Cover Photo</h3>
        <input
          id="cover-photo"
          type="file"
          class="w-full rounded-lg bg-white dark:bg-gray-800 p-2 text-black dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          on:change={upload_cover_photo}
        />
        <!-- Conditional display of uploaded image -->
        <!-- {#if uploaded_photo} -->
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <!-- <img
          src="https://picsum.photos/seed/picsum/200/300"
          alt="Uploaded Photo"
          class="mt-4 w-full h-auto"
        />
        {/if} -->
      </div>

      <div class="mb-6 border p-4 rounded-lg">
        <h3 class="text-black dark:text-gray-300 mb-2">Checklist</h3>
        {#each task.checklist_items as item, i}
          <div class="flex items-center mb-2">
            <input
              type="checkbox"
              class="form-checkbox h-5 w-5 text-blue-600 rounded bg-white dark:bg-gray-800 border-none"
              bind:checked={item.is_checked}
            />
            <span class="ml-2 text-black dark:text-gray-300">{item.name}</span>
          </div>
        {/each}
        <div class="flex border p-4 rounded-lg mt-4">
          <input
            class="flex-1 rounded-lg bg-white dark:bg-gray-800 p-4 text-black dark:text-gray-300 focus:ring-2 focus:ring-blue-600"
            placeholder="Add a new task..."
            bind:value={new_checklist_item.name}
          />
          <button
            class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            on:click={() => {
              if (new_checklist_item.name.trim() === "") return;
              task.checklist_items.push(new_checklist_item);
              task.checklist_items = task.checklist_items;
              new_checklist_item = { name: "", is_checked: false };
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
              ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
              /></svg
            >
            Add</button
          >
        </div>
      </div>
    </div>
  </div>
  {/if}

  <!-- Draggable Divider -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="cursor-col-resize bg-gray-400 dark:bg-gray-700 p-1"
    on:mousedown={init_drag}
  >
    <!-- This is the draggable area -->
  </div>

  <!-- Right side: Chat Window-->
  {#if left_panel_width < 1250}
  <div class="flex-1 bg-white dark:bg-gray-900 p-4">
    <h2 class="text-xl font-semibold text-black dark:text-black mb-4">
      Chat Window
    </h2>
    <div class="space-y-6 mb-6">
      {#each chatMessages as message, index}
        <div
          class="flex items-end space-x-2 {index % 2 === 0
            ? 'justify-end'
            : ''}"
        >
          <div class="flex-1">
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
        class="mt-2 w-1/4 mx-auto bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded flex items-center justify-center"
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
  {/if}
</div>
