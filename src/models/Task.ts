import { v4 } from "uuid";

export interface TaskInterface {
  id?: string;
  title: string;
  completed: boolean;
}

export class Task {
  id?: string;
  title: string;
  completed: boolean;

  constructor(payload: TaskInterface) {
    this.id = payload.id ?? v4();
    this.title = payload.title;
    this.completed = payload.completed ?? false;
  }
}
