import React, { useMemo } from 'react';
import useTheme from '@hooks/use-theme';
import withDefaults from '@utils/with-defaults';
import { NormalSizes, NormalColors } from '@utils/prop-types';
import { ButtonGroupContext, ButtonGroupConfig } from './button-group-context';
import { NextUIThemesPalette } from '@theme/index';
import { getButtonRadius } from './styles';

interface Props {
  disabled?: boolean;
  vertical?: boolean;
  bordered?: boolean;
  light?: boolean;
  flattened?: boolean;
  loading?: boolean;
  shadow?: boolean;
  auto?: boolean;
  animated?: boolean;
  rounded?: boolean;
  size?: NormalSizes;
  color?: NormalColors;
  className?: string;
}

const defaultProps = {
  disabled: false,
  vertical: false,
  bordered: false,
  light: false,
  flattened: false,
  loading: false,
  shadow: false,
  auto: false,
  animated: false,
  rounded: false,
  size: 'medium' as NormalSizes,
  color: 'default' as NormalColors,
  className: '',
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type ButtonGroupProps = Props & typeof defaultProps & NativeAttrs;

const getGroupBorderColors = (
  palette: NextUIThemesPalette,
  props: ButtonGroupProps
): string => {
  const { bordered, color } = props;
  if (!bordered && color !== 'primary') return palette.background;
  const colors: { [key in NormalColors]?: string } = {
    default: palette.primary,
    primary: palette.border,
    success: palette.success,
    secondary: palette.secondary,
    error: palette.error,
    warning: palette.warning,
  };
  return colors[color as NormalColors] || (colors.primary as string);
};

const ButtonGroup: React.FC<React.PropsWithChildren<ButtonGroupProps>> = (
  groupProps
) => {
  const theme = useTheme();
  const {
    disabled,
    size,
    color,
    bordered,
    light,
    flattened,
    loading,
    shadow,
    auto,
    animated,
    rounded,
    vertical,
    children,
    className,
    ...props
  } = groupProps;
  const initialValue = useMemo<ButtonGroupConfig>(
    () => ({
      disabled,
      size,
      color,
      bordered,
      light,
      flattened,
      loading,
      shadow,
      auto,
      animated,
      rounded,
      isButtonGroup: true,
    }),
    [disabled, light, size, color]
  );

  const border = useMemo(() => {
    return getGroupBorderColors(theme.palette, groupProps);
  }, [theme, color, disabled, bordered]);

  const radius = useMemo(() => getButtonRadius(size, rounded), [size, rounded]);

  return (
    <ButtonGroupContext.Provider value={initialValue}>
      <div
        className={`button-group ${
          vertical ? 'vertical' : 'horizontal'
        } ${className}`}
        {...props}
      >
        {children}
        <style jsx>{`
          .button-group {
            display: inline-flex;
            border-radius: ${radius};
            margin: ${theme.layout.gapQuarter};
            border: 2px solid ${border};
            background-color: transparent;
            overflow: hidden;
            height: min-content;
          }
          .vertical {
            flex-direction: column;
          }
          .button-group :global(.button) {
            border: none;
          }
          .button-group :global(.button .text) {
            top: 0;
          }
          .horizontal :global(.button:not(:first-child)) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: 2px solid ${border};
          }
          .horizontal :global(.button:not(:last-child)) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .vertical :global(.button:not(:first-child)) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: 2px solid ${border};
          }
          .vertical :global(.button:not(:last-child)) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        `}</style>
      </div>
    </ButtonGroupContext.Provider>
  );
};

const MemoButtonGroup = React.memo(ButtonGroup);

export default withDefaults(MemoButtonGroup, defaultProps);
