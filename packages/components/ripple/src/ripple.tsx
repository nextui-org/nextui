import {FC, Suspense, Fragment} from "react";
import {AnimatePresence, HTMLMotionProps, motion} from "framer-motion";
import {HTMLNextUIProps} from "@nextui-org/system";

import {RippleType} from "./use-ripple";

export interface RippleProps extends HTMLNextUIProps<"span"> {
  ripples: RippleType[];
  color?: string;
  suspense?: boolean;
  motionProps?: HTMLMotionProps<"span">;
  style?: React.CSSProperties;
}

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const Ripple: FC<RippleProps> = ({
  ripples = [],
  motionProps,
  suspense = false,
  color = "currentColor",
  style,
}) => {
  return (
    <>
      {ripples.map((ripple) => {
        const duration = clamp(0.01 * ripple.size, 0.2, ripple.size > 100 ? 0.75 : 0.5);

        const Wrapper = suspense ? Suspense : Fragment;

        return (
          <Wrapper key={ripple.key}>
            <AnimatePresence mode="popLayout">
              <motion.span
                animate={{transform: "scale(2)", opacity: 0}}
                className="nextui-ripple"
                exit={{opacity: 0}}
                initial={{transform: "scale(0)", opacity: 0.35}}
                style={{
                  position: "absolute",
                  backgroundColor: color,
                  borderRadius: "100%",
                  transformOrigin: "center",
                  pointerEvents: "none",
                  zIndex: 10,
                  top: ripple.y,
                  left: ripple.x,
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  ...style,
                }}
                transition={{duration}}
                {...motionProps}
              />
            </AnimatePresence>
          </Wrapper>
        );
      })}
    </>
  );
};

Ripple.displayName = "NextUI.Ripple";

export default Ripple;
