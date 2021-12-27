import React, { useMemo } from 'react';
import { NextUITheme, useTheme } from '@nextui-org/react';
import withDefaults from '@utils/with-defaults';

interface Props {
  plain?: number | boolean;
  width?: number;
  height?: number;
  radius?: number | string;
}

const defaultProps = {
  plain: false,
  height: 30,
  radius: '10px'
};

export type ExampleBlockProps = Props & typeof defaultProps;

const getBackground = (plain: number | boolean, theme?: NextUITheme) => {
  if (typeof plain !== 'number') return theme?.colors?.primary?.value;
  const colors = [
    theme?.colors?.accents1?.value,
    theme?.colors?.accents2?.value,
    theme?.colors?.accents3?.value,
    theme?.colors?.accents4?.value,
    theme?.colors?.accents5?.value,
    theme?.colors?.accents6?.value
  ];
  return colors[plain - 1] || theme?.colors?.primary?.value;
};

const ExampleBlock: React.FC<React.PropsWithChildren<ExampleBlockProps>> = ({
  children,
  plain,
  width,
  height,
  radius,
  ...props
}) => {
  const { theme } = useTheme();
  const blockWidth = useMemo(() => {
    return width ? `${width}px` : '100%';
  }, [width]);
  const bg = useMemo(() => getBackground(plain, theme), [theme, plain]);

  return (
    <div className="block" {...props}>
      {children}
      <style jsx>{`
        .block {
          min-width: ${blockWidth};
          min-height: ${height}px;
          background: ${bg};
          border-radius: ${radius};
          font-size: 0.75rem;
          padding: ${theme?.space?.sm?.value};
          color: ${theme?.colors?.background?.value};
        }
      `}</style>
    </div>
  );
};

const ExampleBlockMemo = React.memo(ExampleBlock);

export default withDefaults(ExampleBlockMemo, defaultProps);
