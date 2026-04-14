import Image from "next/image";
import styles from "./carousel.module.css";

export type CarouselCardType = {
  imgUrl: string;
  index: number;
};

const CarouselCard: React.FC<CarouselCardType> = ({ imgUrl }) => {
  return (
    <>
      <Image src={imgUrl} alt="" className={styles.cardImage} />
    </>
  );
};

export default CarouselCard;
