import React, {useMemo} from "react";

import withDefaults from "../utils/with-defaults";
import {DividerAlign, SimpleColors} from "../utils/prop-types";
import {getMargin} from "../utils/dimensions";
import {CSS} from "../theme/stitches.config";

import {StyledDivider, StyledDividerText, DividerVariantsProps} from "./divider.styles";

interface Props {
  x?: number;
  y?: number;
  height?: number;
  textColor?: SimpleColors;
  align?: DividerAlign;
  css?: CSS;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  x: 0,
  y: 0,
  height: 1,
  align: "center" as DividerAlign,
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type DividerProps = Props & DividerVariantsProps & NativeAttrs;

const Divider: React.FC<React.PropsWithChildren<DividerProps>> = ({
  height,
  x,
  y,
  align,
  children,
  textColor,
  css,
  ...props
}) => {
  const alignCss = useMemo(() => {
    if (!align || align === "center") return "";
    if (align === "left" || align === "start") {
      return {transform: "translateY(-50%)", left: "7%"};
    }

    return {
      transform: "translateY(-50%)",
      left: "auto",
      right: "7%",
    };
  }, [align]);

  const top = y ? getMargin(y / 2) : 0;
  const left = x ? getMargin(x / 2) : 0;

  return (
    <StyledDivider
      css={{
        margin: `${top} ${left}`,
        height: `calc(${height} * 1px)`,
        ...(css as any),
      }}
      role="separator"
      {...props}
    >
      {children && (
        <StyledDividerText className="nextui-divider-text" color={textColor} css={{...alignCss}}>
          {children}
        </StyledDividerText>
      )}
    </StyledDivider>
  );
};

Divider.toString = () => ".nextui-divider";

const MemoDivider = React.memo(Divider);

export default withDefaults(MemoDivider, defaultProps);
