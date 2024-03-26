import type {ReactNode} from "react";

import {domAnimation, LazyMotion, m} from "framer-motion";
import {useMeasure} from "@nextui-org/use-measure";

export interface ResizablePanelProps {
  children?: ReactNode;
}

export function ResizablePanel(originalProps: ResizablePanelProps) {
  const {children, ...props} = originalProps;

  let [ref, bounds] = useMeasure();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        animate={{
          width: bounds.width && bounds?.width > 0 ? bounds.width : "auto",
          height: bounds.height && bounds.height > 0 ? bounds.height : "auto",
        }}
        {...props}
      >
        <div ref={ref}>{children}</div>
      </m.div>
    </LazyMotion>
  );
}
