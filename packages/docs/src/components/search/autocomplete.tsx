import * as React from 'react';
import cn from 'classnames';
import { browserName } from 'react-device-detect';
import { NextUIThemes, useTheme } from '@nextui-org/react';
import AutoSuggest, {
  ChangeEvent,
  RenderSuggestionsContainerParams,
} from 'react-autosuggest';
import { Search, SearchByAlgolia, Close } from '../icons';
import { addColorAlpha } from '@utils/index';
import { connectAutoComplete } from 'react-instantsearch-dom';
import { AutocompleteProvided } from 'react-instantsearch-core';
import Suggestion from './suggestion';

interface Props extends AutocompleteProvided {}

const isSafari = browserName === 'Safari';

const Autocomplete: React.FC<Props> = ({ hits, refine }) => {
  const [value, setValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const theme = useTheme() as NextUIThemes;
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

  return (
    <div
      className={cn('search__container', {
        focused: isFocused,
        'has-value': !!value.length,
      })}
    >
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
      <AutoSuggest
        alwaysRenderSuggestions={true}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onClear}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        suggestions={hits}
        inputProps={inputProps}
      />

      <style jsx global>
        {`
          .search__container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            transition: all 0.25s ease;
            background: ${addColorAlpha(theme.palette.accents_3, 0.5)};
            color: ${theme.palette.white};
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
            border-radius: 8px;
          }
          .search__placeholder-container,
          .search__reset-container {
            position: absolute;
            z-index: 3;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .search__placeholder-container {
            width: 100%;
            height: 100%;
            left: 0;
            right: 0;
          }
          .search__reset-container {
            z-index: 6;
            height: 100%;
            right: 5%;
            cursor: pointer;
            transition: all 0.25s ease;
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
          .react-autosuggest__input {
            text-align: left;
            background: transparent;
            width: 228px;
            height: 28px;
            padding: 16px;
            padding-right: calc(5% + 18px);
            font-size: 1rem;
            outline: none;
            border: none;
          }
          .react-autosuggest__suggestions-container {
            position: absolute;
            display: none;
            top: 30px;
            right: 0;
            opacity: 0;
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
          .react-autosuggest__suggestions-header {
            padding: 14px;
            width: 100%;
          }
          .react-autosuggest__suggestions-container--open {
            display: block;
            opacity: 1;
            z-index: 9999;
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
            color: var(--accents-5);
          }
          ::-webkit-search-cancel-button {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

const MemoAutocomplete = React.memo(Autocomplete);

export default connectAutoComplete(MemoAutocomplete);
