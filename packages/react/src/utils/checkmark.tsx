import type {CSS} from "../theme/stitches.config";

import React, {HTMLAttributes} from "react";

import {styled, keyframes} from "../theme/stitches.config";

import clsx from "./clsx";
import {__DEV__} from "./assertion";

interface Props {
  css?: CSS;
  width?: number;
  height?: number;
  size?: number;
  strokeWidth?: number;
  fill?: string;
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<HTMLElement>, keyof Props>;

export type CheckmarkProps = Props & NativeAttrs;

export const stroke = keyframes({
  "100%": {
    strokeDashoffset: 0,
  },
});

const StyledCheckmark = styled("svg", {
  d: "block",
  path: {
    transformOrigin: "50% 50%",
    strokeDasharray: 48,
    strokeDashoffset: 48,
    animation: `${stroke} .25s cubic-bezier(0.650, 0.000, 0.450, 1.000) forwards`,
  },
});

const Checkmark: React.FC<CheckmarkProps> = (props) => {
  const {
    width = 24,
    height = 24,
    size,
    strokeWidth = 3,
    fill = "currentColor",
    css,
    className,
  } = props;

  return (
    <StyledCheckmark
      className={clsx("nextui-checkmark", className)}
      css={{...(css as any)}}
      height={size || height}
      role="img"
      viewBox="0 0 52 52"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none" stroke={fill} strokeWidth={strokeWidth} />
    </StyledCheckmark>
  );
};

if (__DEV__) {
  Checkmark.displayName = "NextUI.Checkmark";
}

Checkmark.toString = () => ".nextui-checkmark";

export default Checkmark;
