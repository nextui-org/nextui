import * as React from 'react';
import cn from 'classnames';
import { browserName } from 'react-device-detect';
import { NextUIThemes, useTheme, useBodyScroll } from '@nextui-org/react';
import AutoSuggest, {
  ChangeEvent,
  RenderSuggestionsContainerParams,
  RenderInputComponentProps,
} from 'react-autosuggest';
import { useMediaQuery } from '@hooks/use-media-query';
import { SearchByAlgolia, Search, Close } from '../icons';
import { addColorAlpha } from '@utils/index';
import {
  connectAutoComplete,
  connectStateResults,
} from 'react-instantsearch-dom';
import { isEmpty } from 'lodash';
import { AutocompleteProvided } from 'react-instantsearch-core';
import Suggestion from './suggestion';

interface Props extends AutocompleteProvided {}

const isSafari = browserName === 'Safari';

const Autocomplete: React.FC<Props> = ({ hits, refine }) => {
  const [value, setValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true });
  const theme = useTheme() as NextUIThemes;
  const isMobile = useMediaQuery(
    Number(theme.breakpoints.sm.max.replace('px', ''))
  );

  React.useEffect(() => {
    if (isMobile) {
      const isOpen = !isEmpty(
        document.getElementsByClassName(
          'react-autosuggest__suggestions-container--open'
        )
      );
      const noResults = isEmpty(hits) && !isEmpty(value);
      setBodyHidden(isFocused && (isOpen || noResults));
    }
  }, [hits, value, isFocused, isMobile]);

  const onChange = (
    event: React.FormEvent<HTMLElement>,
    { newValue }: ChangeEvent
  ) => {
    console.log(event);
    setValue(newValue);
  };

  const onToggleFocus = () => {
    setIsFocused(!isFocused);
  };

  const inputProps = {
    value,
    onChange,
    type: 'search',
    onFocus: onToggleFocus,
    onBlur: onToggleFocus,
  };

  const onSuggestionsFetchRequested = ({ value }: any) => {
    refine(value);
  };

  const getSuggestionValue = () => value;

  const renderSuggestion = (hit: any) => <Suggestion hit={hit} />;

  const onClear = () => {
    refine();
    setValue('');
  };

  const renderInput = (inputProps: RenderInputComponentProps) => (
    <div className="search__input-container">
      <input {...inputProps} />
      {!value ? (
        <span className="search__placeholder-container">
          <Search
            size={16}
            fill={theme.palette.accents_8}
            className="search__placeholder-icon"
          />
          <p className="search__placeholder-text">Search...</p>
        </span>
      ) : (
        <span className="search__reset-container" onClick={onClear}>
          <Close size={16} fill={theme.palette.accents_6} />
        </span>
      )}
    </div>
  );

  const renderSuggestionsContainer = ({
    containerProps,
    children,
  }: RenderSuggestionsContainerParams) => {
    return (
      <div {...containerProps}>
        <a
          href="https://www.algolia.com/"
          target="_blank"
          rel="noreferrer"
          className="react-autosuggest__suggestions-header"
        >
          <SearchByAlgolia fill={theme.palette.accents_6} />
        </a>
        {children}
      </div>
    );
  };

  const NoResults = connectStateResults(
    ({ searchState, searchResults, searching }) =>
      searchState &&
      searchState.query &&
      !searching &&
      searchResults &&
      searchResults.nbHits === 0 ? (
        <div className="no-results">
          <span>
            No results for <span>"{value}"</span>
          </span>
          <br />
          <span>Try again with a different keyword</span>
        </div>
      ) : null
  );

  return (
    <div
      className={cn('search__container', {
        focused: isFocused,
        'has-value': !!value.length,
      })}
    >
      <AutoSuggest
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={() => refine()}
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
          :global(.search__reset-container:hover path) {
            fill: ${addColorAlpha(theme.palette.accents_6, 0.8)};
          }
          .search__placeholder-text {
            position: absolute;
            margin: 0;
            padding: 0;
            left: 40%;
            font-size: 1rem;
            justify-content: center;
            align-items: center;
            line-height: 1px;
            pointer-events: none;
            color: ${theme.palette.accents_5};
            transition: all 0.25s ease;
          }
          .search__placeholder-icon {
            position: absolute;
            left: 30%;
            z-index: -1;
            transition: all 0.25s ease;
          }
          .search__container.focused .search__placeholder-text {
            left: ${isSafari ? '25px' : '16px'};
          }
          .search__container.focused .search__placeholder-icon {
            left: 0;
            opacity: 0;
          }
          .search__container:hover .search__placeholder-text {
            color: ${theme.palette.accents_6};
          }
          .react-autosuggest__container {
            position: relative;
            z-index: 4;
          }
          .search__input-container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            backdrop-filter: saturate(180%) blur(10px);
            background: ${addColorAlpha(theme.palette.accents_2, 0.7)};
            box-shadow: 0px 5px 20px -5px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }
          .react-autosuggest__input {
            text-align: left;
            background: none;
            color: ${theme.palette.text};
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
            position: absolute;
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
            background: ${addColorAlpha(theme.palette.accents_1, 0.7)};
            box-shadow: 0px 5px 20px -5px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
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
            transform: translateY(10px);
          }
          .react-autosuggest__suggestions-list {
            margin: 0;
            padding: 0;
            list-style: none !important;
            list-style-type: none !important;
            overflow-y: auto;
          }
          .react-autosuggest__suggestions-list li:last-child a {
            border-bottom: none;
          }
          .react-autosuggest__suggestion {
            cursor: pointer;
            padding: 0 12px;
          }
          .react-autosuggest__suggestion--highlighted a {
            background: var(--accents-1);
            border-color: var(--accents-2);
          }
          .react-autosuggest__suggestion--highlighted a span {
            color: var(--geist-foreground);
          }
          .react-autosuggest__section-container {
            border-top: 1px dashed var(--accents-3);
          }
          .react-autosuggest__section-container--first {
            border-top: 0;
          }
          .react-autosuggest__section-title {
            padding: 10px 0 0 10px;
            font-size: 12px;
            color: ${theme.palette.accents_6};
          }
          .no-results {
            z-index: 1001;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: ${theme.palette.accents_6};
          }
          .no-results span {
            word-break: break-all;
          }
          ::-webkit-search-cancel-button {
            display: none;
          }
          @media only screen and (max-width: ${theme.breakpoints.md.min}) {
            .react-autosuggest__suggestions-container,
            .no-results {
              right: -90px;
            }
            .react-autosuggest__input {
              width: 248px;
              padding-right: calc(5% + 10px);
            }
          }
          @media only screen and (max-width: ${theme.breakpoints.xs.max}) {
            .react-autosuggest__suggestions-container,
            .no-results {
              z-index: -1;
              width: 100%;
              height: 100vh;
              max-height: 100vh;
              padding: 50px 0;
              top: 0;
              left: 0;
              right: 0;
            }
            .react-autosuggest__input {
              width: 190px;
            }
            .react-autosuggest__container {
              position: initial;
              z-index: 4;
            }
            .search__input-container {
              position: initial;
            }
          }
        `}
      </style>
    </div>
  );
};

const MemoAutocomplete = React.memo(Autocomplete);

export default connectAutoComplete(MemoAutocomplete);
