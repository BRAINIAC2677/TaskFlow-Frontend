interface Task {
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

interface CheckListItem {
    item_id: number;
    item_name: string;
    is_completed: boolean;
}