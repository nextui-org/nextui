import type {AriaCheckboxGroupProps} from "@react-types/checkbox";
import type {Orientation} from "@react-types/shared";
import type {CSS} from "../theme/stitches.config";
import type {NormalSizes, NormalColors, SimpleColors} from "../utils/prop-types";

import {useCheckboxGroup as useReactAriaCheckboxGroup} from "@react-aria/checkbox";
import {useCheckboxGroupState} from "@react-stately/checkbox";
import {mergeProps} from "@react-aria/utils";
import React, {useMemo} from "react";

import useId from "../use-id";

interface Props extends AriaCheckboxGroupProps {
  size?: NormalSizes;
  color?: NormalColors;
  labelColor?: SimpleColors;
  orientation?: Orientation;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type UseCheckboxGroupProps = Props & NativeAttrs & {css?: CSS};

/**
 * @internal
 */
export const useCheckboxGroup = (props: UseCheckboxGroupProps = {}) => {
  const {
    size = "md",
    color = "default",
    labelColor = "default",
    orientation = "vertical",
    css,
    ...otherProps
  } = props;

  const labelId = useId();
  const id = useId(props?.id);

  const groupState = useCheckboxGroupState(otherProps);

  const checkboxGroup = useReactAriaCheckboxGroup(otherProps, groupState);

  const groupProps = useMemo(() => {
    return mergeProps(checkboxGroup.groupProps, {id, "aria-labelledby": labelId});
  }, [checkboxGroup.groupProps, id, labelId]);

  const labelProps = useMemo(() => {
    return mergeProps(checkboxGroup.labelProps, {id: labelId});
  }, [checkboxGroup.labelProps, labelId]);

  return {
    css,
    size,
    orientation,
    color,
    labelColor,
    groupState,
    labelProps,
    groupProps,
  };
};

export type UseCheckboxGroupReturn = Omit<ReturnType<typeof useCheckboxGroup>, "css">;
