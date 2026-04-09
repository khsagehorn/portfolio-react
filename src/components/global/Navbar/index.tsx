import styles from "./navbar.module.css";

type LinkItem = {
  title: string;
  link: string;
};

interface Props {
  linkItems: LinkItem[];
}

const Navbar: React.FC<Props> = ({ linkItems }) => {
  return (
    <section className={styles.linkListSection}>
      <ul className={styles.linkList}>
        {linkItems.map((item) => (
          <li key={item.link} className={styles.linkItem}>
            <a href={item.link}>{item.title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Navbar;
