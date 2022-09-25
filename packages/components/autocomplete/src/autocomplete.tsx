import * as React from "react";
import {HTMLNextUIProps, forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {__DEV__} from "@nextui-org/shared-utils";

import { StyledAutocomplete } from "./autocomplete.styles";

export interface AutocompleteProps extends HTMLNextUIProps<"div"> {}

const Autocomplete = forwardRef<AutocompleteProps, "div">((props, ref) => {
  const domRef = useDOMRef(ref);

  return <StyledAutocomplete ref={domRef} />;
});

if (__DEV__) {
  Autocomplete.displayName = "NextUI.Autocomplete";
}

Autocomplete.toString = () => ".nextui-autocomplete";

export default Autocomplete;
