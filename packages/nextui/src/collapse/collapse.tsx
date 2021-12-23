import React, { useEffect, useMemo } from 'react';
import CollapseIcon from './collapse-icon';
import Expand from '../utils/expand';
import { useCollapseContext } from './collapse-context';
import useCurrentState from '../use-current-state';
import CollapseGroup from './collapse-group';
import useWarning from '../use-warning';
import useTheme from '../use-theme';
import { getId } from '../utils/collections';
import { CSS } from '../theme/stitches.config';
import useKeyboard, { KeyCode } from '../use-keyboard';
import {
  StyledCollapse,
  StyledCollapseView,
  CollapseVariantsProps,
  StyledCollapseContent
} from './collapse.styles';
import clsx from '../utils/clsx';
import withDefaults from '../utils/with-defaults';

interface Props {
  title: React.ReactNode | string;
  subtitle?: React.ReactNode | string;
  divider?: boolean;
  animated?: boolean;
  bordered?: boolean;
  arrowIcon?: React.ReactNode;
  contentLeft?: React.ReactNode;
  initialExpanded?: boolean;
  showArrow?: boolean;
  shadow?: boolean;
  index?: number;
  disabled?: boolean;
  preventDefault?: boolean;
  onChange?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index?: number | undefined,
    value?: boolean
  ) => void;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  shadow: false,
  divider: true,
  bordered: false,
  showArrow: true,
  animated: true,
  disabled: false,
  preventDefault: true,
  initialExpanded: false
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type CollapseProps = Props &
  typeof defaultProps &
  CollapseVariantsProps &
  NativeAttrs & { css?: CSS };

const preClass = 'nextui-collapse';

const Collapse: React.FC<React.PropsWithChildren<CollapseProps>> = ({
  children,
  title,
  subtitle,
  initialExpanded,
  shadow,
  className,
  divider,
  arrowIcon,
  showArrow,
  disabled,
  onChange,
  bordered,
  contentLeft,
  preventDefault,
  animated: animatedProp,
  borderWeight,
  index,
  ...props
}) => {
  const [visible, setVisible, visibleRef] =
    useCurrentState<boolean>(initialExpanded);

  const { isDark } = useTheme();

  const {
    values,
    divider: groupDivider,
    animated: groupAnimated,
    updateValues
  } = useCollapseContext();

  if (!title) {
    useWarning('"title" is required.', 'Collapse');
  }

  useEffect(() => {
    if (!values.length) return;
    const isActive = !!values.find((item) => item === index);
    setVisible(isActive);
  }, [values.join(',')]);

  const arrowComponent = useMemo(() => {
    if (!showArrow) return null;
    return arrowIcon ? arrowIcon : <CollapseIcon />;
  }, [arrowIcon, showArrow]);

  const withDivider = groupDivider === undefined ? divider : groupDivider;

  const animated = useMemo(() => {
    return groupAnimated === undefined ? animatedProp : groupAnimated;
  }, [groupAnimated, animatedProp]);

  const { ariaLabelledById, ariaControlId } = useMemo(() => {
    const nextuiId = getId();
    return {
      ariaLabelledById: `${preClass}-button-${nextuiId}`,
      ariaControlId: `${preClass}-${nextuiId}`
    };
  }, []);

  const handleChange = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (disabled) return;
    const next = !visibleRef.current;
    setVisible(next);
    updateValues && updateValues(index, next);
    onChange && onChange(event, index, next);
  };

  const { bindings } = useKeyboard(
    (event: any) => {
      handleChange(event);
    },
    [KeyCode.Enter, KeyCode.Space],
    {
      disableGlobalEvent: true,
      preventDefault
    }
  );

  const getState = useMemo(() => {
    return visible ? 'open' : 'closed';
  }, [visible]);

  return (
    <StyledCollapse
      tabIndex={disabled ? -1 : 0}
      shadow={shadow}
      bordered={bordered}
      animated={animated}
      divider={withDivider}
      borderWeight={borderWeight}
      visible={visible}
      data-state={getState}
      className={clsx(className, preClass, `${preClass}--${getState}`)}
      isDark={isDark}
      {...props}
      {...bindings}
    >
      <StyledCollapseView
        role="button"
        tabIndex={-1}
        id={ariaLabelledById}
        className={`${preClass}-view`}
        data-state={getState}
        disabled={disabled}
        aria-disabled={disabled}
        aria-expanded={visible}
        aria-controls={ariaControlId}
        onClick={handleChange}
      >
        <div className={clsx(`${preClass}-title`)}>
          {contentLeft && (
            <div className={`${preClass}-title-content-left`}>
              {contentLeft}
            </div>
          )}
          <div className={`${preClass}-title-content`}>
            {React.isValidElement(title) ? title : <h3>{title}</h3>}
            {subtitle && (
              <div className={`${preClass}-subtitle`}>{subtitle}</div>
            )}
          </div>
          <div className={`${preClass}-title-content-right`}>
            {arrowComponent}
          </div>
        </div>
      </StyledCollapseView>
      <Expand isExpanded={visible} animated={animated}>
        <StyledCollapseContent
          role="region"
          tabIndex={-1}
          id={ariaControlId}
          aria-labelledby={ariaLabelledById}
          className={`${preClass}-content`}
        >
          {children}
        </StyledCollapseContent>
      </Expand>
    </StyledCollapse>
  );
};

Collapse.toString = () => '.nextui-collapse';

type CollapseComponent<P = {}> = React.FC<P> & {
  Group: typeof CollapseGroup;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  CollapseVariantsProps &
  NativeAttrs;

export default withDefaults(
  Collapse,
  defaultProps
) as CollapseComponent<ComponentProps>;
