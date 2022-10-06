import {HTMLNextUIProps} from "@nextui-org/system";

export interface UseSnippetProps extends HTMLNextUIProps<"div"> {}

export function useSnippet(props: UseSnippetProps) {
  const {...otherProps} = props;

  return {...otherProps};
}

export type UseSnippetReturn = ReturnType<typeof useSnippet>;
