import * as React from 'react';
import withDefaults from '@utils/with-defaults';

export interface Props {
  title: string;
}

const defaultProps = {
  title: 'Heading',
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type HeadingProps = Props & typeof defaultProps & NativeAttrs;

const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  title,
  children,
}) => {
  return (
    <div className="heading">
      <h4>{title}</h4>
      <div>{children}</div>
      <style jsx>{`
        h4 {
          font-size: 1.2rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

const MemoHeading = React.memo(Heading);

export default withDefaults(MemoHeading, defaultProps);
