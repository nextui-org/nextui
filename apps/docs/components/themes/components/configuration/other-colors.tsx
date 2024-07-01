import {useContext} from "react";

import {otherColorsId} from "../../constants";
import {ThemeBuilderContext} from "../../provider";
import {Config, ThemeType} from "../../types";
import {ColorPicker} from "../color-picker";
import {ConfigSection} from "../config-section";
import {setCssOtherColor} from "../../css-vars";

interface OtherColorsProps {
  config: Config;
  syncIcon: React.ReactNode;
  syncThemes: boolean;
  theme: ThemeType;
}

export function OtherColors({config, syncIcon, syncThemes, theme}: OtherColorsProps) {
  const {setOtherColor} = useContext(ThemeBuilderContext);

  return (
    <ConfigSection id={otherColorsId} title="Other colors">
      <ColorPicker
        hexColor={config[theme].otherColor.focus}
        icon={syncIcon}
        label="Focus"
        type="focus"
        onChange={(hexColor) => setCssOtherColor("focus", hexColor)}
        onClose={(hexColor) => setOtherColor({focus: hexColor}, theme, syncThemes)}
      />
      <ColorPicker
        hexColor={config[theme].otherColor.overlay}
        label="Overlay"
        type="overlay"
        onChange={(hexColor) => setCssOtherColor("overlay", hexColor)}
        onClose={(hexColor) => setOtherColor({overlay: hexColor}, theme, false)}
      />
      <ColorPicker
        hexColor={config[theme].otherColor.divider}
        label="Divider"
        type="divider"
        onChange={(hexColor) => setCssOtherColor("divider", hexColor)}
        onClose={(hexColor) => setOtherColor({divider: hexColor}, theme, false)}
      />
    </ConfigSection>
  );
}
