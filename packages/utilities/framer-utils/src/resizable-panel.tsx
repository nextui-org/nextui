import type {ReactNode, Ref} from "react";

import {forwardRef} from "react";
import {domAnimation, LazyMotion, m} from "framer-motion";
import {useMeasure} from "@nextui-org/use-measure";

/**
 * Props for the ResizablePanel component.
 */
export interface ResizablePanelProps {
  children?: ReactNode;
}

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
          {...props}
        >
          <div ref={measureRef}>{children}</div>
        </m.div>
      </LazyMotion>
    );
  },
);

ResizablePanel.displayName = "NextUI - ResizablePanel";

export {ResizablePanel};
