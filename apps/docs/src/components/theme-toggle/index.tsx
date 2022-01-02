import React from 'react';
import cn from 'classnames';
import { Moon, Sun } from '../icons';
import { useTheme, styled } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';
import Blockholder from '../blockholder';
import useIsMounted from '@hooks/use-is-mounted';

interface Props {
  className?: string;
}

const StyledButton = styled('button', {
  dflex: 'center',
  size: 'auto',
  cursor: 'pointer',
  background: 'transparent',
  border: 'none',
  padding: 0,
  '@xsMax': {
    px: '$2'
  }
});

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
    <StyledButton
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
    </StyledButton>
  );
};

export default ThemeToggle;
