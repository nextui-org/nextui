import * as React from 'react';
import { Highlight, Snippet } from 'react-instantsearch-dom';
import NextLink from 'next/link';
import { Hit } from 'react-instantsearch-core';
import { map } from 'lodash';
import { NextUIThemes, useTheme } from '@nextui-org/react';

interface Props {
  hit: Hit;
  search: string;
}

const Suggestion: React.FC<Props> = ({ hit, search }) => {
  const theme = useTheme() as NextUIThemes;
  return (
    <NextLink
      href={`${hit.url}?query=${encodeURIComponent(search)}${
        hit.anchor ? `${hit.anchor}` : ''
      }`}
    >
      <a>
        <span className="suggestion__title">
          <Highlight attribute="content" tagName="mark" hit={hit} />
          <div className="tags">
            {map(hit._tags, (tag: string) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </span>
        {hit.section && (
          <span className="suggestion__section">
            <Highlight attribute="section" tagName="mark" hit={hit} />
          </span>
        )}
        <span className="suggestion__content">
          <Snippet width="100%" hit={hit} attribute="content" tagName="mark" />
        </span>
        <style jsx>
          {`
            .suggestion__title {
              font-size: 1rem;
              line-height: 2px;
              font-weight: 500;
              margin-bottom: 8px;
              display: flex;
              color: ${theme.palette.accents_6};
            }
            .suggestion__section {
              font-size: 0.875rem;
              line-height: 1px;
              font-weight: 500;
              margin-bottom: 12px;
              display: block;
            }
            .suggestion__content {
              font-size: 1rem;
              line-height: 2px;
              color: ${theme.palette.accents_6};
              display: block;
              line-height: 1.6;
            }
            .tags {
              margin-left: 8px;
              height: 22px;
              display: flex;
              align-items: center;
            }
            .tags .tag {
              border-radius: 4px;
              border: 1px solid ${theme.palette.accents_2};
              background: ${theme.palette.background};
              font-size: 10px;
              text-transform: uppercase;
              padding: 4px 8px;
              height: 100%;
              line-height: 130%;
              margin: 0;
            }
          `}
        </style>
      </a>
    </NextLink>
  );
};

const SuggestionMemo = React.memo(Suggestion);

export default SuggestionMemo;
