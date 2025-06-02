import type { Task } from "../TaskForm/TaskForm.store";
import { useTaskFormStore } from "../TaskForm/TaskForm.store";
import { intervalToDuration, isBefore } from "date-fns";

export const useTasksList = () => {
  const tasks_list = useTaskFormStore((s) => s.tasks_list);
  const setInStore = useTaskFormStore((s) => s.setInStore);

  const handleChangeTask = (
    key: "is_completed" | "is_denied" | "is_running",
    task: Task
  ) => {
    const newList = tasks_list?.map((t) => {
      if (t?.name === task?.name) {
        t[key] = true;
      }
      return t;
    });
    setInStore("tasks_list", newList);
    window.localStorage.setItem("tasks_list", JSON.stringify(newList));
  };

  const getTimeLeft = (task: Task): string => {
    const actualDate = new Date();
    const limitDate = new Date(task.date);

    const interval = intervalToDuration({
      start: actualDate < limitDate ? actualDate : limitDate,
      end: actualDate < limitDate ? limitDate : actualDate,
    });

    const { days, hours, minutes, seconds } = interval;

    const parts = [];
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);
    if (seconds || parts.length === 0) parts.push(`${seconds}s`);

    const result = parts.join(" ");

    if (isBefore(limitDate, actualDate)) {
      return `${result} expired`;
    }

    return result ? `${result} left` : "";
  };

  return {
    handleChangeTask,
    getTimeLeft,
  };
};
