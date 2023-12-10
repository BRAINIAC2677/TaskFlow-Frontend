import type { Board } from "../interfaces/board";
import { lists } from "./lists";

export const boards: Board[] = [
    {
        id: 1,
        title: "Board 1",
        lists: [lists[0], lists[1], lists[2]]
    },
    {
        id: 2,
        title: "Board 2",
        lists: [lists[3]]
    }
]


