import * as React from 'react';
import cn from 'classnames';
import { NextUIThemes, useTheme } from '@nextui-org/react';
import AutoSuggest, { ChangeEvent } from 'react-autosuggest';
import { Search } from '../icons';
import { addColorAlpha } from '@utils/index';

const Input = (props: any) => {
  const [value, setValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const theme = useTheme() as NextUIThemes;

  const onChange = (
    event: React.FormEvent<HTMLElement>,
    { newValue }: ChangeEvent
  ) => {
    setValue(newValue);
  };

  const languages = [
    {
      name: 'C',
      year: 1972,
    },
    {
      name: 'Elm',
      year: 2012,
    },
  ];

  const onToggleFocus = () => {
    setIsFocused(!isFocused);
  };

  const inputProps = {
    value,
    onChange,
    onFocus: onToggleFocus,
    onBlur: onToggleFocus,
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    console.log({ value });
  };

  const onSuggestionsClearRequested = () => {
    console.log('onSuggestionsClearRequested');
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  return (
    <div
      className={cn('search__container', {
        focused: isFocused,
        'has-value': !!value.length,
      })}
    >
      {!value && (
        <span className="search__placeholder-container">
          <p className="search__placeholder-text">Search...</p>
          <Search
            size={20}
            fill={theme.palette.accents_8}
            className="search__placeholder-icon"
          />
        </span>
      )}
      <AutoSuggest
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        suggestions={languages}
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
          .search__container.focused {
            box-shadow: 0 0 0 1px ${theme.palette.primary};
          }
          .search__placeholder-container {
            position: absolute;
            left: 0;
            right: 0;
            z-index: 3;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .search__placeholder-text {
            position: absolute;
            transition: opacity 0.15s ease;
            font-size: 1rem;
            line-height: 1px;
            left: 16px;
            pointer-events: none;
            color: ${theme.palette.accents_5};
            transition: all 0.25s ease;
          }
          .search__placeholder-icon {
            position: absolute;
            right: 8px;
            margin-bottom: 2px;
            transition: all 0.2s ease;
          }
          .search__container:hover .search__placeholder-text {
            color: ${theme.palette.accents_6};
          }
          .search__container:hover .search__placeholder-icon {
            width: 22px;
            height: 22px;
          }
          .react-autosuggest__container {
            position: relative;
          }
          .react-autosuggest__input {
            text-align: left;
            background: transparent;
            width: 228px;
            height: 28px;
            padding: 16px;
            font-size: 1rem;
            outline: none;
            border: none;
          }
          .react-autosuggest__suggestions-container {
            position: absolute;
            opacity: 0;
            height: 0;
            top: 28px;
            overflow-y: auto;
            transition: all 0.25s ease;
            background: ${theme.palette.accents_1};
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
            border-radius: 8px;
          }
          .react-autosuggest__suggestions-container--open {
            opacity: 1;
            width: 100%;
            padding: 12px 0;
            max-height: calc(90vh - 334px);
            min-height: 168px;
            transform: translateY(20px);
          }
          .react-autosuggest__suggestions-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
            overflow-y: auto;
          }
          .react-autosuggest__suggestion {
            cursor: pointer;
            padding: 0 12px;
          }
          .react-autosuggest__suggestion a {
            text-decoration: none;
            color: black;
            border-radius: 4px;
            display: block;
            padding: 12px;
            border: 1px solid transparent;
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
        `}
      </style>
    </div>
  );
};

const MemoInput = React.memo(Input);

export default MemoInput;
