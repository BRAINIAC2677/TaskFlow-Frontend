import type { Task } from "../interfaces/task";
import { Status, Label } from "../interfaces/task";

export const dummy_tasks: Task[] = [
    {
        name: "Task 1",
        description: "Description for Task 1",
        due_date: new Date("2023-12-31"),
        label: Label.Work,
        cover_photo_link: "https://example.com/cover1.jpg",
        color: { r: 255, g: 0, b: 0 },
        status: Status.InProgress,
        checklist_items: [
            { name: "Subtask A", is_checked: false },
            { name: "Subtask B", is_checked: true }
        ]
    },
    {
        name: "Task 2",
        description: "Description for Task 2",
        due_date: new Date("2024-01-15"),
        label: Label.Personal,
        cover_photo_link: "https://example.com/cover2.jpg",
        color: { r: 0, g: 128, b: 0 },
        status: Status.Completed,
        checklist_items: [
            { name: "Subtask X", is_checked: true },
            { name: "Subtask Y", is_checked: true }
        ]
    },
    {
        name: "Task 3",
        description: "Description for Task 3",
        due_date: new Date("2024-02-28"),
        label: Label.Study,
        cover_photo_link: "https://example.com/cover3.jpg",
        color: { r: 0, g: 0, b: 255 },
        status: Status.NotStarted,
        checklist_items: [
            { name: "Subtask P", is_checked: false },
            { name: "Subtask Q", is_checked: true }
        ]
    },
    {
        name: "Task 4",
        description: "Description for Task 4",
        due_date: new Date("2024-03-15"),
        label: Label.Work,
        cover_photo_link: "https://example.com/cover4.jpg",
        color: { r: 255, g: 128, b: 0 },
        status: Status.InProgress,
        checklist_items: [
            { name: "Subtask M", is_checked: false },
            { name: "Subtask N", is_checked: true }
        ]
    },
    {
        name: "Task 5",
        description: "Description for Task 5",
        due_date: new Date("2024-04-30"),
        label: Label.Personal,
        cover_photo_link: "https://example.com/cover5.jpg",
        color: { r: 128, g: 0, b: 128 },
        status: Status.Completed,
        checklist_items: [
            { name: "Subtask Z", is_checked: true },
            { name: "Subtask W", is_checked: true }
        ]
    },
    {
        name: "Task 6",
        description: "Description for Task 6",
        due_date: new Date("2024-05-15"),
        label: Label.Study,
        cover_photo_link: "https://example.com/cover6.jpg",
        color: { r: 0, g: 255, b: 255 },
        status: Status.NotStarted,
        checklist_items: [
            { name: "Subtask R", is_checked: false },
            { name: "Subtask S", is_checked: true }
        ]
    },
    {
        name: "Task 7",
        description: "Description for Task 7",
        due_date: new Date("2024-06-30"),
        label: Label.Work,
        cover_photo_link: "https://example.com/cover7.jpg",
        color: { r: 128, g: 128, b: 0 },
        status: Status.InProgress,
        checklist_items: [
            { name: "Subtask C", is_checked: false },
            { name: "Subtask D", is_checked: true }
        ]
    },
    {
        name: "Task 8",
        description: "Description for Task 8",
        due_date: new Date("2024-07-15"),
        label: Label.Personal,
        cover_photo_link: "https://example.com/cover8.jpg",
        color: { r: 255, g: 0, b: 255 },
        status: Status.Completed,
        checklist_items: [
            { name: "Subtask E", is_checked: true },
            { name: "Subtask F", is_checked: true }
        ]
    },
    {
        name: "Task 9",
        description: "Description for Task 9",
        due_date: new Date("2024-08-31"),
        label: Label.Study,
        cover_photo_link: "https://example.com/cover9.jpg",
        color: { r: 128, g: 128, b: 128 },
        status: Status.NotStarted,
        checklist_items: [
            { name: "Subtask G", is_checked: false },
            { name: "Subtask H", is_checked: true }
        ]
    },
    {
        name: "Task 10",
        description: "Description for Task 10",
        due_date: new Date("2024-09-15"),
        label: Label.Work,
        cover_photo_link: "https://example.com/cover10.jpg",
        color: { r: 0, g: 255, b: 0 },
        status: Status.InProgress,
        checklist_items: [
            { name: "Subtask I", is_checked: false },
            { name: "Subtask J", is_checked: true }
        ]
    }
];
