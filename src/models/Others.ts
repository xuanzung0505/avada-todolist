import { TaskInterface } from "./Task";

export type EditFormError = {
  [key in keyof Omit<TaskInterface, "id">]?: string;
};
