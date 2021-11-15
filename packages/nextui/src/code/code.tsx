import React from 'react';
import useTheme from '../use-theme';
import clsx from '../utils/clsx';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';
import withDefaults from '../utils/with-defaults';

interface Props extends DefaultProps {
  block?: boolean;
  width?: string;
  className?: string;
}

const defaultProps = {
  block: false,
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CodeProps = Props & typeof defaultProps & NativeAttrs;

const Code: React.FC<React.PropsWithChildren<CodeProps>> = ({
  children,
  block,
  className,
  width,
  style,
  ...props
}) => {
  const theme = useTheme();
  const spacingStyles = getSpacingsStyles(theme, props);

  if (!block)
    return (
      <code style={{ ...style, ...spacingStyles }} {...props}>
        {children}
      </code>
    );

  return (
    <React.Fragment>
      <pre
        className={clsx('nextui-code', className)}
        style={{ ...style, ...spacingStyles }}
        {...props}
      >
        <code>{children}</code>
      </pre>
      <style jsx>{`
        .nextui-code {
          width: ${width ? width : 'initial'};
          max-width: 100%;
        }
        .dark {
          color: white;
          background: black;
        }
        .dark code {
          color: white;
        }
      `}</style>
    </React.Fragment>
  );
};

const MemoCode = React.memo(Code);

export default withDefaults(MemoCode, defaultProps);
