import React from "react";
import withDefaults from "@utils/with-defaults";
import {Anchor} from "@components";
import ReactMarkdown from "react-markdown";
import {kebabCase, isString} from "lodash";

interface Props {
  title: React.ReactNode | string;
  desc?: React.ReactNode | string;
}

const defaultProps = {
  desc: "",
};

export type TitleProps = Props & typeof defaultProps;

const Title: React.FC<TitleProps> = ({title, desc}) => {
  return (
    <>
      <h3
        className="linked-heading"
        data-name={title}
        id={`${isString(title) && kebabCase(title)}`}
      >
        <Anchor>{title}</Anchor>
      </h3>
      {desc && <ReactMarkdown className="react-markdown">{desc}</ReactMarkdown>}
      <style jsx>{`
        h3 {
          margin-bottom: 0;
          line-height: 1;
          font-size: 1.25rem;
          text-transform: capitalize;
          position: relative;
        }
        h3 > p {
          margin: 0;
        }
        :global(.react-markdown p) {
          font-size: 1.125rem;
        }
        h3 > :global(code),
        h3 > :global(pre) {
          text-transform: none;
        }
      `}</style>
    </>
  );
};

const MemoTitle = React.memo(Title);

export default withDefaults(MemoTitle, defaultProps);
