import React from 'react';
import { Moon, Sun } from '../icons';
import { Switch, SwitchProps, useTheme } from '@nextui-org/react';

export const ThemeToggle: React.FC<Partial<SwitchProps>> = ({ ...props }) => {
  const { setTheme, theme } = useNextTheme();
  const { isDark } = useTheme();

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
