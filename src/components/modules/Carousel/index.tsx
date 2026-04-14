import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CarouselCard, { CarouselCardType } from "./carouselCard";
import styles from "./carousel.module.css";

interface CarouselProps {
  autoRotate?: boolean;
  autoRotateIterationLimit?: number;
  autoRotateSlidePause?: number;
  displayNav?: boolean;
  dragToSlide?: boolean;
  inMasthead?: boolean;
  items?: CarouselCardType[];
  preSelectedSlide?: number;
  onCarouselClick?: (e: MouseEvent) => void;
  onSlideSelected?: (index: number) => void;
  sizes?: string;
}

export default function Carousel({
  autoRotate = false,
  autoRotateIterationLimit = 3,
  autoRotateSlidePause = 3000,
  displayNav = true,
  dragToSlide = false,
  inMasthead = false,
  items = [],
  onCarouselClick,
  onSlideSelected,
  preSelectedSlide = 0,
  sizes,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(preSelectedSlide);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [motionDirection, setMotionDirection] = useState("");

  const currIteration = useRef<number>(0);
  const currSlide = useRef<number>(0);
  const hasRotated = useRef<boolean>(false);
  const prevPreSelected = useRef<number>(-1);
  const slideInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSlides = useMemo(() => items.length, [items]);
  const lastIndex = useMemo(
    () => (items.length ? items.length - 1 : 0),
    [items],
  );

  const endAnimateSlides = (reset?: true) => {
    slideInterval.current && clearInterval(slideInterval.current);
    slideInterval.current = null;
    setIsRotating(false);
    hasRotated.current = true;

    if (reset) {
      currIteration.current = 0;
      currSlide.current = 0;
      setCurrentSlide(0);
    }
  };

  const rotateSlides = useCallback(() => {
    if (
      currIteration.current === autoRotateIterationLimit &&
      currSlide.current === lastIndex
    ) {
      endAnimateSlides(true);
      return;
    }

    currSlide.current = (currSlide.current + 1) % totalSlides;
    setCurrentSlide(currSlide.current);
    currSlide.current === 0 && currIteration.current++;
  }, [autoRotateIterationLimit, lastIndex, totalSlides]);

  const startAnimateSlides = useCallback(() => {
    if (!isRotating && !slideInterval.current) {
      setMotionDirection("left");
      setIsRotating(true);
      currIteration.current = 1;
      slideInterval.current = setInterval(rotateSlides, autoRotateSlidePause);
    }
  }, [autoRotateSlidePause, isRotating, rotateSlides]);

  const onPrevButtonClick = useCallback(() => {
    endAnimateSlides();
    setMotionDirection("right");
    if (currSlide.current + lastIndex === lastIndex) {
      currSlide.current = lastIndex;
    } else {
      currSlide.current = currSlide.current - 1;
    }
    setCurrentSlide(currSlide.current);
  }, [lastIndex]);

  const onNextButtonClick = useCallback(() => {
    endAnimateSlides();
    setMotionDirection("left");
    if (lastIndex - currSlide.current === 0) {
      currSlide.current = 0;
    } else {
      currSlide.current = currSlide.current + 1;
    }
    setCurrentSlide(currSlide.current);
  }, [lastIndex]);

  // const dragHandlers = useMouseDrag({
  //   enabled: dragToSlide && totalSlides > 1,
  //   onCarouselClick: (ev: MouseEvent) => {
  //     if (typeof(onCarouselClick) === 'function') {
  //       endAnimateSlides();
  //       onCarouselClick(ev);
  //     }
  //   },
  //   onDragLeft: () => onNextButtonClick(),
  //   onDragRight: () => onPrevButtonClick(),
  // });

  // const swipeHandlers = useSwipe({
  //   enabled: totalSlides > 1,
  //   onSwipedLeft: () => onNextButtonClick(),
  //   onSwipedRight: () => onPrevButtonClick(),
  // });

  const setCardClass = useCallback(
    (index: number) => {
      const cardClasses = [];
      if (
        currentSlide === index - 1 ||
        (index === 0 && currentSlide === lastIndex)
      ) {
        cardClasses.push(styles.positionNext);
      } else if (
        currentSlide === index + 1 ||
        (index === lastIndex && currentSlide === 0)
      ) {
        cardClasses.push(styles.positionPrev);
      }

      if (totalSlides > 3) {
        if (
          currentSlide === index + 2 ||
          (currentSlide === 0 && index === lastIndex - 1) ||
          (currentSlide === 1 && index === lastIndex)
        ) {
          cardClasses.push(styles.positionPrev, styles.lowerLayer);
        } else if (
          currentSlide === index - 2 ||
          (currentSlide === lastIndex && index === 1) ||
          (currentSlide === lastIndex - 1 && index === 0)
        ) {
          cardClasses.push(styles.positionNext, styles.lowerLayer);
        }
      }
      return cardClasses.join(" ");
    },
    [currentSlide, lastIndex, totalSlides],
  );

  useEffect(() => {
    onSlideSelected?.(currentSlide);
  }, [currentSlide, onSlideSelected]);

  useEffect(() => {
    if (autoRotate && !hasRotated.current && totalSlides > 1) {
      setTimeout(() => {
        startAnimateSlides();
      }, 300);
    }

    return () => {
      if (hasRotated.current && slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [autoRotate, startAnimateSlides, totalSlides]);

  useEffect(() => {
    if (prevPreSelected.current === -1) {
      prevPreSelected.current = preSelectedSlide;
    }

    if (
      preSelectedSlide === currentSlide ||
      prevPreSelected.current === preSelectedSlide
    )
      return;
    // Allow a parent component to update the selected
    // slide via the preSelectedSlide prop
    if (
      (preSelectedSlide > currentSlide ||
        (preSelectedSlide === 0 && currentSlide === lastIndex)) &&
      !(preSelectedSlide === lastIndex && currentSlide === 0)
    ) {
      onNextButtonClick();
    } else {
      onPrevButtonClick();
    }

    prevPreSelected.current = preSelectedSlide;
  }, [
    currentSlide,
    lastIndex,
    onPrevButtonClick,
    onNextButtonClick,
    preSelectedSlide,
  ]);

  if (!items?.length) {
    return null;
  }

  return (
    <div
      data-pbsk-component-carousel
      className={`${styles.carousel} ${inMasthead ? styles.inMasthead : ""} ${displayNav ? styles.hasNav : ""} ${motionDirection === "left" ? styles.motionLeft : styles.motionRight}`}
    >
      <div
        className={styles.carouselWrapper}
        // {...dragHandlers}
        // {...swipeHandlers}
      >
        <ul className={`${styles.container}`}>
          {items.map((item, index) => (
            <CarouselCard key={index} index={index} imgUrl={item.imgUrl} />
          ))}
        </ul>
      </div>
    </div>
  );
}
