"use client";

import type {ErrorMessageVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {TextProps} from "react-aria-components/Text";

import {errorMessageVariants} from "@heroui/styles";
import {useMemo} from "react";
import {Text} from "react-aria-components/Text";

import {useHasTextSlot} from "../../utils/use-has-text-slot";

/* -------------------------------------------------------------------------------------------------
 * Error Message Root
 * -----------------------------------------------------------------------------------------------*/
interface ErrorMessageRootProps
  extends ComponentPropsWithRef<typeof Text>, TextProps, ErrorMessageVariants {}

const ErrorMessageRoot = ({children, className, ...rest}: ErrorMessageRootProps) => {
  const resolvedClassName = useMemo(() => errorMessageVariants({className}), [className]);
  const hasErrorMessage = useHasTextSlot("errorMessage");

  if (!hasErrorMessage) {
    return null;
  }

  return (
    <Text className={resolvedClassName} data-slot="error-message" slot="errorMessage" {...rest}>
      {children}
    </Text>
  );
};

ErrorMessageRoot.displayName = "HeroUI.ErrorMessage";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ErrorMessageRoot};

export type {ErrorMessageRootProps};
