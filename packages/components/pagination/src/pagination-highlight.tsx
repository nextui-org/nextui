import {useState, useEffect, useMemo} from "react";
import {mergeProps} from "@react-aria/utils";
import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";

import {StyledPaginationHighlight} from "./pagination.styles";

export interface PaginationHighlightProps extends HTMLNextUIProps<"div"> {
  active: number;
  rounded?: boolean;
  animated?: boolean;
  noMargin?: boolean;
  shadow?: boolean;
}

const PaginationHighlight = forwardRef<PaginationHighlightProps, "div">((props, ref) => {
  const {className, css, active, shadow, noMargin, rounded, ...otherProps} = props;
  const [selfActive, setSelfActive] = useState(active);
  const [moveClassName, setMoveClassName] = useState("");

  const domRef = useDOMRef(ref);

  useEffect(() => {
    if (active !== selfActive) {
      setSelfActive(active);
      setMoveClassName(`nextui-pagination-highlight--moving`);
      const timer = setTimeout(() => {
        setMoveClassName("");
        clearTimeout(timer);
      }, 350);
    }
  }, [active]);

  const leftValue = useMemo(
    () =>
      noMargin
        ? `var(--nextui--paginationSize) * ${selfActive}`
        : `var(--nextui--paginationSize) * ${selfActive} + ${selfActive * 4 + 2}px`,
    [selfActive, noMargin],
  );

  return (
    <StyledPaginationHighlight
      ref={domRef}
      aria-hidden={true}
      className={clsx("nextui-pagination-highlight", moveClassName, className)}
      css={{
        left: "var(--nextui--paginationLeft)",
        ...css,
      }}
      noMargin={noMargin}
      rounded={rounded}
      shadow={shadow}
      style={mergeProps({"--nextui--paginationLeft": `calc(${leftValue})`}, props?.style || {})}
      {...otherProps}
    />
  );
});

PaginationHighlight.displayName = "NextUI.PaginationHighlight";

export default PaginationHighlight;
