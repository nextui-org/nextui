import React, { useEffect, useCallback, useMemo } from 'react';
import CollapseIcon from './collapse-icon';
import useTheme from '../use-theme';
import Expand from '../utils/expand';
import { useCollapseContext } from './collapse-context';
import useCurrentState from '../use-current-state';
import CollapseGroup from './collapse-group';
import useWarning from '../use-warning';
import { NormalWeights } from '../utils/prop-types';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';
import { getNormalWeight } from '../utils/dimensions';
import { getId } from '../utils/collections';
import { getFocusStyles } from '../utils/styles';
import useKeyboard, { KeyCode } from '../use-keyboard';
import clsx from '../utils/clsx';

interface Props extends DefaultProps {
  title: React.ReactNode | string;
  subtitle?: React.ReactNode | string;
  divider?: boolean;
  animated?: boolean;
  bordered?: boolean;
  borderWeight?: NormalWeights;
  arrowIcon?: React.ReactNode;
  contentLeft?: React.ReactNode;
  initialExpanded?: boolean;
  showArrow?: boolean;
  shadow?: boolean;
  className?: string;
  index?: number;
  disabled?: boolean;
  onChange?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index?: number | undefined,
    value?: boolean
  ) => void;
}

const defaultProps = {
  className: '',
  shadow: false,
  divider: true,
  bordered: false,
  showArrow: true,
  animated: true,
  disabled: false,
  borderWeight: 'light' as NormalWeights,
  initialExpanded: false
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CollapseProps = Props & typeof defaultProps & NativeAttrs;

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
  style,
  animated: animatedProp,
  borderWeight: borderWeightProp,
  index,
  ...props
}) => {
  const theme = useTheme();
  const [visible, setVisible, visibleRef] =
    useCurrentState<boolean>(initialExpanded);

  const {
    values,
    divider: groupDivider,
    animated: groupAnimated,
    updateValues
  } = useCollapseContext();

  const spacingStyles = getSpacingsStyles(theme, props);

  if (!title) {
    useWarning('"title" is required.', 'Collapse');
  }

  useEffect(() => {
    if (!values.length) return;
    const isActive = !!values.find((item) => item === index);
    setVisible(isActive);
  }, [values.join(',')]);

  const { className: focusClassName, styles: focusStyles } =
    getFocusStyles(theme);

  const arrowComponent = useMemo(() => {
    if (!showArrow) return null;
    return arrowIcon ? arrowIcon : <CollapseIcon />;
  }, [arrowIcon, showArrow]);

  const borderWeight = useMemo(() => {
    const withDivider = groupDivider === undefined ? divider : groupDivider;
    return withDivider ? getNormalWeight(borderWeightProp) : '0px';
  }, [divider, groupDivider, borderWeightProp]);

  const animated = useMemo(() => {
    return groupAnimated === undefined ? animatedProp : groupAnimated;
  }, [groupAnimated, animatedProp]);

  const bgColor = useMemo(
    () =>
      theme.type === 'dark'
        ? theme.palette.accents_1
        : theme.palette.background,
    [theme.type]
  );

  const { ariaLabelledById, ariaControlId } = useMemo(() => {
    const nextuiId = getId();
    return {
      ariaLabelledById: `nextui-collapse-button-${nextuiId}`,
      ariaControlId: `nextui-collapse-${nextuiId}`
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
      disableGlobalEvent: true
    }
  );

  const getState = useCallback(() => {
    return visible ? 'open' : 'closed';
  }, [visible]);

  return (
    <div
      tabIndex={disabled ? -1 : 0}
      className={clsx(
        'nextui-collapse',
        {
          'nextui-collapse-shadow': shadow,
          'nextui-collapse-bordered': bordered
        },
        className,
        focusClassName
      )}
      data-state={getState()}
      style={{ ...style, ...spacingStyles }}
      {...props}
      {...bindings}
    >
      <div
        role="button"
        tabIndex={-1}
        id={ariaLabelledById}
        className={clsx('nextui-collapse-view', {
          'nextui-collapse-view-disabled': disabled,
          'nextui-collapse-animated': animated
        })}
        data-state={getState()}
        aria-disabled={disabled}
        aria-expanded={visible}
        aria-controls={ariaControlId}
        onClick={handleChange}
      >
        <div className={clsx('nextui-collapse-title')}>
          {contentLeft && (
            <div className="nextui-collapse-title-content-left">
              {contentLeft}
            </div>
          )}
          <div className="nextui-collapse-title-content">
            {React.isValidElement(title) ? title : <h3>{title}</h3>}
            {subtitle && (
              <div className="nextui-collapse-subtitle">{subtitle}</div>
            )}
          </div>
          <div className="nextui-collapse-title-content-right">
            {arrowComponent}
          </div>
        </div>
      </div>
      <Expand isExpanded={visible} animated={animated}>
        <div
          role="region"
          tabIndex={-1}
          id={ariaControlId}
          aria-labelledby={ariaLabelledById}
          className="nextui-collapse-content"
        >
          {children}
        </div>
      </Expand>
      <style jsx>{`
        .nextui-collapse {
          border-top: ${borderWeight} solid ${theme.palette.border};
          border-bottom: ${borderWeight} solid ${theme.palette.border};
          transition: box-shadow 0.25s ease;
        }
        .nextui-collapse-shadow {
          border: none;
          background: ${bgColor};
          box-shadow: ${theme.shadows.md};
          border-radius: ${theme.radius.lg};
          padding: 0 ${theme.spacing.lg};
        }
        .nextui-collapse-bordered {
          padding: 0 ${theme.spacing.lg};
          border-radius: ${theme.radius.lg};
          border: ${borderWeight} solid ${theme.palette.border};
        }
        .nextui-collapse-view {
          width: 100%;
          display: block;
          text-align: left;
          background: transparent;
          border: none;
          cursor: pointer;
          outline: none;
          padding: ${theme.spacing.lg} 0;
        }
        .nextui-collapse-view.nextui-collapse-view-disabled {
          cursor: not-allowed;
        }
        .nextui-collapse-view.nextui-collapse-view-disabled
          .nextui-collapse-title,
        .nextui-collapse-view.nextui-collapse-view-disabled
          .nextui-collapse-subtitle {
          opacity: 0.5;
        }
        .nextui-collapse-title-content-left,
        .nextui-collapse-title-content-right {
          display: flex;
          align-items: center;
        }
        .nextui-collapse-title-content-left {
          margin-right: ${theme.spacing.sm};
        }
        .nextui-collapse-title-content {
          width: 100%;
        }
        .nextui-collapse-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: ${theme.palette.foreground};
        }
        .nextui-collapse-title-content-right :global(svg) {
          transform: rotateZ(${visible ? '-90deg' : '0'});
        }
        .nextui-collapse-animated
          .nextui-collapse-title-content-right
          :global(svg) {
          transition: transform 200ms ease;
        }
        .nextui-collapse-title-content :global(h1),
        .nextui-collapse-title-content :global(h2),
        .nextui-collapse-title-content :global(h3),
        .nextui-collapse-title-content :global(h4),
        .nextui-collapse-title-content :global(h5),
        .nextui-collapse-title-content :global(h6),
        .nextui-collapse-title-content :global(p),
        .nextui-collapse-title-content :global(span),
        .nextui-collapse-title-content :global(b) {
          margin: 0 !important;
        }
        .nextui-collapse-subtitle {
          color: ${theme.palette.accents_5};
          margin: 0;
        }
        .nextui-collapse-subtitle > :global(*) {
          margin: 0;
        }
        .nextui-collapse-content {
          font-size: 1rem;
          line-height: 1.625rem;
          padding-bottom: ${theme.spacing.lg};
        }
        .nextui-collapse-content > :global(*:first-child) {
          margin-top: 0;
        }
        .nextui-collapse-content > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
      {focusStyles}
    </div>
  );
};

Collapse.defaultProps = defaultProps;

type CollapseComponent<P = {}> = React.FC<P> & {
  Group: typeof CollapseGroup;
};

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs;

export default Collapse as CollapseComponent<ComponentProps>;
