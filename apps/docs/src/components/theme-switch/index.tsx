import React from "react";
import {Switch, SwitchProps, useTheme} from "@nextui-org/react";
import {useTheme as useNextTheme} from "next-themes";

import {Moon, Sun} from "../icons";

export const ThemeToggle: React.FC<Partial<SwitchProps>> = ({...props}) => {
  const [isSelfDark, setIsSelfDark] = React.useState(false);

  const {setTheme} = useNextTheme();
  const {isDark} = useTheme();

  const handleToggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";

    setIsSelfDark(nextTheme === "dark");
    setTheme(nextTheme);
  };

  return (
    <Switch
      checked={isSelfDark || isDark}
      iconOff={<Moon filled />}
      iconOn={<Sun filled />}
      size="xl"
      onChange={handleToggleTheme}
      {...props}
    />
  );
};

export default ThemeToggle;
