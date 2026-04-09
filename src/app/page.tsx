import Image from "next/image";
import styles from "./page.module.css";
import { PageContextProvider } from "@/contexts/pageContext";
import HomePage from "@/components/modules/Homepage";
import pageContent from "@/data/pageContent.json";
import Star from "@/components/modules/Star";
import CircleBackground from "@/components/backgrounds/circles";
import ContentSection from "@/components/global/ContentSection";
import Navbar from "@/components/global/Navbar";
import "@/styles/globals.css";

export default function Home() {
  const landingPageData = pageContent.siteContent.landingPage;
  return (
    <PageContextProvider>
      <div className={styles.page}>
        <Star />
        <main className={styles.main}>
          <CircleBackground circleCountOverride={22} circleWidth="10vw" />
          <div className={styles.leftPanel}>
            <HomePage
              heading={landingPageData.heading}
              subheading={landingPageData.subheading}
              bodyCopy={landingPageData.body}
            />
            <Navbar linkItems={pageContent.siteContent.mainNav} />
          </div>
          <div className={styles.rightPanel}>
            <ContentSection>
              <></>
            </ContentSection>
          </div>
        </main>
      </div>
    </PageContextProvider>
  );
}
