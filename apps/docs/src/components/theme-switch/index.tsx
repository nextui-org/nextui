import React from 'react';
import { Moon } from '../icons';
import { Switch, SwitchProps, useTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';

export const ThemeToggle: React.FC<Partial<SwitchProps>> = ({ ...props }) => {
  const [isSelfDark, setIsSelfDark] = React.useState(false);

  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const handleToggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    setIsSelfDark(nextTheme === 'dark');
    setTheme(nextTheme);
  };

  return (
    <Switch
      size="xl"
      checked={isSelfDark || isDark}
      icon={<Moon filled />}
      onChange={handleToggleTheme}
      {...props}
    />
  );
};

export default ThemeToggle;
