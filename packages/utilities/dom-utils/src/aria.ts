import type {FocusRingAria} from "react-aria";

import {HTMLAttributes} from "react";

export interface IFocusRingAria<T extends object> extends FocusRingAria {
  focusProps: Omit<HTMLAttributes<HTMLElement>, keyof T>;
}
