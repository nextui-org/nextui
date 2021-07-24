import * as React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';
import { NextUIThemes, useTheme, Loading } from '@nextui-org/react';
import { Search, Close } from '../icons';

export interface InputProps {
  value: string;
  onClear: () => void;
  searching: boolean;
}

const Input: React.FC<InputProps> = ({
  onClear,
  value,
  searching,
  ...inputProps
}) => {
  const theme = useTheme() as NextUIThemes;
  return (
    <div className="search__input-container">
      <input {...inputProps} value={value} />
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
        <span className="search__reset-container" onClick={() => onClear()}>
          {searching ? (
            <Loading size="mini" />
          ) : (
            <Close size={16} fill={theme.palette.accents_6} />
          )}
        </span>
      )}
    </div>
  );
};

export default connectStateResults(Input);
