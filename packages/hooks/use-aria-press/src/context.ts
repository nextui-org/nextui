import {FocusableElement} from "@react-types/shared";
import React, {MutableRefObject} from "react";

import {PressProps} from "./types";

interface IPressResponderContext extends PressProps {
  register(): void;
  ref?: MutableRefObject<FocusableElement> | undefined;
}

// @ts-ignore
export const PressResponderContext = React.createContext<IPressResponderContext>(null);
PressResponderContext.displayName = "PressResponderContext";
