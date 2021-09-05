import React, { useMemo } from 'react';
import { useTheme, NextUIThemes } from '@nextui-org/react';
import withDefaults from '@utils/with-defaults';

interface Props {
  plain?: number | boolean;
  height?: number;
}

const defaultProps = {
  plain: false,
  height: 30,
};

export type ExampleBlockProps = Props & typeof defaultProps;

const getBackground = (theme: NextUIThemes, plain: number | boolean) => {
  if (typeof plain !== 'number') return theme.palette.primary;
  const colors = [
    theme.palette.accents_1,
    theme.palette.accents_2,
    theme.palette.accents_3,
    theme.palette.accents_4,
    theme.palette.accents_5,
    theme.palette.accents_6,
  ];
  return colors[plain - 1] || theme.palette.primary;
};

const ExampleBlock: React.FC<React.PropsWithChildren<ExampleBlockProps>> = ({
  children,
  plain,
  height,
  ...props
}) => {
  const theme = useTheme();
  const bg = useMemo(() => getBackground(theme, plain), [theme, plain]);

  return (
    <div className="block" {...props}>
      {children}
      <style jsx>{`
        .block {
          width: 100%;
          min-height: ${height}px;
          background: ${bg};
          padding: ${theme.layout.gapHalf};
          border-radius: 10px;
          color: ${theme.palette.background};
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
};

const ExampleBlockMemo = React.memo(ExampleBlock);

export default withDefaults(ExampleBlockMemo, defaultProps);
