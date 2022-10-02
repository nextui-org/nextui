import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {__DEV__} from "@nextui-org/shared-utils";

import {StyledContainer} from "./container.styles";
import {useContainer, UseContainerProps} from "./use-container";

export interface ContainerProps extends UseContainerProps {}

const Container = forwardRef<ContainerProps, "div">((props, ref) => {
  const {containerCss, css, fluid, responsive, ...otherProps} = useContainer(props);

  const domRef = useDOMRef(ref);

  return (
    <StyledContainer
      ref={domRef}
      css={{
        ...containerCss,
        ...css,
      }}
      fluid={fluid}
      responsive={responsive}
      {...otherProps}
    />
  );
});

if (__DEV__) {
  Container.displayName = "NextUI.Container";
}

Container.toString = () => ".nextui-container";

export default Container;
