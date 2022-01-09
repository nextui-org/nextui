import React from 'react';
import { Moon, Sun } from '../icons';
import { Switch, SwitchProps } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';

export const ThemeToggle: React.FC<Partial<SwitchProps>> = ({ ...props }) => {
  const { setTheme, theme } = useNextTheme();
  const isDark = theme === 'dark';

  const handleToggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Switch
      size="xl"
      checked={isDark}
      iconOn={<Moon filled />}
      iconOff={<Sun filled />}
      onChange={handleToggleTheme}
      {...props}
    />
  );
};

export default ThemeToggle;
