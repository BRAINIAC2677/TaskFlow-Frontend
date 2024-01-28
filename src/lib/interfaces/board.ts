import type { BoardContentListForm } from "./list";

// export interface Board {
//   id: number;
//   title: string;
//   lists: List[];
//   progress: number;
//   status: string; // "Not Started", "In Progress", "Completed"
//   due_date: Date;
//   owner_name: string; // "Individual" or the name of the team
// }

interface OwnerInfo {
  user_id: bigint;
  username: string;
}

export interface BoardDashboardInfo {
  board_id: number;
  board_name: string;
  due_timestamp: string;
  description: string;
  role: number;
  owner_info: OwnerInfo;
  progress: number;
  status: string;
}

interface MemberInfo {
  user_id: string;
  role: number;
}

export interface BoardCreationInfo {
  board_name: string;
  board_description: string;
  board_deadline: string;
  board_members: Array<MemberInfo>;
}

export interface BoardContent {
  board_id: number;
  board_lists: Array<BoardContentListForm>;
  board_name: string;
}
