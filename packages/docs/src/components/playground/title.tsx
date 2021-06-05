import React from 'react';
import withDefaults from '@utils/with-defaults';
import { Anchor } from '@components';

interface Props {
  title: React.ReactNode | string;
  desc?: React.ReactNode | string;
}

const defaultProps = {
  desc: '',
};

export type TitleProps = Props & typeof defaultProps;

const replaceCode = (desc: string): string => {
  if (!desc.includes('`')) return desc;
  let count = 0;
  return desc.replace(/`/g, () => {
    const val = count % 2 === 0 ? '<code>' : '</code>';
    count += 1;
    return val;
  });
};

const Title: React.FC<TitleProps> = ({ title, desc }) => {
  const isStringDesc = typeof desc === 'string';
  return (
    <>
      <h3>
        <Anchor>{title}</Anchor>
      </h3>
      {desc && isStringDesc && (
        <p dangerouslySetInnerHTML={{ __html: replaceCode(desc) }} />
      )}
      {desc && !isStringDesc && <p>{desc}</p>}
      <style jsx>{`
        h3 {
          margin-bottom: ${desc ? 0 : '30px'};
          line-height: 1;
          font-size: 1.3rem;
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
