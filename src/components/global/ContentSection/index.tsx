import styles from "./contentSection.module.css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ContentSection: React.FC<Props> = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};

export default ContentSection;
