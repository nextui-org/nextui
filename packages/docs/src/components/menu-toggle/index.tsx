import * as React from 'react';
import { NextUIThemes, useTheme } from '@nextui-org/react';

export interface MenuToggleProps {
  expanded: boolean;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ expanded }) => {
  const theme = useTheme() as NextUIThemes;
  return (
    <div
      className={`wrap ${expanded ? 'expanded' : ''}`}
      aria-label={`${expanded ? 'close menu' : 'open menu'}`}
    >
      <div className="line top" />
      <div className="line bottom" />
      <style jsx>
        {`
          .wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            pointer-events: none;
          }
          .line {
            height: 1px;
            width: 22px;
            background-color: ${theme.palette.foreground};
            transition: transform 0.15s ease;
          }
          .line:last-child {
            transform: translateY(4px) rotate(0deg);
          }
          .line:first-child {
            transform: translateY(-4px) rotate(0deg);
          }
          .wrap.expanded .line:first-child {
            transform: translateY(1px) rotate(45deg);
          }
          .wrap.expanded .line:last-child {
            transform: translateY(0px) rotate(-45deg);
          }
        `}
      </style>
    </div>
  );
};

export default MenuToggle;
