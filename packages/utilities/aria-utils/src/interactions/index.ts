import type {FocusRingAria} from "@react-aria/focus";
import type {PressResult} from "@react-aria/interactions";
import type {HTMLAttributes} from "react";

export interface IFocusRingAria<T extends object> extends FocusRingAria {
  focusProps: Omit<HTMLAttributes<HTMLElement>, keyof T>;
}

export interface IPressResult<T extends object> extends PressResult {
  pressProps: Omit<React.HTMLAttributes<HTMLElement>, keyof T>;
}
