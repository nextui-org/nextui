import * as React from 'react';
import { useTheme, NextUIThemes } from '@nextui-org/react';

const DotsContainer: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const theme = useTheme() as NextUIThemes;
  return (
    <div className="wrapper">
      {children}
      <style jsx>{`
        .wrapper {
          --dot-size: 1px;
          --dot-space: 22px;
          min-width: 100vw;
          min-height: 100vh;
          background: linear-gradient(
                90deg,
                ${theme.palette.background} 21px,
                transparent 1%
              )
              50%,
            linear-gradient(${theme.palette.background} 21px, transparent 1%)
              50%,
            #444;
          background-size: var(--dot-space) var(--dot-space);
          overflow-y: clip;
        }
      `}</style>
    </div>
  );
};

export default DotsContainer;
