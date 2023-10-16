import {forwardRef} from "@nextui-org/system";

import {UseBreadcrumbsProps, useBreadcrumbs} from "./use-breadcrumbs";

export interface BreadcrumbsProps extends UseBreadcrumbsProps {}

const Breadcrumbs = forwardRef<"div", BreadcrumbsProps>((props, ref) => {
  const {Component, domRef, children, styles, ...otherProps} = useBreadcrumbs({...props, ref});

  return (
    <Component ref={domRef} className={styles} {...otherProps}>
      {children}
    </Component>
  );
});

Breadcrumbs.displayName = "NextUI.Breadcrumbs";

export default Breadcrumbs;
