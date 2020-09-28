import React from "react";
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";

export const CircleIndicator = ({ style }: { style?: React.CSSProperties }) => {
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 });

  return (
    <svg className="progress-icon" viewBox="0 0 60 60">
      <motion.path
        fill="none"
        strokeWidth="5"
        stroke="blue"
        strokeDasharray="0 1"
        d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
        style={{
          pathLength,
          rotate: 90,
          translateX: 5,
          translateY: 5,
          scaleX: -1, // Reverse direction of line animation
        }}
      />
    </svg>
  );
};
