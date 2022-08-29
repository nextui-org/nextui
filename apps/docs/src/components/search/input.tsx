import * as React from "react";
import {connectStateResults} from "react-instantsearch-dom";
import {useTheme, Loading} from "@nextui-org/react";

import {Search, Close} from "../icons";

export interface InputProps {
  value: string;
  onClear: () => void;
  searching: boolean;
}

const Input: React.FC<InputProps> = ({onClear, value, searching, ...inputProps}) => {
  const {theme} = useTheme();

  return (
    <div className="search__input-container">
      <input {...inputProps} value={value} />
      {!value ? (
        <span className="search__placeholder-container">
          <Search
            className="search__placeholder-icon"
            fill={theme?.colors?.accents8?.value}
            size={16}
          />
          <p className="search__placeholder-text">Search...</p>
        </span>
      ) : (
        <span className="search__reset-container" role="button" onClick={() => onClear()}>
          {searching ? (
            <Loading size="xs" />
          ) : (
            <Close fill={theme?.colors?.accents6?.value} size={16} />
          )}
        </span>
      )}
    </div>
  );
};

export default connectStateResults(Input);
