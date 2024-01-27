import type { BoardContentTaskForm, Task } from "./task";

export interface List {
  id: number;
  title: string;
  tasks: Task[];
}

export interface BoardContentListForm {
  list_id: number;
  list_name: string;
  list_tasks: Array<BoardContentTaskForm>;
}
