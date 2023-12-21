import type { Task } from "../interfaces/task";
import { Status, Label } from "../interfaces/task";

export const dummy_tasks: Task[] = [
  {
    id: 1,
    name: "Task 1",
    description: "Description for Task 1",
    start_time: new Date("2023-12-30T08:00:00"),
    due_time: new Date("2023-12-31T16:30:00"),
    label: Label.Work,
    cover_photo_link: "https://source.unsplash.com/400x300/?work",
    color: "#FF0000", // Hexadecimal color string for red
    status: Status.InProgress,
    checklist_items: [
      { name: "Subtask A", is_checked: false },
      { name: "Subtask B", is_checked: true },
    ],
  },
  {
    id: 2,
    name: "Task 2",
    description: "Description for Task 2",
    start_time: new Date("2024-01-14T10:00:00"),
    due_time: new Date("2024-01-15T14:45:00"),
    label: Label.Personal,
    cover_photo_link: "https://source.unsplash.com/400x300/?personal",
    color: "#008000", // Hexadecimal color string for green
    status: Status.Completed,
    checklist_items: [
      { name: "Subtask X", is_checked: true },
      { name: "Subtask Y", is_checked: true },
    ],
  },
  {
    id: 3,
    name: "Task 3",
    description: "Description for Task 3",
    start_time: new Date("2024-02-27T09:30:00"),
    due_time: new Date("2024-02-28T18:00:00"),
    label: Label.Study,
    cover_photo_link: "https://source.unsplash.com/400x300/?study",
    color: "#0000FF", // Hexadecimal color string for blue
    status: Status.NotStarted,
    checklist_items: [
      { name: "Subtask P", is_checked: false },
      { name: "Subtask Q", is_checked: true },
    ],
  },
  {
    id: 4,
    name: "Task 4",
    description: "Description for Task 4",
    start_time: new Date("2024-03-14T11:45:00"),
    due_time: new Date("2024-03-15T17:15:00"),
    label: Label.Work,
    cover_photo_link: "https://source.unsplash.com/400x300/?work",
    color: "#FF8000", // Hexadecimal color string for orange
    status: Status.InProgress,
    checklist_items: [
      { name: "Subtask M", is_checked: false },
      { name: "Subtask N", is_checked: true },
    ],
  },
  {
    id: 5,
    name: "Task 5",
    description: "Description for Task 5",
    start_time: new Date("2024-04-29T14:00:00"),
    due_time: new Date("2024-04-30T23:59:00"),
    label: Label.Personal,
    cover_photo_link: "https://source.unsplash.com/400x300/?personal",
    color: "#800080", // Hexadecimal color string for purple
    status: Status.Completed,
    checklist_items: [
      { name: "Subtask Z", is_checked: true },
      { name: "Subtask W", is_checked: true },
    ],
  },
  {
    id: 6,
    name: "Task 6",
    description: "Description for Task 6",
    start_time: new Date("2024-05-14T08:30:00"),
    due_time: new Date("2024-05-15T16:00:00"),
    label: Label.Study,
    cover_photo_link: "https://source.unsplash.com/400x300/?study",
    color: "#00FFFF", // Hexadecimal color string for cyan
    status: Status.NotStarted,
    checklist_items: [
      { name: "Subtask R", is_checked: false },
      { name: "Subtask S", is_checked: true },
    ],
  },
  {
    id: 7,
    name: "Task 7",
    description: "Description for Task 7",
    start_time: new Date("2024-06-29T09:15:00"),
    due_time: new Date("2024-06-30T15:30:00"),
    label: Label.Work,
    cover_photo_link: "https://source.unsplash.com/400x300/?work",
    color: "#808000", // Hexadecimal color string for olive
    status: Status.InProgress,
    checklist_items: [
      { name: "Subtask C", is_checked: false },
      { name: "Subtask D", is_checked: true },
    ],
  },
  {
    id: 8,
    name: "Task 8",
    description: "Description for Task 8",
    start_time: new Date("2024-07-14T12:00:00"),
    due_time: new Date("2024-07-15T18:30:00"),
    label: Label.Personal,
    cover_photo_link: "https://source.unsplash.com/400x300/?personal",
    color: "#FF00FF", // Hexadecimal color string for magenta
    status: Status.Completed,
    checklist_items: [
      { name: "Subtask E", is_checked: true },
      { name: "Subtask F", is_checked: true },
    ],
  },
  {
    id: 9,
    name: "Task 9",
    description: "Description for Task 9",
    start_time: new Date("2024-08-30T13:45:00"),
    due_time: new Date("2024-08-31T22:00:00"),
    label: Label.Study,
    cover_photo_link: "https://source.unsplash.com/400x300/?study",
    color: "#808080", // Hexadecimal color string for gray
    status: Status.NotStarted,
    checklist_items: [
      { name: "Subtask G", is_checked: false },
      { name: "Subtask H", is_checked: true },
    ],
  },
  {
    id: 10,
    name: "Task 10",
    description: "Description for Task 10",
    start_time: new Date("2024-09-14T07:30:00"),
    due_time: new Date("2024-09-15T13:15:00"),
    label: Label.Work,
    cover_photo_link: "https://source.unsplash.com/400x300/?work",
    color: "#00FF00", // Hexadecimal color string for lime green
    status: Status.InProgress,
    checklist_items: [
      { name: "Subtask I", is_checked: false },
      { name: "Subtask J", is_checked: true },
    ],
  },
];
