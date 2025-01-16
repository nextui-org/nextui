import {setCssBorderWidth} from "../../css-vars";
import {useThemeBuilder} from "../../provider";
import {Config} from "../../types";
import {ConfigSection} from "../config-section";
import {NumberInput} from "../number-input";

interface BorderWidthsProps {
  config: Config;
}

export function BorderWidths({config}: BorderWidthsProps) {
  const {setBorderWidth} = useThemeBuilder();

  const handleChange = (key: keyof Config["layout"]["borderWidth"], value: string) => {
    setBorderWidth({[key]: value});
    setCssBorderWidth(key, value);
  };

  return (
    <ConfigSection cols={3} title="Border width (px)">
      <NumberInput
        label="Small"
        value={config.layout.borderWidth.small}
        onChange={(value) => handleChange("small", value)}
      />
      <NumberInput
        label="Medium"
        value={config.layout.borderWidth.medium}
        onChange={(value) => handleChange("medium", value)}
      />
      <NumberInput
        label="Large"
        value={config.layout.borderWidth.large}
        onChange={(value) => handleChange("large", value)}
      />
    </ConfigSection>
  );
}
