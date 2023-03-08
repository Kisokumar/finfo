import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

interface DelayedProps {
  startX?: number;
  startY?: number;
  startOpacity?: number;
  delay?: number;
  duration?: number;
  children?: React.ReactNode;
  props?: any;
  refresh?: boolean;
}

function speedUp(idx: number, delay: number, type: string) {
  if (type === "delay") {
    if (idx > 9) {
      return 1 / idx;
    } else {
      return delay;
    }
  } else if (type === "duration") {
    if (idx > 4) {
      return 1 / idx;
    } else {
      return delay;
    }
  }
}

/**
 * See props. (delay, animation, transformation ) returns animations of children with delay.
 *
 * @param {object} props - The component props.
 * @returns {JSX.Element}
 */
function DelayedTransition({
  startX = 0,
  startY = 0,
  startOpacity = 0,
  delay = 0,
  duration = 0,
  refresh = false,
  ...props
}: DelayedProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (refresh === true) {
      setKey((prevKey) => prevKey + 1);
    }
  }, [props.children, refresh]);
  return (
    <>
      {React.Children.map(
        props?.children,
        (child: React.ReactNode, idx: number) => {
          return (
            <motion.div
              key={`${idx}_${key}`}
              initial={{
                opacity: startOpacity,
                translateX: startX,
                translateY: startY,
              }}
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{
                duration: speedUp(idx, duration, "duration"),
                delay: (idx + 1) * (speedUp(idx, delay, "delay") ?? 0),
              }}
            >
              {child}
            </motion.div>
          );
        }
      )}
    </>
  );
}

export default DelayedTransition;
