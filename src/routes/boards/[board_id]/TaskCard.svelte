<!-- <script lang="ts">
  import type { BoardContentTaskForm } from "$lib/interfaces/task";
  import theme_store from "$lib/stores/theme_store";
  export let task: BoardContentTaskForm;

  // some pre-processing
  if (task.task_label_color == null) {
    task.task_label_color = "#FFFFFF";
  }

  function showable_date(date: string): string {
    let date_obj = new Date(date);
    return date_obj.toDateString();
  }

  function remaining_time(date: string): string {
    let date_obj = new Date(date);
    let now = new Date();
    let diff = date_obj.getTime() - now.getTime();
    if (diff < 0) {
      return "Overdue";
    }
    let diff_days = Math.floor(diff / (1000 * 3600 * 24));
    let diff_hours = Math.floor((diff / (1000 * 3600)) % 24);
    let diff_minutes = Math.floor((diff / 1000 / 60) % 60);
    let diff_seconds = Math.floor((diff / 1000) % 60);
    return (
      diff_days + " days, " + diff_hours + " hours "
      //  +
      // diff_minutes +
      // " minutes"
      // +
      // diff_seconds +
      // " seconds"
    );
  }
  let rem_time: string = remaining_time(task.task_deadline);

  let alert_color: string;
  $: {
    if (
      $theme_store.accentCurrentColor === "red" ||
      $theme_store.accentCurrentColor === "orange"
    )
      alert_color = "yellow";
    else alert_color = "red";
  }
</script>

<div class="p-2 rounded cursor-pointer bg-accent-50 text-accent-900">
  <a target="_self" href={"/tasks/" + task.task_id}>
    <div class="font-bold text-md">{task.task_name}</div>
    <div>Due Date: {showable_date(task.task_deadline)}</div>
    {#if rem_time == "Overdue"}
      <div class="font-bold" style="color: {alert_color}">
        {rem_time}
      </div>
    {:else}
      <div>Remaining Time: {rem_time}</div>
    {/if}
  </a>
</div> -->
<script lang="ts">
    import type { BoardContentTaskForm } from "$lib/interfaces/task";
    import theme_store from "$lib/stores/theme_store";
    export let task: BoardContentTaskForm;

    // some pre-processing
    if (task.task_label_color == null) {
        task.task_label_color = "#FFFFFF";
    }

    function showable_date(date: string): string {
        let date_obj = new Date(date);
        return date_obj.toDateString();
    }

    function remaining_time(date: string): string {
        let date_obj = new Date(date);
        let now = new Date();
        let diff = date_obj.getTime() - now.getTime();
        if (diff < 0) {
            return "Overdue";
        }
        let diff_days = Math.floor(diff / (1000 * 3600 * 24));
        let diff_hours = Math.floor((diff / (1000 * 3600)) % 24);
        let diff_minutes = Math.floor((diff / 1000 / 60) % 60);
        let diff_seconds = Math.floor((diff / 1000) % 60);
        return diff_days + " days, " + diff_hours + " hours";
    }
    let rem_time: string = remaining_time(task.task_deadline);

    let alert_color: string;
    $: {
        if (
            $theme_store.accentCurrentColor === "red" ||
            $theme_store.accentCurrentColor === "orange"
        )
            alert_color = "yellow";
        else alert_color = "red";
    }
</script>

<div class="p-2 rounded cursor-pointer bg-accent-50 text-accent-900">
    {#if task.task_cover_url}
        <div class="overflow-hidden rounded">
            <img
                src={task.task_cover_url}
                alt="Task Cover"
                class="w-full h-auto"
            />
        </div>
    {/if}
    <a target="_self" href={"/tasks/" + task.task_id}>
        <div class="font-bold text-md">{task.task_name}</div>
        <div>Due Date: {showable_date(task.task_deadline)}</div>
        {#if rem_time == "Overdue"}
            <div class="font-bold" style="color: {alert_color}">
                {rem_time}
            </div>
        {:else}
            <div>Remaining Time: {rem_time}</div>
        {/if}
    </a>
</div>
