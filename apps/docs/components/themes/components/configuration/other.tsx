import {useContext} from "react";

import {setOtherCssParams} from "../../css-vars";
import {ConfigContext} from "../../provider";
import {Config} from "../../types";
import {ConfigSection} from "../config-section";
import {NumberInput} from "../number-input";

interface OtherProps {
  config: Config;
}

export function Other({config}: OtherProps) {
  const {setOtherParams} = useContext(ConfigContext);

  return (
    <ConfigSection cols={1} title="Other">
      <NumberInput
        label="Disabled opacity (0-1)"
        value={config.layout.otherParams.disabledOpacity}
        onChange={(value) => {
          setOtherParams({disabledOpacity: value});
          setOtherCssParams("disabledOpacity", value);
        }}
      />
      <NumberInput
        label="Divider weight (px)"
        value={config.layout.otherParams.dividerWeight}
        onChange={(value) => {
          setOtherParams({dividerWeight: value});
          setOtherCssParams("dividerWeight", value);
        }}
      />
      <NumberInput
        label="Hover opacity (0-1)"
        value={config.layout.otherParams.hoverOpacity}
        onChange={(value) => {
          setOtherParams({hoverOpacity: value});
          setOtherCssParams("hoverOpacity", value);
        }}
      />
    </ConfigSection>
  );
}
