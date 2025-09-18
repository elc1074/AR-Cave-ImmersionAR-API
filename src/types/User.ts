export interface User {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserInput {
  name: string;
}

export interface UpdateUserInput {
  name?: string;
}
