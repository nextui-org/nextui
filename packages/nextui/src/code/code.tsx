import React from 'react';
import clsx from '../utils/clsx';
import useTheme from '../use-theme';
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
  ...props
}) => {
  const theme = useTheme();
  const { stringCss } = getSpacingsStyles(theme, props);

  if (!block)
    return (
      <code className="nextui-code" {...props}>
        {children}
        <style jsx>{`
          .nextui-code {
            ${stringCss};
          }
        `}</style>
      </code>
    );

  return (
    <React.Fragment>
      <pre className={clsx('nextui-code', className)} {...props}>
        <code>{children}</code>
      </pre>
      <style jsx>{`
        .nextui-code {
          width: ${width ? width : 'initial'};
          max-width: 100%;
          ${stringCss};
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
