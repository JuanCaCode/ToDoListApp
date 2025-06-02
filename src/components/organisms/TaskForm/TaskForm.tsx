import { type ChangeEvent } from "react";
import styles from "./TaskForm.module.css";
// externals
import { toast } from "react-toastify";
// components
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
//stores
import { type Task, useTaskFormStore } from "./TaskForm.store";
import type { PageType } from "../../../pages/Home/useHome";

const TaskForm = ({ setPage }: PageType) => {
  const tasks_list = useTaskFormStore((state) => state.tasks_list);
  const task_text = useTaskFormStore((state) => state.task_text);
  const setInStore = useTaskFormStore((state) => state.setInStore);

  // Estableciendo un nuevo valor para el formulario
  const handleInputOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof Task
  ) => {
    const value = e.target.value;

    const newTask: Task = {
      ...task_text,
      [key]: value,
    };

    setInStore("task_text", newTask);
  };

  const onAddingTask = (
    e: React.MouseEvent<HTMLFormElement>
  ): string | undefined => {
    e.preventDefault();

    const { name: n } = task_text;
    const duplicated = tasks_list.some(
      ({ name }) => name.toLocaleLowerCase() === n.toLocaleLowerCase()
    );

    if (!task_text.name) {
      toast.error("Debes ingresar un valor válido para la nueva tarea.");
      return;
    }
    if (task_text.name.length <= 10) {
      toast.error("El mínimo de caracteres es 11");
      return;
    }
    if (duplicated) {
      toast.error("La tarea ya existe");
      return;
    }

    const newList = [...tasks_list];
    newList.push(task_text);

    window.localStorage.setItem("tasks_list", JSON.stringify(newList));

    setInStore("tasks_list", newList);
    setInStore("task_text", "");
    setPage("list_view");
  };

  return (
    <form className={styles.form} onSubmit={onAddingTask}>
      <div>
        <label htmlFor="task_text">Task Detail:</label>
        <Input
          id="task_text"
          name="task_text"
          type="text"
          placeholder="Enter your new task detail"
          value={task_text.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputOnChange(e, "name")
          }
        />
      </div>
      <div>
        <label htmlFor="task_date">Limit Date:</label>
        <Input
          id="task_date"
          name="task_date"
          placeholder="Enter your limit date"
          value={task_text.date}
          type="datetime-local"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputOnChange(e, "date")
          }
        />
      </div>
      <Button type="submit" text="Add new task" />
    </form>
  );
};

export default TaskForm;
