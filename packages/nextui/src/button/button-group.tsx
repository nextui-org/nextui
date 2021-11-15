import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import withDefaults from '../utils/with-defaults';
import { DefaultProps } from '../utils/default-props';
import { NormalSizes, NormalColors, NormalWeights } from '../utils/prop-types';
import { ButtonGroupContext, ButtonGroupConfig } from './button-group-context';
import { getGroupBorder } from './styles';
import { getSpacingsStyles } from '../utils/styles';
import { getNormalRadius } from '../utils/dimensions';
import clsx from '../utils/clsx';

interface Props extends DefaultProps {
  disabled?: boolean;
  vertical?: boolean;
  bordered?: boolean;
  light?: boolean;
  flat?: boolean;
  shadow?: boolean;
  auto?: boolean;
  animated?: boolean;
  rounded?: boolean;
  ghost?: boolean;
  borderWeight?: NormalWeights;
  size?: NormalSizes;
  color?: NormalColors;
  className?: string;
}

const defaultProps = {
  disabled: false,
  vertical: false,
  bordered: false,
  light: false,
  flat: false,
  shadow: false,
  auto: false,
  animated: false,
  rounded: false,
  ghost: false,
  borderWeight: 'normal' as NormalWeights | undefined,
  size: 'md' as NormalSizes,
  color: 'default' as NormalColors,
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type ButtonGroupProps = Props & typeof defaultProps & NativeAttrs;

const ButtonGroup: React.FC<React.PropsWithChildren<ButtonGroupProps>> = (
  groupProps
) => {
  const theme = useTheme();
  const {
    disabled,
    size,
    color,
    bordered,
    ghost,
    light,
    flat,
    shadow,
    auto,
    animated,
    rounded,
    vertical,
    children,
    className,
    style,
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
      animated,
      rounded,
      isButtonGroup: true
    }),
    [disabled, size, color, bordered, light, ghost, flat]
  );

  const spacingStyles = getSpacingsStyles(theme, props);

  const { color: borderColor, width: borderWidth } = useMemo(() => {
    return getGroupBorder(theme.palette, groupProps);
  }, [theme, disabled, bordered]);

  const radius = useMemo(() => getNormalRadius(size, rounded), [size, rounded]);

  // to avoid passing borderweight prop to the html button element
  delete props.borderWeight;

  return (
    <ButtonGroupContext.Provider value={initialValue}>
      <div
        className={clsx(
          'nextui-button-group',
          {
            'nextui-button-group-vertical': vertical,
            'nextui-button-group-horizontal': !vertical,
            'nextui-button-group-gradient': groupProps.color === 'gradient'
          },
          className
        )}
        style={{ ...style, ...spacingStyles }}
        {...props}
      >
        {children}
        <style jsx>{`
          .nextui-button-group {
            display: inline-flex;
            border-radius: ${radius};
            margin: calc(${theme.spacing.sm} * 0.5);
            border: ${borderWidth} solid ${borderColor};
            background-color: transparent;
            height: min-content;
          }
          .nextui-button-group :global(.nextui-button .nextui-button-text) {
            top: 0;
          }
          .nextui-button-group :global(.nextui-button) {
            border: none;
          }
          .nextui-button-group-vertical {
            flex-direction: column;
          }
          .nextui-button-group-horizontal
            :global(.nextui-button:not(:first-child)) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: ${borderWidth} solid ${borderColor};
          }
          .nextui-button-group-horizontal
            :global(.nextui-button:not(:first-child):before) {
            border-radius: 0;
          }
          .nextui-button-group-horizontal
            :global(.nextui-button:not(:last-child)) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .nextui-button-group-horizontal
            :global(.nextui-button:not(:last-child):before) {
            border-radius: 0;
          }
          .nextui-button-group-gradient.nextui-button-group-horizontal
            :global(.nextui-button:not(:last-child):not(:first-child)) {
            padding-left: 0 !important;
            filter: hue-rotate(310deg);
          }
          .nextui-button-group-gradient.nextui-button-group-horizontal
            :global(.nextui-button:last-child) {
            filter: hue-rotate(250deg);
            padding-left: 0 !important;
          }
          .nextui-button-group-gradient.nextui-button-group-vertical
            :global(.nextui-button:not(:last-child):not(:first-child)) {
            padding-top: 0 !important;
          }
          .nextui-button-group-gradient.nextui-button-group-vertical
            :global(.nextui-button:last-child) {
            padding-top: 0 !important;
          }
          .nextui-button-group-vertical
            :global(.nextui-button:not(:first-child)) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: ${borderWidth} solid ${borderColor};
          }
          .nextui-button-group-vertical
            :global(.nextui-button:not(:first-child):before) {
            border-radius: 0;
          }
          .nextui-button-group-vertical
            :global(.nextui-button:not(:last-child)) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }

          .nextui-button-group-vertical
            :global(.nextui-button:not(:last-child):before) {
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
