export enum Status {
  NotStarted = "Not Started",
  InProgress = "In Progress",
  Completed = "Completed",
}

export enum Label {
  Work = "Work",
  Personal = "Personal",
  Study = "Study",
}

export interface Task {
  id: number;
  name: string;
  description: string;
  start_time: Date;
  due_time: Date;
  label: Label;
  cover_photo_link: string;
  color: string; // of form #RRGGBB
  status: Status;
  checklist_items: { name: string; is_checked: boolean }[];
}

export interface BoardContentTaskForm {
  task_id: number;
  task_name: string;
  task_deadline: string;
  task_label_color: string;
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
