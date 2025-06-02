import { create } from "zustand";
import { format } from "date-fns";

export interface Task {
  name: string;
  date: string;
  is_completed: boolean;
  is_denied: boolean;
  is_running: boolean;
}

interface TaskFormState {
  task_text: Task;
  tasks_list: Task[];
  setInStore: (field: keyof TaskFormState, value: unknown) => void;
}

export const intialTask: Task = {
  name: "",
  date: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  is_completed: false,
  is_denied: false,
  is_running: false,
};

const states = {
  task_text: intialTask,
  tasks_list: JSON.parse(localStorage.getItem("tasks_list") || "[]"),
};

export const useTaskFormStore = create<TaskFormState>((set) => ({
  ...states,
  setInStore: (field, value) => set({ [field]: value }),
}));
