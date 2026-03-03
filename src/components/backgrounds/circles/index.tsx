"use client";

import styles from "./circles.module.css";
import { useRef, useEffect } from "react";

interface Props {
  circleCountOverride?: number;
  circleWidth?: string;
}

const CircleBackground: React.FC<Props> = ({ ...Props }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerCircles = Props.circleCountOverride || 12;
  const circleWidth = Props.circleWidth || "3em";

  const Circles = (circleCount: number) => {
    const circleArr = [];
    for (let i = 0; i < circleCount; i++) {
      console.log(circleCount, "circles");
      const dynamicStyle = {
        "--i": `${i}`,
      };

      circleArr.push(
        <div key={i} style={dynamicStyle} className={styles.innerCircle}></div>,
      );
    }

    return circleArr;
  };

  useEffect(() => {
    const container = containerRef.current;
    container?.style.setProperty("--circleWidth", `${circleWidth}`);
    container?.style.setProperty("--innerCircles", `${innerCircles}`);
  }, [circleWidth, innerCircles]);

  return (
    <div className={styles.container} ref={containerRef}>
      {Circles(innerCircles)}
    </div>
  );
};

export default CircleBackground;
