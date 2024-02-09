<script lang="ts">
    import type { Task } from "$lib/interfaces/task";
    import { Label } from "$lib/interfaces/task";
    import { Circle } from "svelte-loading-spinners";
    import { user_info_store } from "$lib/stores/user_store";
    import ChatWindow from "$lib/components/ChatWindow.svelte";

    export let data: any;

    let task: Task = data.task;
    let img_loaded: boolean = false;

    let task_id = task.id;

    let new_checklist_item: { name: string; is_checked: boolean } = {
        name: "",
        is_checked: false,
    };

    function upload_cover_photo(event: Event) {
        const target = event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        console.log(file);
    }

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
        document.documentElement.removeEventListener(
            "mousemove",
            do_drag,
            false,
        );
        document.documentElement.removeEventListener(
            "mouseup",
            stop_drag,
            false,
        );
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

<div class="flex flex-wrap min-h-screen md:flex-nowrap">
    <!-- Left side: Task Detail Editing -->
    <div
        bind:this={left_panel}
        class="flex flex-col p-4 bg-accent-50 dark:bg-accent-700"
        style="width: 35%"
    >
        <div class="flex flex-col gap-10 lg:flex-row">
            <!-- Task Details Section -->
            <div
                class="w-full max-w-xl p-6 mx-auto rounded-lg shadow-lg bg-accent-100 lg:w-2/3"
            >
                <h2 class="mb-4 text-2xl font-semibold text-black">
                    {task.name}
                </h2>

                <!-- Cover Photo -->
                <div class="mb-4">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="font-bold text-gray-700">Cover Photo</label>

                    {#if !img_loaded}
                        <div
                            class="flex flex-col items-center justify-center h-auto my-auto"
                        >
                            <Circle
                                size="3"
                                color="#000000"
                                unit="cm"
                                duration="1s"
                            />
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
                        class="block w-full mt-3"
                        on:change={upload_cover_photo}
                    />
                    <!-- Conditional display of uploaded image -->
                </div>

                <!-- Color -->
                <div class="mb-4">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="font-bold text-gray-700">Label Color</label>
                    <input
                        type="color"
                        class="block w-full mt-1"
                        bind:value={task.color}
                        on:change={() => {
                            console.log(task.color);
                        }}
                    />
                </div>

                <!-- Start Date and Time -->
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
                                const [year, month, day] =
                                    start_date_str.split("-");
                                task.start_time.setFullYear(
                                    parseInt(year),
                                    parseInt(month) - 1,
                                    parseInt(day),
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
                                const [hours, minutes] =
                                    start_time_str.split(":");
                                task.start_time.setHours(
                                    parseInt(hours),
                                    parseInt(minutes),
                                );
                            }}
                        />
                    </div>
                </div>

                <!-- Due Date and Time -->
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
                                const [year, month, day] =
                                    due_date_str.split("-");
                                task.due_time.setFullYear(
                                    parseInt(year),
                                    parseInt(month) - 1,
                                    parseInt(day),
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
                                const [hours, minutes] =
                                    due_time_str.split(":");
                                task.due_time.setHours(
                                    parseInt(hours),
                                    parseInt(minutes),
                                );
                            }}
                        />
                    </div>
                </div>

                <!-- Label -->
                <div class="mb-4">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="font-bold text-gray-700">Label</label>
                    <select
                        class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                    <label class="font-bold text-gray-700">Checklist</label>
                    <div class="mt-1">
                        {#each task.checklist_items as item, i}
                            <div class="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    bind:checked={item.is_checked}
                                />
                                <span class="ml-2 text-gray-700"
                                    >{item.name}</span
                                >
                            </div>
                        {/each}
                    </div>
                    <div class="flex flex-col p-4 mt-4 rounded-lg">
                        <input
                            type="text"
                            class="flex-1 mr-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Add a new item"
                            bind:value={new_checklist_item.name}
                        />
                        <button
                            class="w-20 h-10 px-4 py-2 mx-auto my-2 font-bold text-black bg-blue-500 rounded hover:bg-blue-700"
                            on:click={() => {
                                if (new_checklist_item.name.trim() === "")
                                    return;
                                task.checklist_items.push(new_checklist_item);
                                task.checklist_items = task.checklist_items;
                                new_checklist_item = {
                                    name: "",
                                    is_checked: false,
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

    <!-- Draggable Divider -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="p-1 cursor-col-resize bg-accent-300 dark:bg-accent-500"
        on:mousedown={init_drag}
    >
        <!-- This is the draggable area -->
    </div>
    <!-- Right side: Chat Window-->
    <ChatWindow {task_id} />
</div>
