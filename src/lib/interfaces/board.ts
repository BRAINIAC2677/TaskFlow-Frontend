import type { List } from "./list";

export interface Board {
    id: number;
    title: string;
    lists: List[];
    progress: number;
    status: string; // "Not Started", "In Progress", "Completed"
    due_date: Date;
    owner_name: string; // "Individual" or the name of the team
}