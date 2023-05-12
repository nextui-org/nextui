import * as React from "react";

export interface Props {
  title: string;
  children?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type HeadingProps = Props & NativeAttrs;

const Heading: React.FC<HeadingProps> = ({title = "Heading", children}) => {
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

export default MemoHeading;
