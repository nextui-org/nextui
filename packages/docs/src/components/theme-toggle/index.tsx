import React from 'react';
import cn from 'classnames';
import { Moon, Sun } from '../icons';
import { useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import Blockholder from '../blockholder';
import useIsMounted from '@hooks/use-is-mounted';

interface Props {
  className?: string;
}

export const ThemeToggle: React.FC<Props> = ({ className }) => {
  const isMounted = useIsMounted();
  const { setTheme } = useNextTheme();
  const { theme, isDark } = useTheme();

  if (!isMounted) {
    return (
      // to avoid layout shift on initial render
      <Blockholder alt="toggle theme placeholder" width="32px" height="20px" />
    );
  }

  const handleToggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      aria-label="toggle a light and dark color scheme"
      className={cn('theme-selector-container', className)}
      onClick={handleToggleTheme}
    >
      {isDark ? (
        <Sun
          filled
          fill={
            isDark
              ? theme?.colors?.accents6?.value
              : theme?.colors?.accents4?.value
          }
          size={20}
        />
      ) : (
        <Moon
          filled
          fill={
            isDark
              ? theme?.colors?.accents6?.value
              : theme?.colors?.accents4?.value
          }
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
            background: transparent;
            border: none;
            padding: 0;
          }
        `}
      </style>
    </button>
  );
};

export default ThemeToggle;
