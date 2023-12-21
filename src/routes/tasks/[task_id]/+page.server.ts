import { error } from "@sveltejs/kit";
import { dummy_tasks } from "$lib/dummy_data/tasks.js";

export function load({ params }) {
  const { task_id } = params;
  const task = dummy_tasks.find((task) => task.id === parseInt(task_id));
  if (task) {
    return { task };
  } else {
    return error(404, "Task not found");
  }
}
