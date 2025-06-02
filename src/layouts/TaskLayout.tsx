import styles from "./TaskLayout.module.css";

import type { ReactNode } from "react";

interface TaskLayoutProps {
  children: ReactNode;
}

export const TaskLayout = ({ children }: TaskLayoutProps) => {
  return <section className={styles.task_container}>{children}</section>;
};
