import React from 'react';
import withDefaults from '@utils/with-defaults';
import { Anchor } from '@components';
import ReactMarkdown from 'react-markdown';
import { kebabCase, isString } from 'lodash';

interface Props {
  title: React.ReactNode | string;
  desc?: React.ReactNode | string;
}

const defaultProps = {
  desc: '',
};

export type TitleProps = Props & typeof defaultProps;

const Title: React.FC<TitleProps> = ({ title, desc }) => {
  return (
    <>
      <h3
        id={`${isString(title) && kebabCase(title)}`}
        data-name={title}
        className="linked-heading"
      >
        <Anchor>{title}</Anchor>
      </h3>
      {desc && <ReactMarkdown>{desc}</ReactMarkdown>}
      <style jsx>{`
        h3 {
          margin-bottom: ${desc ? 0 : '30px'};
          line-height: 1;
          font-size: 1.25rem;
          margin-top: 30px;
          text-transform: capitalize;
          position: relative;
        }
        h3 > p {
          margin: 0;
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
