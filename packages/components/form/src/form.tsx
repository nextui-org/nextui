import type {ForwardedRef} from "react";

import {useProviderContext} from "@nextui-org/system";
import {forwardRef} from "react";

import {Form as AriaForm, FormProps} from "./base-form";

export const Form = forwardRef(function Form(props: FormProps, ref: ForwardedRef<HTMLFormElement>) {
  const globalContext = useProviderContext();
  const validationBehavior =
    props.validationBehavior ?? globalContext?.validationBehavior ?? "aria";

  return <AriaForm {...props} ref={ref} validationBehavior={validationBehavior} />;
});
