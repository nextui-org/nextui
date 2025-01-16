import {setCssLineHeight} from "../../css-vars";
import {useThemeBuilder} from "../../provider";
import {Config} from "../../types";
import {ConfigSection} from "../config-section";
import {NumberInput} from "../number-input";

interface LineHeightsProps {
  config: Config;
}

export function LineHeights({config}: LineHeightsProps) {
  const {setLineHeight} = useThemeBuilder();

  return (
    <ConfigSection title="Line height (rem)">
      <NumberInput
        label="Tiny"
        value={config.layout.lineHeight.tiny}
        onChange={(value) => {
          setLineHeight({tiny: value});
          setCssLineHeight("tiny", value);
        }}
      />
      <NumberInput
        label="Small"
        value={config.layout.lineHeight.small}
        onChange={(value) => {
          setLineHeight({small: value});
          setCssLineHeight("small", value);
        }}
      />
      <NumberInput
        label="Medium"
        value={config.layout.lineHeight.medium}
        onChange={(value) => {
          setLineHeight({medium: value});
          setCssLineHeight("medium", value);
        }}
      />
      <NumberInput
        label="Large"
        value={config.layout.lineHeight.large}
        onChange={(value) => {
          setLineHeight({large: value});
          setCssLineHeight("large", value);
        }}
      />
    </ConfigSection>
  );
}
