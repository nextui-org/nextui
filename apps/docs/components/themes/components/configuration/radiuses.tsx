import {setCssRadius} from "../../css-vars";
import {useThemeBuilder} from "../../provider";
import {Config} from "../../types";
import {ConfigSection} from "../config-section";
import {NumberInput} from "../number-input";

interface RadiusesProps {
  config: Config;
}

export function Radiuses({config}: RadiusesProps) {
  const {setRadius} = useThemeBuilder();

  return (
    <ConfigSection cols={3} title="Radius (rem)">
      <NumberInput
        label="Small"
        value={config.layout.radius.small}
        onChange={(value) => {
          setRadius({small: value});
          setCssRadius("small", value);
        }}
      />
      <NumberInput
        label="Medium"
        value={config.layout.radius.medium}
        onChange={(value) => {
          setRadius({medium: value});
          setCssRadius("medium", value);
        }}
      />
      <NumberInput
        label="Large"
        value={config.layout.radius.large}
        onChange={(value) => {
          setRadius({large: value});
          setCssRadius("large", value);
        }}
      />
    </ConfigSection>
  );
}
