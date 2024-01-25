export interface User {
  id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  img_url: string;
  email: string;
  phone_number: string;
}

export interface UserMinimalForm {
  id: string;
  username: string;
  full_name: string;
  dp_url: string;
}

// for showing in scrollable member list in creation options
export interface UserMemberInfo {
  user_id: string;
  username: string;
  full_name: string;
  role: number;
  dp_url: string;
}
