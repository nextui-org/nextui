import {useContext} from "react";

import {setCssBorderWidth} from "../../css-vars";
import {ConfigContext} from "../../provider";
import {Config} from "../../types";
import {ConfigSection} from "../config-section";
import {NumberInput} from "../number-input";

interface BorderWidthsProps {
  config: Config;
}

export function BorderWidths({config}: BorderWidthsProps) {
  const {setBorderWidth} = useContext(ConfigContext);

  return (
    <ConfigSection cols={3} title="Border width (px)">
      <NumberInput
        label="Small"
        value={config.layout.borderWidth.small}
        onChange={(value) => {
          setBorderWidth({small: value});
          setCssBorderWidth("small", value);
        }}
      />
      <NumberInput
        label="Medium"
        value={config.layout.borderWidth.medium}
        onChange={(value) => {
          setBorderWidth({medium: value});
          setCssBorderWidth("medium", value);
        }}
      />
      <NumberInput
        label="Large"
        value={config.layout.borderWidth.large}
        onChange={(value) => {
          setBorderWidth({large: value});
          setCssBorderWidth("large", value);
        }}
      />
    </ConfigSection>
  );
}
