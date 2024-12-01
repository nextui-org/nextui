import React from "react";
import {RadioGroup, useRadio, VisuallyHidden, RadioProps, cn} from "@nextui-org/react";

export const CustomRadio = (props: RadioProps) => {
  const {
    Component,
    children,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center justify-between hover:bg-content2 flex-row-reverse",
        "max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-primary",
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">{description}</span>
        )}
      </div>
    </Component>
  );
};

export default function App() {
  return (
    <RadioGroup label="Plans">
      <CustomRadio description="Up to 20 items" value="free">
        Free
      </CustomRadio>
      <CustomRadio description="Unlimited items. $10 per month." value="pro">
        Pro
      </CustomRadio>
      <CustomRadio description="24/7 support. Contact us for pricing." value="enterprise">
        Enterprise
      </CustomRadio>
    </RadioGroup>
  );
}
