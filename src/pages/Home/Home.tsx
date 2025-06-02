import { useState } from "react";
import styles from "./Home.module.css";
import { TaskLayout } from "../../layouts/TaskLayout";
import Button from "../../components/atoms/Button/Button";
import TaskForm from "../../components/organisms/TaskForm/TaskForm";
import TasksList from "../../components/organisms/TasksList/TasksList";

import { useHome } from "./useHome";

const Home = () => {
  const { handlePage, getButtonText } = useHome();
  const [page, setPage] = useState<"list_view" | "form_view">("list_view");

  return (
    <main className={styles.main}>
      <TaskLayout>
        <section className={styles.title_stack}>
          <h1>To Do List</h1>
        </section>
        {page === "form_view" && <TaskForm setPage={setPage} />}
        {page === "list_view" && <TasksList />}
        <Button
          border={page === "form_view"}
          style={{ width: "100%" }}
          text={getButtonText(page)}
          onClick={() => handlePage({ page, setPage })}
        />
      </TaskLayout>
    </main>
  );
};

export default Home;
