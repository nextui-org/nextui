/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  HTMLAttributes,
  InputHTMLAttributes,
  RefObject,
} from "react";
import {AriaToggleButtonProps} from "@react-types/button";
import {chain} from "@react-aria/utils";
import {DOMAttributes} from "@react-types/shared";
import {mergeProps} from "@react-aria/utils";
import {ToggleState} from "@react-stately/toggle";
import {ButtonAria, useAriaButton} from "@nextui-org/use-aria-button";

export type {AriaToggleButtonProps};

// Order with overrides is important: 'button' should be default
export function useAriaToggleButton(
  props: AriaToggleButtonProps<"button">,
  state: ToggleState,
  ref: RefObject<HTMLButtonElement>,
): ButtonAria<ButtonHTMLAttributes<HTMLButtonElement>>;
export function useAriaToggleButton(
  props: AriaToggleButtonProps<"a">,
  state: ToggleState,
  ref: RefObject<HTMLAnchorElement>,
): ButtonAria<AnchorHTMLAttributes<HTMLAnchorElement>>;
export function useAriaToggleButton(
  props: AriaToggleButtonProps<"div">,
  state: ToggleState,
  ref: RefObject<HTMLDivElement>,
): ButtonAria<HTMLAttributes<HTMLDivElement>>;
export function useAriaToggleButton(
  props: AriaToggleButtonProps<"input">,
  state: ToggleState,
  ref: RefObject<HTMLInputElement>,
): ButtonAria<InputHTMLAttributes<HTMLInputElement>>;
export function useAriaToggleButton(
  props: AriaToggleButtonProps<"span">,
  state: ToggleState,
  ref: RefObject<HTMLSpanElement>,
): ButtonAria<HTMLAttributes<HTMLSpanElement>>;
export function useAriaToggleButton(
  props: AriaToggleButtonProps<ElementType>,
  state: ToggleState,
  ref: RefObject<Element>,
): ButtonAria<DOMAttributes>;
/**
 * Provides the behavior and accessibility implementation for a toggle button component.
 * ToggleButtons allow users to toggle a selection on or off, for example switching between two states or modes.
 */
export function useAriaToggleButton(
  props: AriaToggleButtonProps<ElementType>,
  state: ToggleState,
  ref: RefObject<any>,
): ButtonAria<HTMLAttributes<any>> {
  const {isSelected} = state;
  const {isPressed, buttonProps} = useAriaButton(
    {
      ...props,
      onPress: chain(state.toggle, props.onPress),
    },
    ref,
  );

  return {
    isPressed,
    buttonProps: mergeProps(buttonProps, {
      "aria-pressed": isSelected,
    }),
  };
}
