import React, {useMemo} from "react";

import {CSS} from "../theme/stitches.config";
import {NormalSizes, NormalColors, NormalWeights} from "../utils/prop-types";

import {ButtonGroupContext, ButtonGroupConfig} from "./button-group-context";
import StyledButtonGroup, {ButtonGroupVariantsProps} from "./button-group.styles";

interface Props {
  disabled?: boolean;
  bordered?: boolean;
  light?: boolean;
  flat?: boolean;
  shadow?: boolean;
  auto?: boolean;
  animated?: boolean;
  ripple?: boolean;
  rounded?: boolean;
  ghost?: boolean;
  borderWeight?: NormalWeights;
  size?: NormalSizes;
  color?: NormalColors;
  children?: React.ReactNode;
}

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type ButtonGroupProps = Props & ButtonGroupVariantsProps & NativeAttrs & {css?: CSS};

const ButtonGroup: React.FC<ButtonGroupProps> = (groupProps) => {
  const {
    disabled,
    size = "md" as NormalSizes,
    color = "default" as NormalColors,
    bordered,
    ghost,
    light,
    flat,
    shadow,
    auto,
    animated,
    rounded,
    ripple,
    borderWeight = "normal" as NormalWeights | undefined,
    children,
    ...props
  } = groupProps;

  const initialValue = useMemo<ButtonGroupConfig>(
    () => ({
      disabled,
      size,
      color,
      bordered,
      light,
      ghost,
      flat,
      shadow,
      auto,
      borderWeight,
      animated,
      rounded,
      ripple,
      isButtonGroup: true,
    }),
    [disabled, animated, size, ripple, color, bordered, light, ghost, flat, borderWeight],
  );

  return (
    <ButtonGroupContext.Provider value={initialValue}>
      <StyledButtonGroup
        bordered={bordered || ghost}
        gradient={groupProps.color === "gradient"}
        size={size}
        {...props}
      >
        {children}
      </StyledButtonGroup>
    </ButtonGroupContext.Provider>
  );
};

ButtonGroup.toString = () => ".nextui-button-group";

const MemoButtonGroup = React.memo(ButtonGroup);

export default MemoButtonGroup;
