import type {Ref} from "react";

import {forwardRef} from "react";
import {domAnimation, LazyMotion, m} from "framer-motion";
import {useMeasure} from "@heroui/use-measure";
import {HTMLHeroUIProps} from "@heroui/system";

/**
 * Props for the ResizablePanel component.
 */
export interface ResizablePanelProps extends HTMLHeroUIProps<"div"> {}

const ResizablePanel = forwardRef(
  (originalProps: ResizablePanelProps, ref: Ref<HTMLDivElement>) => {
    const {children, ...props} = originalProps;

    let [measureRef, bounds] = useMeasure();

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          ref={ref}
          animate={{
            width: bounds.width && bounds?.width > 0 ? bounds.width : "auto",
            height: bounds.height && bounds.height > 0 ? bounds.height : "auto",
          }}
        >
          <div ref={measureRef} {...props}>
            {children}
          </div>
        </m.div>
      </LazyMotion>
    );
  },
);

ResizablePanel.displayName = "HeroUI - ResizablePanel";

export {ResizablePanel};
