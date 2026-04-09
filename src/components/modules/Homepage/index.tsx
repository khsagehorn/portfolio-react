interface Props {
  heading: string;
  subheading?: string;
  bodyCopy?: string;
  backgroundColorOverride?: string;
}

const HomePage: React.FC<Props> = ({ heading, subheading }) => {
  return (
    <section>
      <div>
        <h1>{heading}</h1>
      </div>

      <h2>{subheading}</h2>
    </section>
  );
};

export default HomePage;
