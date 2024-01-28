import { redirect } from "@sveltejs/kit";
import { is_logged_in } from "$lib/stores/user_store";
import { error } from "@sveltejs/kit";
import { dummy_tasks } from "$lib/dummy_data/tasks.js";

export const ssr = false;

let logged_in: boolean = false;
is_logged_in.subscribe((value) => (logged_in = value));

export function load({ params }) {
  if (!logged_in) throw redirect(301, "/login");
  const { task_id } = params;
  const task = dummy_tasks.find((task) => task.id === parseInt(task_id));
  if (task) {
    return { task };
  } else {
    return error(404, "Task not found");
  }
}
