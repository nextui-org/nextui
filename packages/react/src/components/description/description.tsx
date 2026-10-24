"use client";

import type {DescriptionVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {TextProps} from "react-aria-components/Text";

import {descriptionVariants} from "@heroui/styles";
import {useMemo} from "react";
import {Text} from "react-aria-components/Text";

import {useHasTextSlot} from "../../utils/use-has-text-slot";

/* -------------------------------------------------------------------------------------------------
 * Description Root
 * -----------------------------------------------------------------------------------------------*/
interface DescriptionRootProps
  extends ComponentPropsWithRef<typeof Text>, TextProps, DescriptionVariants {}

const DescriptionRoot = ({children, className, ...rest}: DescriptionRootProps) => {
  const resolvedClassName = useMemo(() => descriptionVariants({className}), [className]);
  const hasDescription = useHasTextSlot("description");

  if (!hasDescription) {
    return null;
  }

  return (
    <Text className={resolvedClassName} data-slot="description" slot="description" {...rest}>
      {children}
    </Text>
  );
};

DescriptionRoot.displayName = "HeroUI.Description";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {DescriptionRoot};

export type {DescriptionRootProps};
