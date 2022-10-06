import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import {StyledSnippet} from "./snippet.styles";
import {UseSnippetProps, useSnippet} from "./use-snippet";

export interface SnippetProps extends UseSnippetProps {}

const Snippet = forwardRef<SnippetProps, "div">((props, ref) => {
  const {className, ...otherProps} = useSnippet(props);

  const domRef = useDOMRef(ref);

  return (
    <StyledSnippet ref={domRef} className={clsx("nextui-snippet", className)} {...otherProps} />
  );
});

if (__DEV__) {
  Snippet.displayName = "NextUI.Snippet";
}

Snippet.toString = () => ".nextui-snippet";

export default Snippet;
