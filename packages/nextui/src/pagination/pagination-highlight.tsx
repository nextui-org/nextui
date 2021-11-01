import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import clsx from '../utils/clsx';
import { getNormalShadowColor } from '../utils/color';

export interface PaginationHighlightProps {
  active: number;
  color: string;
  noMargin?: boolean;
  animated?: boolean;
  shadow?: boolean;
}

const PaginationHighlight: React.FC<PaginationHighlightProps> = ({
  active,
  color,
  shadow,
  animated,
  noMargin
}) => {
  const theme = useTheme();

  const shadowColor = useMemo(
    () => (shadow ? getNormalShadowColor(color, theme.palette) : 'none'),
    [color, shadow, theme.palette]
  );

  const leftValue = useMemo(
    () =>
      noMargin
        ? `var(--next-ui-pagination-size) * ${active}`
        : `var(--next-ui-pagination-size) * ${active} + ${active * 4 + 2}px`,
    [active, noMargin]
  );

  return (
    <div aria-hidden={true} className={clsx({ shadow })}>
      <style jsx>{`
        div {
          position: absolute;
          contain: strict;
          top: 0px;
          left: 0px;
          z-index: 10;
          background: ${color};
          border-radius: ${noMargin
            ? '33%'
            : 'var(--next-ui-pagination-item-radius)'};
          height: var(--next-ui-pagination-size);
          min-width: var(--next-ui-pagination-size);
          animation-name: move-pagination;
          animation-duration: ${animated ? '350ms' : 'none'};
          animation-direction: normal;
          animation-timing-function: ${animated ? 'ease' : 'none'};
          transition: ${animated ? 'left 350ms ease' : 'none'};
          box-shadow: ${shadowColor};
          left: calc(${leftValue});
        }
        @keyframes move-pagination {
          0% {
            transform: scale(1);
          }
          60% {
            transform: scale(var(--next-ui-pagination-scale-transform));
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default PaginationHighlight;
