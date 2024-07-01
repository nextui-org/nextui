import {useContext} from "react";

import {colorsId} from "../../constants";
import {setCssColor} from "../../css-vars";
import {ThemeBuilderContext} from "../../provider";
import {Config, ThemeType} from "../../types";
import {ColorPicker} from "../color-picker";
import {ConfigSection} from "../config-section";

interface BrandColorsProps {
  config: Config;
  syncIcon: React.ReactNode;
  syncThemes: boolean;
  theme: ThemeType;
}

export function BrandColors({config, syncIcon, syncThemes, theme}: BrandColorsProps) {
  const {setBrandColor} = useContext(ThemeBuilderContext);

  return (
    <ConfigSection id={colorsId} title="Brand colors">
      <ColorPicker
        hexColor={config[theme].brandColor.default}
        label="Default"
        type="default"
        onChange={(hexColor) => setCssColor("default", hexColor, theme)}
        onClose={(hexColor) => setBrandColor({default: hexColor}, theme, false)}
      />
      <ColorPicker
        hexColor={config[theme].brandColor.primary}
        icon={syncIcon}
        label="Primary"
        type="primary"
        onChange={(hexColor) => setCssColor("primary", hexColor, theme)}
        onClose={(hexColor) => setBrandColor({primary: hexColor}, theme, syncThemes)}
      />
      <ColorPicker
        hexColor={config[theme].brandColor.secondary}
        icon={syncIcon}
        label="Secondary"
        type="secondary"
        onChange={(hexColor) => setCssColor("secondary", hexColor, theme)}
        onClose={(hexColor) => setBrandColor({secondary: hexColor}, theme, syncThemes)}
      />
      <ColorPicker
        hexColor={config[theme].brandColor.success}
        icon={syncIcon}
        label="Success"
        type="success"
        onChange={(hexColor) => setCssColor("success", hexColor, theme)}
        onClose={(hexColor) => setBrandColor({success: hexColor}, theme, syncThemes)}
      />
      <ColorPicker
        hexColor={config[theme].brandColor.warning}
        icon={syncIcon}
        label="Warning"
        type="warning"
        onChange={(hexColor) => setCssColor("warning", hexColor, theme)}
        onClose={(hexColor) => setBrandColor({warning: hexColor}, theme, syncThemes)}
      />
      <ColorPicker
        hexColor={config[theme].brandColor.danger}
        icon={syncIcon}
        label="Danger"
        type="danger"
        onChange={(hexColor) => setCssColor("danger", hexColor, theme)}
        onClose={(hexColor) => setBrandColor({danger: hexColor}, theme, syncThemes)}
      />
    </ConfigSection>
  );
}
