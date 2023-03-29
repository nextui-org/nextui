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

import {useId} from "react";
import {AriaLabelingProps, DOMAttributes, DOMProps, LabelableProps} from "@react-types/shared";
import {ElementType, LabelHTMLAttributes} from "react";
import {useLabels} from "@react-aria/utils";

export interface LabelAriaProps extends LabelableProps, DOMProps, AriaLabelingProps {
  /**
   * The HTML element used to render the label, e.g. 'label', or 'span'.
   * @default 'label'
   */
  labelElementType?: ElementType;
}

export interface LabelAria {
  /** Props to apply to the label container element. */
  labelProps: DOMAttributes | LabelHTMLAttributes<HTMLLabelElement>;
  /** Props to apply to the field container element being labeled. */
  fieldProps: AriaLabelingProps & DOMProps;
}

/**
 * Provides the accessibility implementation for labels and their associated elements.
 * Labels provide context for user inputs.
 * @param props - The props for labels and fields.
 */
export function useLabel(props: LabelAriaProps): LabelAria {
  let {
    label,
    id: idProp,
    "aria-labelledby": ariaLabelledby,
    "aria-label": ariaLabel,
    labelElementType = "label",
  } = props;

  const reactId = useId();
  const id = idProp || reactId;
  const labelId = useId();

  let labelProps = {};

  if (label) {
    ariaLabelledby = ariaLabelledby ? `${ariaLabelledby} ${labelId}` : labelId;
    labelProps = {
      id: labelId,
      htmlFor: labelElementType === "label" ? id : undefined,
    };
  } else if (!ariaLabelledby && !ariaLabel) {
    // eslint-disable-next-line no-console
    console.warn(
      "If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility",
    );
  }

  const fieldProps = useLabels({
    id,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
  });

  return {
    labelProps,
    fieldProps,
  };
}
