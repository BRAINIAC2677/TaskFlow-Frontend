import { error } from "@sveltejs/kit";
import { dummy_boards } from "$lib/dummy_data/boards";

export function load({ params }) {
  const { board_id } = params;
  const board = dummy_boards.find(
    (board) => board.board_id === parseInt(board_id)
  );
  if (board) {
    return { board };
  } else {
    return error(404, "Board not found");
  }
}
