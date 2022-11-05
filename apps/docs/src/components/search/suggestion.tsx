import * as React from "react";
import cn from "classnames";
import {Highlight} from "react-instantsearch-dom";
import NextLink from "next/link";
import {Hit} from "react-instantsearch-core";
import {useTheme} from "@nextui-org/react";
import {addColorAlpha} from "@utils/index";
import {includes} from "lodash";

import {CodeDocument, Hash, ArrowRight} from "../icons";

interface Props {
  hit: Hit;
  highlighted: boolean;
}

const Suggestion: React.FC<Props> = ({hit, highlighted}) => {
  const {theme} = useTheme();

  return (
    <NextLink href={hit.url}>
      <span className={cn("suggestion__container", {highlighted})}>
        <div className="suggestion__icon-container">
          {hit.type !== "lvl1" || includes(hit.url, "#") ? (
            <Hash fill={theme?.colors?.accents6?.value} />
          ) : (
            <CodeDocument fill={theme?.colors?.accents6?.value} />
          )}
        </div>
        <div className="suggestion__data-container">
          {hit.type !== "lvl1" && (
            <span className="suggestion__title">
              <Highlight attribute="hierarchy.lvl1" hit={hit} tagName="mark" />
            </span>
          )}
          <span className="suggestion__content">
            <Highlight attribute="content" hit={hit} tagName="mark" />
          </span>
        </div>
        <div>
          <ArrowRight fill={theme?.colors?.accents6?.value} size={16} />
        </div>

        <style jsx>
          {`
            .suggestion__container {
              display: flex;
              align-items: center;
              cursor: pointer;
              padding: 16px 8px;
              justify-content: space-between;
              border-bottom: 1px solid ${addColorAlpha(theme?.colors?.border?.value, 0.1)};
              min-height: 68px;
              transition: all 0.2s ease;
            }
            .suggestion__container,
            .suggestion__icon-container {
              display: flex;
              align-items: center;
            }
            .suggestion__icon-container {
              margin-right: calc(${theme?.space?.sm?.value} * 0.5);
            }
            .suggestion__data-container {
              width: 100%;
            }
            .suggestion__title {
              font-size: 0.735rem;
              line-height: 2px;
              font-weight: 500;
              margin-bottom: 8px;
              display: flex;
              color: ${theme?.colors?.accents6?.value};
            }
            .suggestion__container:hover,
            .suggestion__container.highlighted {
              border-radius: 4px;
              background: ${addColorAlpha(theme?.colors?.text?.value, 0.1)};
            }
            .suggestion__container:active {
              transform: scale(0.97);
            }
            :global(.suggestion__title mark) {
              background-color: transparent;
              color: ${theme?.colors?.accents6?.value};
            }
            .suggestion__content {
              font-size: 1rem;
              line-height: 2px;
              display: block;
              line-height: 1.6;
              color: ${theme?.colors?.accents6?.value};
            }
            :global(.suggestion__content mark) {
              background-color: transparent;
              color: ${theme?.colors?.text?.value};
            }
          `}
        </style>
      </span>
    </NextLink>
  );
};

const SuggestionMemo = React.memo(Suggestion);

export default SuggestionMemo;
