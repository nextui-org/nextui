import {forwardRef, HTMLNextUIProps, NextUI} from "@nextui-org/system";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

export interface CollapseIconProps extends HTMLNextUIProps<"svg"> {}

const CollapseIcon = forwardRef<CollapseIconProps, "svg">((props, ref) => {
  const {className, css, ...otherProps} = props;

  return (
    <NextUI.Svg
      ref={ref}
      aria-hidden="true"
      className={clsx('nextui-collapse-icon', className)}
      css={{
        opacity: 0.7,
        ...css,
      }}
      fill="none"
      focusable="false"
      height="20"
      role="presentation"
      stroke="currentColor"
      viewBox="0 0 24 24"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path d="M15.5 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </NextUI.Svg>
  );
});

if (__DEV__) {
  CollapseIcon.displayName = "NextUI.CollapseIcon";
}

CollapseIcon.toString = () => ".nextui-collapse-icon";

export default CollapseIcon;
