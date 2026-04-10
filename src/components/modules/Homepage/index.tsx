import Link from "next/link";
import { PageContextProvider, usePageContext } from "@/contexts/pageContext";

interface Props {
  heading: string;
  subheading?: string;
  bodyCopy?: string;
  backgroundColorOverride?: string;
}

const HomePage: React.FC<Props> = ({ heading, subheading }) => {
  const { hideContentPanel } = usePageContext();

  return (
    <section>
      <Link href={"/"} onClick={hideContentPanel}>
        <div>
          <h1>{heading}</h1>
        </div>

        <h2>{subheading}</h2>
      </Link>
    </section>
  );
};

export default HomePage;
