import { error } from "@sveltejs/kit"
import { boards } from "$lib/dummy_data/boards"


export function load({ params }) {
    const { board_id } = params;
    const board = boards.find(board => board.id === parseInt(board_id));
    if (board) {
        return { board };
    } else {
        return error(404, "Board not found")
    }
}