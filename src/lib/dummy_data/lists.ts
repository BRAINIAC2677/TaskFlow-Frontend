import type { List } from "../interfaces/list";
import { tasks } from "./tasks";

export const lists: List[] = [
    {
        id: 1,
        title: "List 1",
        tasks: [tasks[0], tasks[1], tasks[2]]
    },
    {
        id: 2,
        title: "List 2",
        tasks: [tasks[3], tasks[4], tasks[5]]
    },
    {
        id: 3,
        title: "List 3",
        tasks: [tasks[6], tasks[7], tasks[8]]
    },
    {
        id: 4,
        title: "List 4",
        tasks: [tasks[9]]
    }
]