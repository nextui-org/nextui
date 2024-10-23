import {Form as AriaForm, FormProps} from "react-aria-components";
import {useProviderContext} from "@nextui-org/system";

export const Form = (props: FormProps) => {
  const globalContext = useProviderContext();
  const validationBehavior =
    props.validationBehavior ?? globalContext?.validationBehavior ?? "aria";

  return <AriaForm {...props} validationBehavior={validationBehavior} />;
};
