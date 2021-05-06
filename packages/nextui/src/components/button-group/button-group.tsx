import React, { useMemo } from 'react';
import useTheme from '@hooks/use-theme';
import withDefaults from '@utils/with-defaults';
import { NormalSizes, ButtonColors } from '@utils/prop-types';
import { ButtonGroupContext, ButtonGroupConfig } from './button-group-context';
import { NextUIThemesPalette } from '@theme/index';

interface Props {
  disabled?: boolean;
  vertical?: boolean;
  bordered?: boolean;
  size?: NormalSizes;
  type?: ButtonColors;
  className?: string;
}

const defaultProps = {
  disabled: false,
  vertical: false,
  bordered: false,
  size: 'medium' as NormalSizes,
  type: 'default' as ButtonColors,
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
  const colors: { [key in ButtonColors]?: string } = {
    primary: palette.border,
    success: palette.success,
    secondary: palette.secondary,
    error: palette.error,
    warning: palette.warning,
  };
  const withoutLightType = color?.replace('-light', '') as ButtonColors;
  return colors[withoutLightType] || (colors.primary as string);
};

const ButtonGroup: React.FC<React.PropsWithChildren<ButtonGroupProps>> = (
  groupProps
) => {
  const theme = useTheme();
  const {
    disabled,
    size,
    type,
    bordered,
    vertical,
    children,
    className,
    ...props
  } = groupProps;
  const initialValue = useMemo<ButtonGroupConfig>(
    () => ({
      disabled,
      size,
      type,
      bordered,
      isButtonGroup: true,
    }),
    [disabled, size, type]
  );

  const border = useMemo(() => {
    return getGroupBorderColors(theme.palette, groupProps);
  }, [theme, type, disabled, bordered]);

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
            border-radius: ${theme.layout.radius};
            margin: ${theme.layout.gapQuarter};
            border: 1px solid ${border};
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
            border-left: 1px solid ${border};
          }
          .horizontal :global(.button:not(:last-child)) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .vertical :global(.button:not(:first-child)) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: 1px solid ${border};
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
