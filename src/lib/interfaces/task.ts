export enum Status {
    NotStarted = "Not Started",
    InProgress = "In Progress",
    Completed = "Completed"
}

export enum Label {
    Work = "Work",
    Personal = "Personal",
    Study = "Study"
}

export interface Task {
    name: string;
    description: string;
    due_date: Date;
    label: Label;
    cover_photo_link: string;
    color: {
        r: number;
        g: number;
        b: number;
    };
    status: Status;
    checklist_items: { name: string; is_checked: boolean }[];
}