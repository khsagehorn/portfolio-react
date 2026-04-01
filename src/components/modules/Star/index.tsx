"use client";

import { useEffect, useRef } from "react";
import type p5Type from "p5";
import styles from "./star.module.css";

interface Props {
  width?: number;
  height?: number;
  radius?: number;
  pullStrength?: number;
  pullRadius?: number;
}

const Star: React.FC<Props> = ({
  width = 600,
  height = 600,
  radius = 200,
  pullStrength = 30,
  pullRadius = 320,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5Type | null>(null);

  useEffect(() => {
    let p5Instance: p5Type;

    const initP5 = async () => {
      const p5 = (await import("p5")).default;

      const sketch = (p: p5Type) => {
        // Distribute 66 points evenly over a sphere using the golden angle method
        const nodeCount = 66;
        const basePositions: [number, number, number][] = [];

        for (let i = 0; i < nodeCount; i++) {
          const theta = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
          const phi = Math.PI * (1 + Math.sqrt(5)) * i;
          basePositions.push([
            Math.sin(theta) * Math.cos(phi),
            Math.sin(theta) * Math.sin(phi),
            Math.cos(theta),
          ]);
        }

        let rotX = 0;
        let rotY = 0;

        p.setup = () => {
          const canvas = p.createCanvas(width, height, p.WEBGL);
          canvas.parent(containerRef.current!);
          // Make the canvas background transparent
          const renderer = (
            p as unknown as { _renderer: { elt: HTMLCanvasElement } }
          )._renderer;
          renderer.elt.style.background = "transparent";
          p.smooth();
        };

        p.draw = () => {
          p.clear();

          // Slow auto-rotation
          rotY += 0.001;
          rotX += 0.001;

          p.rotateX(rotX);
          p.rotateY(rotY);
          p.frameRate(24);

          // Mouse in screen space relative to canvas center
          const mx = p.mouseX - width / 2;
          const my = p.mouseY - height / 2;

          // Project each base node position through current rotation, then apply mouse pull
          const nodes = basePositions.map(([nx, ny, nz]) => {
            const cosY = Math.cos(rotY);
            const sinY = Math.sin(rotY);
            const cosX = Math.cos(rotX);
            const sinX = Math.sin(rotX);

            // Rotate unit vector around Y axis
            const rx1 = nx * cosY - nz * sinY;
            const ry1 = ny;
            const rz1 = nx * sinY + nz * cosY;

            // Rotate around X axis
            const rx2 = rx1;
            const ry2 = ry1 * cosX - rz1 * sinX;
            const rz2 = ry1 * sinX + rz1 * cosX;

            const wx = rx2 * radius;
            const wy = ry2 * radius;
            const wz = rz2 * radius;

            // Pull toward cursor when within pullRadius
            const dx = mx - wx;
            const dy = my - wy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let offsetX = 0;
            let offsetY = 0;
            if (dist < pullRadius && dist > 0) {
              const factor = (1 - dist / pullRadius) * pullStrength;
              offsetX = (dx / dist) * factor;
              offsetY = (dy / dist) * factor;
            }

            return { x: wx + offsetX, y: wy + offsetY, z: wz };
          });

          // Lines from each outer node to the center
          p.stroke(199, 172, 99);
          p.strokeWeight(1);
          for (const node of nodes) {
            p.line(0, 0, 0, node.x, node.y, node.z);
          }

          // Center node
          p.noStroke();
          p.fill(199, 172, 99);
          p.push();
          p.sphere(5);
          p.pop();

          // Outer nodes
          for (const node of nodes) {
            p.push();
            p.translate(node.x, node.y, node.z);
            p.sphere(2);
            p.pop();
          }
        };
      };

      p5Instance = new p5(sketch);
      p5Ref.current = p5Instance;
    };

    initP5();

    return () => {
      p5Instance?.remove();
    };
  }, [width, height, radius, pullStrength, pullRadius]);

  return <div className={styles.starCanvas} ref={containerRef} />;
};

export default Star;
