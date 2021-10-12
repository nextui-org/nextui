import React from 'react';
import cn from 'classnames';
import useDarkMode from 'use-dark-mode';
import { Moon, Sun } from '../icons';
import { useTheme } from '@nextui-org/react';

interface Props {
  className?: string;
}

export const ThemeToggle: React.FC<Props> = ({ className }) => {
  const darkMode = useDarkMode();
  const theme = useTheme();
  const isDark = theme.type === 'dark';
  return (
    <span
      className={cn('theme-selector-container', className)}
      onClick={darkMode.toggle}
    >
      {isDark ? (
        <Sun
          filled
          fill={isDark ? theme.palette.accents_4 : theme.palette.accents_5}
          size={20}
        />
      ) : (
        <Moon
          filled
          fill={isDark ? theme.palette.accents_4 : theme.palette.accents_5}
          size={20}
        />
      )}

      <style jsx>
        {`
          .theme-selector-container {
            display: flex;
            width: auto;
            height: auto;
            cursor: pointer;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </span>
  );
};

export default ThemeToggle;
