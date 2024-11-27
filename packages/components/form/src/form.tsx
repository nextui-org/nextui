import {useProviderContext} from "@nextui-org/system";

import {Form as AriaForm, FormProps} from "./base-form";

export const Form = (props: FormProps) => {
  const globalContext = useProviderContext();
  const validationBehavior =
    props.validationBehavior ?? globalContext?.validationBehavior ?? "aria";

  return <AriaForm {...props} validationBehavior={validationBehavior} />;
};
