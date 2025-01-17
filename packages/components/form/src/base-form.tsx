/*
 * This file is copied from https://github.dev/adobe/react-spectrum/blob/2d4521098a3b4999f2e98b4d52d22483ee3451c8/packages/react-aria-components/src/Form.tsx
 * We copied this internally to avoid installing the complete react-aria-components package.
 */

import type {FormProps as SharedFormProps} from "@react-types/form";

import {FormValidationContext} from "@react-stately/form";
import React, {createContext, ForwardedRef, forwardRef, useMemo} from "react";
import {form} from "@heroui/theme";

import {ContextValue, DOMProps, useContextProps} from "./utils";

export interface FormProps extends SharedFormProps, DOMProps {
  /**
   * Whether to use native HTML form validation to prevent form submission
   * when a field value is missing or invalid, or mark fields as required
   * or invalid via ARIA.
   * @default 'native'
   */
  validationBehavior?: "aria" | "native";
}

export const FormContext = createContext<ContextValue<FormProps, HTMLFormElement>>(null);

/**
 * A form is a group of inputs that allows users to submit data to a server,
 * with support for providing field validation errors.
 */
export const Form = forwardRef(function Form(props: FormProps, ref: ForwardedRef<HTMLFormElement>) {
  [props, ref] = useContextProps(props, ref, FormContext);
  let {validationErrors, validationBehavior = "native", children, className, ...domProps} = props;

  const styles = useMemo(() => form({className}), [className]);

  return (
    <form noValidate={validationBehavior !== "native"} {...domProps} ref={ref} className={styles}>
      <FormContext.Provider value={{...props, validationBehavior}}>
        <FormValidationContext.Provider value={validationErrors ?? {}}>
          {children}
        </FormValidationContext.Provider>
      </FormContext.Provider>
    </form>
  );
});
