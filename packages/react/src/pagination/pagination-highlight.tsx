import React, {useMemo, useEffect, useState} from "react";
import {mergeProps} from "@react-aria/utils";

import clsx from "../utils/clsx";
import {CSS} from "../theme/stitches.config";

import {StyledPaginationHighlight, PaginationHighlightVariantsProps} from "./pagination.styles";

interface Props {
  active: number;
  rounded?: boolean;
  noMargin?: boolean;
  shadow?: boolean;
  css?: CSS;
  as?: keyof JSX.IntrinsicElements;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type PaginationHighlightProps = Props & NativeAttrs & PaginationHighlightVariantsProps;

const preClass = "nextui-pagination-highlight";

const PaginationHighlight: React.FC<PaginationHighlightProps> = ({
  active,
  shadow,
  noMargin,
  rounded,
  css,
  ...props
}) => {
  const [selfActive, setSelfActive] = useState(active);
  const [moveClassName, setMoveClassName] = useState("");

  useEffect(() => {
    if (active !== selfActive) {
      setSelfActive(active);
      setMoveClassName(`${preClass}--moving`);
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
      aria-hidden={true}
      className={clsx(
        preClass,
        moveClassName,
        {
          [`${preClass}--rounded`]: rounded,
          [`${preClass}--active`]: active,
          [`${preClass}--no-margin`]: noMargin,
          [`${preClass}--shadow`]: shadow,
        },
        props.className,
      )}
      css={{
        left: "var(--nextui--paginationLeft)",
        ...(css as any),
      }}
      noMargin={noMargin}
      rounded={rounded}
      shadow={shadow}
      style={mergeProps({"--nextui--paginationLeft": `calc(${leftValue})`}, props?.style || {})}
      {...props}
    />
  );
};

PaginationHighlight.toString = () => ".nextui-pagination-highlight";

export default PaginationHighlight;
