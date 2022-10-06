import {nextui, forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

export interface SnippetIconProps extends HTMLNextUIProps<"svg"> {}

const SnippetIcon = forwardRef<SnippetIconProps, "div">((props, ref) => {
  const {className, ...otherProps} = props;

  const domRef = useDOMRef(ref);

  return (
    <nextui.svg ref={domRef} className={clsx("nextui-snippet-icon", className)} {...otherProps} />
  );
});

if (__DEV__) {
  SnippetIcon.displayName = "NextUI.SnippetIcon";
}

SnippetIcon.toString = () => ".nextui-SnippetIcon";

export default SnippetIcon;
