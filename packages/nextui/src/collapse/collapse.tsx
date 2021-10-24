import React, { useEffect, useMemo } from 'react';
import CollapseIcon from './collapse-icon';
import useTheme from '../use-theme';
import Expand from '../utils/expand';
import { useCollapseContext } from './collapse-context';
import useCurrentState from '../use-current-state';
import CollapseGroup from './collapse-group';
import useWarning from '../use-warning';
import { NormalWeights } from '../utils/prop-types';
import { getNormalWeight } from '../utils/dimensions';
import { getId } from '../utils/collections';
import clsx from '../utils/clsx';

interface Props {
  title: string;
  divider?: boolean;
  animated?: boolean;
  bordered?: boolean;
  subtitle?: React.ReactNode | string;
  borderWeight?: NormalWeights;
  arrowIcon?: React.ReactNode;
  initialVisible?: boolean;
  showArrow?: boolean;
  shadow?: boolean;
  className?: string;
  index?: number;
  disabled?: boolean;
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
  initialVisible: false
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CollapseProps = Props & typeof defaultProps & NativeAttrs;

const Collapse: React.FC<React.PropsWithChildren<CollapseProps>> = ({
  children,
  title,
  subtitle,
  initialVisible,
  shadow,
  className,
  divider,
  arrowIcon,
  showArrow,
  disabled,
  bordered,
  animated: animatedProp,
  borderWeight: borderWeightProp,
  index,
  ...props
}) => {
  const theme = useTheme();
  const [visible, setVisible, visibleRef] =
    useCurrentState<boolean>(initialVisible);

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

  const arrowComponent = useMemo(
    () => (arrowIcon ? arrowIcon : showArrow ? <CollapseIcon /> : null),
    [arrowIcon, showArrow]
  );

  const borderWeight = useMemo(() => {
    const withDivider = groupDivider === undefined ? divider : groupDivider;
    return withDivider ? getNormalWeight(borderWeightProp) : '0px';
  }, [divider, groupDivider, borderWeightProp]);

  const animated = useMemo(() => {
    return groupAnimated === undefined ? animatedProp : groupAnimated;
  }, [groupAnimated, animatedProp]);

  const { ariaLabelledById, ariaControlId } = useMemo(() => {
    const nextuiId = getId();
    return {
      ariaLabelledById: `collapse-button-next-ui-${nextuiId}`,
      ariaControlId: `collapse-next-ui-${nextuiId}`
    };
  }, []);

  const clickHandler = () => {
    if (disabled) return;
    const next = !visibleRef.current;
    setVisible(next);
    updateValues && updateValues(index, next);
  };

  return (
    <div
      className={clsx('collapse', { shadow, bordered }, className)}
      {...props}
    >
      <div
        role="button"
        className={clsx('view', { disabled })}
        id={ariaLabelledById}
        aria-disabled={disabled}
        aria-expanded={visible}
        aria-controls={ariaControlId}
        onClick={clickHandler}
      >
        <div className={clsx('title', { animated })}>
          <h3>{title}</h3>
          {arrowComponent}
        </div>
        {subtitle && <div className="subtitle">{subtitle}</div>}
      </div>
      <Expand isExpanded={visible} animated={animated}>
        <div
          role="region"
          tabIndex={-1}
          id={ariaControlId}
          aria-labelledby={ariaLabelledById}
          className="content"
        >
          {children}
        </div>
      </Expand>
      <style jsx>{`
        .collapse {
          border-top: ${borderWeight} solid ${theme.palette.border};
          border-bottom: ${borderWeight} solid ${theme.palette.border};
        }
        .shadow {
          box-shadow: ${theme.expressiveness.shadowSmall};
          border: none;
          border-radius: ${theme.layout.radius};
          padding: 0 ${theme.layout.gap};
        }
        .bordered {
          padding: 0 ${theme.layout.gap};
          border-radius: ${theme.layout.radius};
          border: ${borderWeight} solid ${theme.palette.border};
        }
        .view {
          cursor: pointer;
          outline: none;
          padding: ${theme.layout.gap} 0;
        }
        .view.disabled {
          cursor: not-allowed;
        }
        .view.disabled .title,
        .view.disabled .subtitle {
          opacity: 0.5;
        }
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: ${theme.palette.foreground};
        }
        .title :global(svg) {
          transform: rotateZ(${visible ? '-90deg' : '0'});
        }
        .title.animated :global(svg) {
          transition: transform 200ms ease;
        }
        .title h3 {
          margin: 0;
        }
        .subtitle {
          color: ${theme.palette.accents_5};
          margin: 0;
        }
        .subtitle > :global(*) {
          margin: 0;
        }
        .content {
          font-size: 1rem;
          line-height: 1.625rem;
          padding-bottom: ${theme.layout.gap};
        }
        .content > :global(*:first-child) {
          margin-top: 0;
        }
        .content > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
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
