import Loading from "./loading";

export type {LoadingProps} from "./loading";
export type {SpinnerProps} from "./spinner";

// export styled components
export {
  StyledLoadingContainer,
  StyledSpinnerContainer,
  StyledSpinner,
  StyledSpinnerSpan,
  StyledLoading,
  StyledLoadingLabel,
} from "./loading.styles";

export type {
  LoadingContainerVariantsProps,
  LoadingVariantsProps,
  SpinnerVariantsProps,
  SpinnerContainerVariantsProps,
  LoadingLabelVariantsProps,
} from "./loading.styles";

export {default as Spinner} from "./spinner";
export default Loading;
