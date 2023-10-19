import {forwardRef} from "@nextui-org/system";

import {UseBreadcrumbItemProps, useBreadcrumbItem} from "./use-breadcrumb-item";

export interface BreadcrumbItemProps extends UseBreadcrumbItemProps {}

const Breadcrumbs = forwardRef<"li", BreadcrumbItemProps>((props, ref) => {
  const {
    Component,
    WrapperComponent,
    children,
    isLast,
    separator,
    startContent,
    endContent,
    getBaseProps,
    getItemProps,
    getSeparatorProps,
  } = useBreadcrumbItem({
    ...props,
    ref,
  });

  return (
    <WrapperComponent {...getBaseProps()}>
      <Component {...getItemProps()}>
        {startContent}
        {children}
        {endContent}
      </Component>
      {!isLast && <span {...getSeparatorProps()}>{separator}</span>}
    </WrapperComponent>
  );
});

Breadcrumbs.displayName = "NextUI.Breadcrumbs";

export default Breadcrumbs;
