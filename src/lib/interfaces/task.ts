export interface Task {
  id: number;
  name: string;
  description: string;
  start_time: Date;
  due_time: Date;
  labels: Array<String>;
  label_color: string; // of form #RRGGBB
  cover_url: string;
  checklist_items: { item_id: number, item_name: string; is_completed: boolean }[];
}

export interface BoardContentTaskForm {
  task_id: number;
  task_name: string;
  task_deadline: string;
  task_label_color: string;
  task_cover_url: string;
}

export interface CalendarViewTask {
  id: number;
  // allDay: boolean;
  start: string;
  end: string;
  title: string;
  editable: boolean;
  // startEditable: boolean;
  // durationEditable: boolean;
  backgroundColor: string;
  // textColor: string;
}
