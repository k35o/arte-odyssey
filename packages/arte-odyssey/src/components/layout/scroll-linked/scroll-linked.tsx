'use client';

import { motion, MotionConfig, useScroll, useSpring } from 'motion/react';
import type { FC, RefObject } from 'react';

export const ScrollLinked: FC<{
  container?: RefObject<HTMLElement | null>;
}> = ({ container }) => {
  const { scrollYProgress } = useScroll({ container });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.01,
  });

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="bg-primary-bg fixed top-0 right-0 left-0 h-2 origin-left"
        style={{ scaleX }}
      />
    </MotionConfig>
  );
};
