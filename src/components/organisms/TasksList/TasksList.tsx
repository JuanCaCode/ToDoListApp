import styles from "./TasksList.module.css";
import { useTaskFormStore } from "../TaskForm/TaskForm.store";
import { FiCheck, FiPlay, FiX } from "react-icons/fi";
import { FcApproval } from "react-icons/fc";
import { useTasksList } from "./useTasksList";
import { format } from "date-fns";

const TasksList = () => {
  const { handleChangeTask, getTimeLeft } = useTasksList();
  const tasks_list = useTaskFormStore((s) => s.tasks_list);

  return (
    <section className={styles.tasks_list}>
      <ul>
        {tasks_list?.map((task) => (
          <li key={task.name}>
            <div className={styles.info}>
              <span className={styles.name}>{task.name}</span>
              <div className={styles.date}>
                <span>Limite Date: </span>
                {format(task.date, "dd MMMM yyyy HH:mm")}
              </div>
              <span className={styles.date_left}>
                {task?.is_running && getTimeLeft(task)}
              </span>
            </div>
            <div className={styles.btn_container}>
              {/* Comenzar tarea */}
              {!task.is_running && (!task.is_denied || !task.is_completed) && (
                <i
                  className={styles.play_btn}
                  onClick={() => handleChangeTask("is_running", task)}
                >
                  <FiPlay />
                </i>
              )}
              {/* Aprobado */}
              {!task.is_denied && (
                <i
                  className={styles.complete_btn}
                  onClick={() => handleChangeTask("is_completed", task)}
                >
                  {task?.is_completed && <FcApproval />}
                  {!task?.is_completed && <FiCheck />}
                </i>
              )}
              {/* Rechazada */}
              {!task.is_completed && (
                <i
                  className={
                    task.is_denied
                      ? styles.denied_btn__active
                      : styles.denied_btn
                  }
                  onClick={() => handleChangeTask("is_denied", task)}
                >
                  <FiX />
                </i>
              )}
            </div>
          </li>
        ))}
        {!tasks_list?.length && <li>There is not task to do</li>}
      </ul>
    </section>
  );
};

export default TasksList;
