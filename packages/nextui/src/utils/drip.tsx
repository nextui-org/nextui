import React, { useEffect, useRef } from 'react';
import { styled, keyframes, VariantProps } from '../theme/stitches.config';
import withDefaults from '../utils/with-defaults';
import clsx from '../utils/clsx';

interface Props {
  visible: boolean;
  x: number;
  y: number;
  onCompleted: () => void;
  color?: string;
  className?: string;
}

const defaultProps = {
  visible: false,
  x: 0,
  y: 0,
  className: ''
};

const expand = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0.25)'
  },
  '30%': {
    opacity: 1
  },
  '80%': {
    opacity: 0.5
  },
  '100%': {
    transform: 'scale(28)',
    opacity: 0
  }
});

export const StyledDrip = styled('div', {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  '& svg': {
    position: 'absolute',
    animation: `350ms linear ${expand}`,
    animationFillMode: 'forwards',
    width: '$md',
    height: '$md'
  }
});

type DripVariants = VariantProps<typeof StyledDrip>;

export type DripProps = Props & typeof defaultProps & DripVariants;

const Drip: React.FC<DripProps> = ({
  visible,
  x,
  y,
  color,
  onCompleted,
  className,
  ...props
}) => {
  const dripRef = useRef<HTMLDivElement>(null);
  const top = Number.isNaN(+y) ? 0 : y - 10;
  const left = Number.isNaN(+x) ? 0 : x - 10;

  useEffect(() => {
    if (!dripRef.current) return;
    dripRef.current.addEventListener('animationend', onCompleted);
    return () => {
      if (!dripRef.current) return;
      dripRef.current.removeEventListener('animationend', onCompleted);
    };
  });

  if (!visible) return null;

  return (
    <StyledDrip
      ref={dripRef}
      className={clsx('nextui-drip', className)}
      {...props}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" style={{ top, left }}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g className="nextui-drip-filler" fill={color}>
            <rect width="100%" height="100%" rx="10" />
          </g>
        </g>
      </svg>
    </StyledDrip>
  );
};

const MemoDrip = React.memo<DripProps>(Drip);

export default withDefaults(MemoDrip, defaultProps);
