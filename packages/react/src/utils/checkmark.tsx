import React, { HTMLAttributes } from 'react';
import { styled, keyframes } from '../theme/stitches.config';
import type { CSS } from '../theme/stitches.config';
import clsx from './clsx';
import { __DEV__ } from './assertion';

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
  '100%': {
    strokeDashoffset: 0
  }
});

const StyledCheckmark = styled('svg', {
  d: 'block',
  path: {
    transformOrigin: '50% 50%',
    strokeDasharray: 48,
    strokeDashoffset: 48,
    animation: `${stroke} .25s cubic-bezier(0.650, 0.000, 0.450, 1.000) forwards`
  }
});

const Checkmark: React.FC<CheckmarkProps> = (props) => {
  const {
    width = 24,
    height = 24,
    size,
    strokeWidth = 3,
    fill = 'currentColor',
    css,
    className
  } = props;
  return (
    <StyledCheckmark
      role="img"
      width={size || width}
      height={size || height}
      className={clsx('nextui-checkmark', className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      css={{ ...(css as any) }}
    >
      <path
        stroke={fill}
        strokeWidth={strokeWidth}
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </StyledCheckmark>
  );
};

if (__DEV__) {
  Checkmark.displayName = 'NextUI.Checkmark';
}

Checkmark.toString = () => '.nextui-checkmark';

export default Checkmark;
