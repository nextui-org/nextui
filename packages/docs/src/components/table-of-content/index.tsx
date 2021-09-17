import * as React from 'react';
import cn from 'classnames';
import { useScrollSpy } from '@hooks/use-scroll-spy';
import { Heading } from '@utils/get-headings';
import { useTheme, NextUIThemes } from '@nextui-org/react';
import { CarbonAd } from '@components';
import { isProd } from '../../utils/index';

interface TableOfContentProps {
  headings: Heading[];
}

const TableOfContent: React.FC<TableOfContentProps> = ({
  headings,
  ...props
}) => {
  const activeId = useScrollSpy(
    headings.map(({ id }) => `[id="${id}"]`),
    {
      rootMargin: '0% 0% -80% 0%',
    }
  );
  const theme = useTheme() as NextUIThemes;

  if (headings.length <= 0) return null;

  return (
    <div className="container" {...props}>
      <h4 className="title">Contents</h4>
      <ul className="list">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn('list-item', {
              active: activeId == heading.id,
            })}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
      {isProd && <CarbonAd />}
      <style jsx>{`
        .container {
          position: relative;
          padding-left: 1rem;
        }
        .title {
          font-size: 1.2rem;
          font-weight: 600;
          z-index: 1;
        }
        .list {
          max-height: 62vh;
          margin-bottom: 20px;
          overflow: auto;
        }
        .list::-webkit-scrollbar {
          width: 0px;
        }
        .title,
        .list-item {
          max-width: 100%;
          text-align: left;
        }
        .list-item:before {
          display: none;
        }
        .list-item {
          padding-left: 1rem;
          position: relative;
          list-style-type: none;
          margin-bottom: 0;
          transition: all 0.25s ease;
        }
        .list-item a {
          font-size: 0.8rem;
          color: ${theme.palette.accents_6};
        }
        .list-item.active a {
          color: inherit;
        }
        .list-item:after {
          content: '';
          position: absolute;
          top: 50%;
          right: auto;
          left: 0;
          width: 5px;
          height: 5px;
          opacity: 0;
          border-radius: 10px;
          background: ${theme.palette.foreground};
          transform: translateY(-50%);
          transition: all 0.25s ease;
        }
        .list-item.active:after {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

const MemoTableOfContent = React.memo(TableOfContent);

export default MemoTableOfContent;
