import {forwardRef} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, __DEV__} from "@nextui-org/shared-utils";

import {StyledLoadingContainer, StyledLoading, StyledLoadingLabel} from "./loading.styles";
import {UseLoadingProps, useLoading} from "./use-loading";
import Spinner from "./variants/spinner";

export interface LoadingProps extends UseLoadingProps {}

const Loading = forwardRef<LoadingProps, "div">((props, ref) => {
  const {
    css,
    containerCss,
    gradientCSS,
    children,
    size,
    type,
    ariaLabel,
    loadingColor,
    labelColor,
    className,
    ...otherProps
  } = useLoading(props);

  const domRef = useDOMRef(ref);

  return (
    <StyledLoadingContainer
      ref={domRef}
      className={clsx("nextui-loading-container", className)}
      css={{
        $$loadingColor: loadingColor,
        $$labelColor: labelColor,
        ...containerCss,
      }}
      {...otherProps}
    >
      {type === "spinner" ? (
        <Spinner aria-label={ariaLabel} css={css} size={size} />
      ) : (
        <StyledLoading
          aria-label={ariaLabel}
          className={clsx("nextui-loading", `nextui-loading-${type}`)}
          css={{
            ...css,
            ...gradientCSS,
          }}
          size={size}
          type={type}
        >
          <i className="_1" />
          <i className="_2" />
          <i className="_3" />
        </StyledLoading>
      )}
      {children && (
        <StyledLoadingLabel className="nextui-loading-label" size={size}>
          {children}
        </StyledLoadingLabel>
      )}
    </StyledLoadingContainer>
  );
});

if (__DEV__) {
  Loading.displayName = "NextUI.Loading";
}

Loading.toString = () => ".nextui-loading";

export default Loading;
