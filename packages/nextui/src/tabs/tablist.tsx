import React from 'react';
import { NormalColors } from 'src';
import Button from '../button';
import "./style.css";

interface Props {
  theme?: NormalColors;
  buttons: { text: string; onClick: () => void, isActive: boolean; content?: JSX.Element }[];
}

const TabList: React.FC<Props> = ({ buttons, theme }) => {

  return (
    <div className="nextui-tablist">
      <div className="nextui-tablist-buttons">
        {buttons.map((button, index) => {
          return (
            <Button
              key={`tab-${index}-${button.text}`}
              onClick={button.onClick}
              className={`nextui-tablist-button${button.isActive ? "-active" : ""}`}
              color={theme}
            >{button.text}</Button>
          )
        })}
      </div>
    </div>
  )
};

export default TabList;