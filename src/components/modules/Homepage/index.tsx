import styles from "./homepage.module.css";
import CircleBackground from "@/components/backgrounds/circles";

interface Props {
  heading: string;
  subheading?: string;
  bodyCopy?: string;
  backgroundColorOverride?: string;
}

const HomePage: React.FC<Props> = ({ ...Props }) => {
  return (
    <section className={styles.section}>
      <CircleBackground circleCountOverride={22} circleWidth="10vw" />
      <div className={styles.headingFinesse}>
        <h1>{Props.heading}</h1>
      </div>

      <h2>{Props.subheading}</h2>
    </section>
  );
};

export default HomePage;
