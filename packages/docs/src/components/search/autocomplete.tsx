import * as React from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { isMacOs } from 'react-device-detect';
import { useRouter } from 'next/router';
import {
  useTheme,
  useBodyScroll,
  useClickAway,
  usePortal
} from '@nextui-org/react';
import AutoSuggest, {
  ChangeEvent,
  OnSuggestionSelected,
  RenderSuggestionsContainerParams,
  RenderInputComponentProps
} from 'react-autosuggest';
import { useIsMobile } from '@hooks/use-media-query';
import { SearchByAlgolia, Close } from '../icons';
import { addColorAlpha } from '@utils/index';
import {
  connectAutoComplete,
  connectStateResults
} from 'react-instantsearch-dom';
import { isEmpty } from 'lodash';
import { AutocompleteProvided } from 'react-instantsearch-core';
import Keyboard from '../keyboard';
import Suggestion from './suggestion';
import { VisualState, useKBar } from 'kbar';
import Blockholder from '../blockholder';
import useIsMounted from '@hooks/use-is-mounted';

interface Props extends AutocompleteProvided {}

const Autocomplete: React.FC<Props> = ({ hits, refine }) => {
  const [value, setValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true });
  const router = useRouter();
  const suggestionsPortal = usePortal('suggestions');
  const noResultsPortal = usePortal('no-results');

  const { theme, isDark, type: themeType } = useTheme();
  const isMobile = useIsMobile();

  const { query } = useKBar();
  const isMounted = useIsMounted();

  let inputRef = React.useRef<HTMLInputElement>(null);

  useClickAway(inputRef, () => {
    setIsFocused(false);
    inputRef && inputRef?.current?.blur();
  });

  React.useEffect(() => {
    if (isMobile) {
      const isOpen = !isEmpty(
        document.getElementsByClassName(
          'react-autosuggest__suggestions-container--open'
        )
      );
      const noResults = isEmpty(hits) && !isEmpty(value);
      setBodyHidden(isFocused && (isOpen || noResults));
    } else {
      setBodyHidden(false);
    }
  }, [hits, value, isFocused, isMobile]);

  const onChange = (_: unknown, { newValue }: ChangeEvent) => {
    setValue(newValue);
  };

  const inputProps = {
    value,
    onChange,
    ref: inputRef,
    type: 'search',
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  };

  const onSuggestionsFetchRequested = ({ value }: any) => {
    refine(value);
  };

  const onSuggestionSelected: OnSuggestionSelected<any> = (
    _,
    { suggestion, method }
  ) => {
    if (method === 'enter') {
      onClear();
      router.push(suggestion.url);
    }
  };

  const getSuggestionValue = () => value;

  const renderSuggestion = (
    hit: any,
    { isHighlighted }: { isHighlighted: boolean }
  ) => <Suggestion highlighted={isHighlighted} hit={hit} />;

  const onClear = () => {
    refine();
    setValue('');
    inputRef && inputRef?.current?.blur();
  };

  const handleKeyboardClick = () => {
    query.setVisualState((vs) =>
      [VisualState.animatingOut, VisualState.hidden].includes(vs)
        ? VisualState.animatingIn
        : VisualState.animatingOut
    );
  };

  const renderInput = React.useCallback(
    (inputProps: RenderInputComponentProps) => {
      return (
        <label className="search__input-container">
          <input
            className="search__input"
            {...inputProps}
            placeholder="Search..."
          />
          {!value ? (
            <span className="search__placeholder-container">
              <Keyboard
                className="search__placeholder-kbd"
                command={isMacOs}
                ctrl={!isMacOs}
                onClick={handleKeyboardClick}
              >
                K
              </Keyboard>
            </span>
          ) : (
            <span className="search__reset-container" onClick={onClear}>
              <Close size={16} fill={theme?.colors?.accents6?.value} />
            </span>
          )}
        </label>
      );
    },
    [value, themeType]
  );

  const renderSuggestionsContainer = ({
    containerProps,
    children
  }: RenderSuggestionsContainerParams) =>
    isMobile && suggestionsPortal ? (
      createPortal(
        <div {...containerProps}>
          <a
            href="https://www.algolia.com/"
            target="_blank"
            rel="noreferrer"
            className="react-autosuggest__suggestions-header"
          >
            <SearchByAlgolia fill={theme?.colors?.accents6?.value} />
          </a>
          {children}
        </div>,
        suggestionsPortal
      )
    ) : (
      <div {...containerProps}>
        <a
          href="https://www.algolia.com/"
          target="_blank"
          rel="noreferrer"
          className="react-autosuggest__suggestions-header"
        >
          <SearchByAlgolia fill={theme?.colors?.accents6?.value} />
        </a>
        {children}
      </div>
    );

  const NoResults = connectStateResults(
    ({ searchState, searchResults, searching }) => {
      const open =
        searchState &&
        searchState.query &&
        !searching &&
        searchResults &&
        searchResults.nbHits === 0;
      const NoResultsContainer = () => (
        <div className="no-results">
          <span>
            No results for <span>"{value}"</span>
          </span>
          <br />
          <span>Try again with a different keyword</span>
        </div>
      );
      if (isMobile && open) {
        if (!noResultsPortal) return null;
        return createPortal(<NoResultsContainer />, noResultsPortal);
      }
      return open ? <NoResultsContainer /> : null;
    }
  );

  if (!isMounted) {
    return (
      <>
        <Blockholder
          className="search__placeholder-block"
          alt="search placeholder"
          height="38px"
        />
        <style jsx global>{`
          .search__placeholder-block {
            min-width: 228px;
          }
          @media only screen and (max-width: ${theme?.breakpoints?.xs}) {
            .search__placeholder-block {
              min-width: 64vw;
            }
          }
          @media only screen and (min-width: ${theme?.breakpoints?.xs
              ?.value}) and (max-width: ${theme?.breakpoints?.md}) {
            .search__placeholder-block {
              min-width: 248px;
            }
          }
        `}</style>
      </>
    );
  }

  return (
    <div
      className={cn('search__container', {
        focused: isFocused,
        'has-value': !!value.length
      })}
    >
      <AutoSuggest
        highlightFirstSuggestion={true}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onClear}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderInputComponent={renderInput}
        renderSuggestionsContainer={renderSuggestionsContainer}
        suggestions={hits}
        inputProps={inputProps}
      />

      <NoResults />

      <style jsx global>
        {`
          .search__container {
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .search__reset-container {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 6;
            height: 100%;
            right: 5%;
            cursor: pointer;
            transition: all 0.25s ease;
          }
          .search__placeholder-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }
          .search__placeholder-kbd {
            position: absolute;
            right: 4px;
          }
          :global(.search__reset-container:hover path) {
            fill: ${addColorAlpha(theme?.colors?.accents6?.value, 0.8)};
          }
          .search__placeholder-icon {
            position: absolute;
            left: 30%;
            z-index: -1;
            transition: all 0.25s ease;
          }
          .search__container.focused .search__placeholder-icon {
            left: 0;
            opacity: 0;
          }
          .react-autosuggest__container {
            position: relative;
            z-index: 4;
          }
          .search__input-container {
            position: relative;
            display: flex;
            height: 38px;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            background: ${addColorAlpha(theme?.colors?.background?.value, 0.7)};
            box-shadow: ${isDark
              ? '0px 5px 20px -5px rgba(0, 0, 0, 0.1)'
              : 'none'};
            border-radius: 8px;
          }
          .react-autosuggest__input {
            text-align: left;
            background: none;
            color: ${theme?.colors?.text?.value};
            width: 228px;
            height: 28px;
            padding: 16px;
            padding-right: calc(5% + 18px);
            font-size: 1rem;
            outline: none;
            border: none;
          }
          .react-autosuggest__suggestions-container {
            display: none;
            opacity: 0;
          }
          .react-autosuggest__suggestions-container,
          .no-results {
            position: ${isMobile ? 'fixed' : 'absolute'};
            top: 34px;
            right: 0;
            height: 0;
            padding: 12px 0;
            overflow-y: auto;
            height: auto;
            width: 428px;
            max-height: calc(100vh - 334px);
            min-height: 168px;
            transition: all 0.25s ease;
            backdrop-filter: saturate(180%) blur(20px);
            background: ${addColorAlpha(theme?.colors?.accents1?.value, 0.7)};
            box-shadow: 0px 5px 20px -5px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }
          @supports (
            (-webkit-backdrop-filter: blur(10px)) or
              (backdrop-filter: blur(10px))
          ) {
            .search__input-container,
            .react-autosuggest__suggestions-container,
            .no-results {
              backdrop-filter: saturate(180%) blur(10px);
              background: ${addColorAlpha(theme?.colors?.accents2?.value, 0.7)};
            }
            .search__input-container {
              background: ${addColorAlpha(theme?.colors?.accents2?.value, 0.7)};
            }
            .react-autosuggest__suggestions-container,
            .no-results {
              background: ${addColorAlpha(theme?.colors?.accents1?.value, 0.7)};
            }
          }
          @supports (
            not (-webkit-backdrop-filter: blur(10px)) and not
              (backdrop-filter: blur(10px))
          ) {
            .search__input-container {
              background: ${theme?.colors?.accents2?.value};
            }
            .react-autosuggest__suggestions-container,
            .no-results {
              background: ${theme?.colors?.accents1?.value};
            }
          }
          .react-autosuggest__suggestions-container::-webkit-scrollbar {
            width: 0px;
          }
          .react-autosuggest__suggestions-header {
            padding: 14px;
            width: 100%;
          }
          .react-autosuggest__suggestions-container--open {
            display: block;
            opacity: 1;
            z-index: 1001;
          }
          .react-autosuggest__suggestions-list {
            margin: 0;
            padding: 10px;
            list-style: none !important;
            list-style-type: none !important;
            overflow-y: auto;
          }
          .react-autosuggest__suggestions-list li:last-child a {
            border-bottom: none;
          }
          .react-autosuggest__section-container--first {
            border-top: 0;
          }
          .react-autosuggest__section-title {
            padding: 10px 0 0 10px;
            font-size: 12px;
            color: ${theme?.colors?.accents6?.value};
          }
          .no-results {
            z-index: 1001;
            display: flex;
            top: 60px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: ${theme?.colors?.accents6?.value};
          }
          .no-results span {
            word-break: break-all;
          }
          ::-webkit-search-cancel-button {
            display: none;
          }
          .search__input-container input:focus::placeholder {
            opacity: 0;
            transition: opacity 0.25s ease 0s;
          }
          .search__input-container input::placeholder {
            color: ${theme?.colors?.accents4?.value};
            transition: opacity 0.25s ease 0s;
            -moz-transition: opacity 0.25s ease 0s;
            -ms-transition: opacity 0.25s ease 0s;
            -webkit-transition: opacity 0.25s ease 0s;
          }
          @media only screen and (max-width: ${theme?.breakpoints?.xs}) {
            .react-autosuggest__suggestions-container,
            .no-results {
              z-index: 1004;
              width: 100%;
              height: calc(100vh + 10%);
              max-height: 100vh;
              padding: 0;
              border-radius: 0;
              top: 0;
              left: 0;
              right: 0;
            }
            .search__placeholder-kbd {
              display: none !important;
            }
            .react-autosuggest__suggestions-container {
              padding: 64px 0;
            }
            .react-autosuggest__input {
              width: 64vw;
              padding-right: 0;
            }

            .react-autosuggest__container {
              position: initial;
              z-index: 4;
            }
            .search__placeholder-container {
              position: absolute;
              z-index: -1;
              left: 0;
              right: 0;
            }
          }
          @media only screen and (min-width: ${theme?.breakpoints?.xs
              ?.value}) and (max-width: ${theme?.breakpoints?.md}) {
            .react-autosuggest__suggestions-container,
            .no-results {
              top: 60px;
              right: 180px;
            }
            .react-autosuggest__input {
              width: 248px;
              padding-right: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

const MemoAutocomplete = React.memo(Autocomplete);

export default connectAutoComplete(MemoAutocomplete);
