import {otherColorsId} from "../../constants";
import {useThemeBuilder} from "../../provider";
import {Config, ThemeType} from "../../types";
import {copyOtherColorConfig} from "../../utils/config";
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
  const {setOtherColor} = useThemeBuilder();

  return (
    <ConfigSection id={otherColorsId} title="Other colors">
      <ColorPicker
        hexColor={config[theme].otherColor.focus}
        icon={syncIcon}
        label="Focus"
        type="focus"
        onChange={(hexColor) => setCssOtherColor("focus", hexColor)}
        onClose={(hexColor) => setOtherColor({focus: hexColor}, theme, syncThemes)}
        onCopy={(theme) => copyOtherColorConfig(config, "focus", theme)}
      />
      <ColorPicker
        hexColor={config[theme].otherColor.overlay}
        label="Overlay"
        type="overlay"
        onChange={(hexColor) => setCssOtherColor("overlay", hexColor)}
        onClose={(hexColor) => setOtherColor({overlay: hexColor}, theme, false)}
        onCopy={(theme) => copyOtherColorConfig(config, "overlay", theme)}
      />
      <ColorPicker
        hexColor={config[theme].otherColor.divider}
        label="Divider"
        type="divider"
        onChange={(hexColor) => setCssOtherColor("divider", hexColor)}
        onClose={(hexColor) => setOtherColor({divider: hexColor}, theme, false)}
        onCopy={(theme) => copyOtherColorConfig(config, "divider", theme)}
      />
    </ConfigSection>
  );
}
