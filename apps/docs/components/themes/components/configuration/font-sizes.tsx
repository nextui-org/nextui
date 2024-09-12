import {setCssFontSize} from "../../css-vars";
import {useThemeBuilder} from "../../provider";
import {Config} from "../../types";
import {ConfigSection} from "../config-section";
import {NumberInput} from "../number-input";

interface FontSizesProps {
  config: Config;
}

export function FontSizes({config}: FontSizesProps) {
  const {setFontSize} = useThemeBuilder();

  return (
    <ConfigSection title="Font size (rem)">
      <NumberInput
        label="Tiny"
        value={config.layout.fontSize.tiny}
        onChange={(value) => {
          setFontSize({tiny: value});
          setCssFontSize("tiny", value);
        }}
      />
      <NumberInput
        label="Small"
        value={config.layout.fontSize.small}
        onChange={(value) => {
          setFontSize({small: value});
          setCssFontSize("small", value);
        }}
      />
      <NumberInput
        label="Medium"
        value={config.layout.fontSize.medium}
        onChange={(value) => {
          setFontSize({medium: value});
          setCssFontSize("medium", value);
        }}
      />
      <NumberInput
        label="Large"
        value={config.layout.fontSize.large}
        onChange={(value) => {
          setFontSize({large: value});
          setCssFontSize("large", value);
        }}
      />
    </ConfigSection>
  );
}
