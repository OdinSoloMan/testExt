import { Task } from "./task";

export interface Board {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
}
