import React from 'react';
import withDefaults from '@utils/with-defaults';

interface Props {
  block?: boolean;
  width?: string;
  className?: string;
}

const defaultProps = {
  block: false,
  className: '',
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
  if (!block) return <code {...props}>{children}</code>;

  return (
    <>
      <pre className={className} {...props}>
        <code>{children}</code>
      </pre>
      <style jsx>{`
        pre {
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
    </>
  );
};

const MemoCode = React.memo(Code);

export default withDefaults(MemoCode, defaultProps);
