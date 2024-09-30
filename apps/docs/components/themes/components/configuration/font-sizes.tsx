import {setCssFontSize} from "../../css-vars";
import {useThemeBuilder} from "../../provider";
import {Config, ConfigLayout} from "../../types";
import {ConfigSection} from "../config-section";
import {NumberInput} from "../number-input";

interface FontSizesProps {
  config: Config;
}

export function FontSizes({config}: FontSizesProps) {
  return (
    <ConfigSection title="Font size (rem)">
      <FontSizeInput label="Tiny" type="tiny" value={config.layout.fontSize.tiny} />
      <FontSizeInput label="Small" type="small" value={config.layout.fontSize.small} />
      <FontSizeInput label="Medium" type="medium" value={config.layout.fontSize.medium} />
      <FontSizeInput label="Large" type="large" value={config.layout.fontSize.large} />
    </ConfigSection>
  );
}

interface FontSizeInputProps {
  label: string;
  type: keyof ConfigLayout["fontSize"];
  value: string;
}

function FontSizeInput({label, type, value}: FontSizeInputProps) {
  const {setFontSize} = useThemeBuilder();

  return (
    <NumberInput
      label={label}
      value={value}
      onChange={(value) => {
        setFontSize({[type]: value});
        setCssFontSize(type, value);
      }}
    />
  );
}
