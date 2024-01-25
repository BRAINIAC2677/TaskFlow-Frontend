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

export interface BoardDashboardInfo {
  board_id: number;
  board_name: string;
  due_timestamp: string;
  description: string;
  role: number;
  owner_info: Array<{
    user_id: bigint;
    username: string;
  }>;
}

export interface BoardCreationInfo {
  board_name: string;
  board_description: string;
  board_deadline: string;
  board_members: Array<{
    user_id: string;
    role: number;
  }>;
}
