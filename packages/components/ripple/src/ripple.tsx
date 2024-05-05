import {FC} from "react";
import {AnimatePresence, HTMLMotionProps, m, LazyMotion, domAnimation} from "framer-motion";
import {HTMLNextUIProps} from "@nextui-org/system";
import {clamp} from "@nextui-org/shared-utils";

import {RippleType} from "./use-ripple";

export interface RippleProps extends HTMLNextUIProps<"span"> {
  ripples: RippleType[];
  color?: string;
  motionProps?: HTMLMotionProps<"span">;
  style?: React.CSSProperties;
  onClear: (key: React.Key) => void;
}

const Ripple: FC<RippleProps> = (props) => {
  const {ripples = [], motionProps, color = "currentColor", style, onClear} = props;

  return (
    <>
      {ripples.map((ripple) => {
        const duration = clamp(0.01 * ripple.size, 0.2, ripple.size > 100 ? 0.75 : 0.5);

        return (
          <AnimatePresence key={ripple.key} mode="popLayout">
            <>
              <LazyMotion features={domAnimation}>
                <m.span
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
                    overflow: "hidden",
                    inset: 0,
                    zIndex: 0,
                    top: ripple.y,
                    left: ripple.x,
                    width: `${ripple.size}px`,
                    height: `${ripple.size}px`,
                    ...style,
                  }}
                  transition={{duration}}
                  onAnimationComplete={() => {
                    onClear(ripple.key);
                  }}
                  {...motionProps}
                />
              </LazyMotion>
            </>
          </AnimatePresence>
        );
      })}
    </>
  );
};

Ripple.displayName = "NextUI.Ripple";

export default Ripple;
