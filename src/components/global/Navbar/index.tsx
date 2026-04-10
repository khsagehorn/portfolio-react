import { useState } from "react";
import { usePageContext } from "@/contexts/pageContext";
import styles from "./navbar.module.css";

type LinkItem = {
  title: string;
  link: string;
};

interface Props {
  linkItems: LinkItem[];
}

const Navbar: React.FC<Props> = ({ linkItems }) => {
  const { contentPanelActive, showContentPanel } = usePageContext();
  const [activeElement, setActiveElement] = useState<number | null>(null);

  // const handleSelect = (key) => {
  //   showContentPanel();
  //   setActiveElement(key)
  // }

  return (
    <section
      className={`${styles.linkListSection} ${contentPanelActive ? styles.active : ""}`}
    >
      <ul className={styles.linkList}>
        {linkItems.map((item, id) => (
          <li
            key={id}
            className={`${styles.linkItem} ${activeElement === id ? styles.activeItem : ""}`}
          >
            <a
              href={item.link}
              onClick={() => {
                setActiveElement(id);
                showContentPanel();
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Navbar;
