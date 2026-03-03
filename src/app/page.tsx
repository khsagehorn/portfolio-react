import Image from "next/image";
import styles from "./page.module.css";
import HomePage from "@/components/modules/Homepage";
import pageContent from "@/data/pageContent.json";

export default function Home() {
  const landingPageData = pageContent.siteContent.landingPage;
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HomePage
          heading={landingPageData.heading}
          subheading={landingPageData.subheading}
          bodyCopy={landingPageData.body}
        />
      </main>
    </div>
  );
}
