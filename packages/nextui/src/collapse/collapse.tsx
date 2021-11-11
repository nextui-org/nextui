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
import { getFocusStyles } from '../utils/styles';
import useKeyboard, { KeyCode } from '../use-keyboard';
import clsx from '../utils/clsx';

interface Props {
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
      ariaLabelledById: `collapse-button-next-ui-${nextuiId}`,
      ariaControlId: `collapse-next-ui-${nextuiId}`
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

  return (
    <div
      tabIndex={disabled ? -1 : 0}
      className={clsx(
        'collapse',
        { shadow, bordered },
        className,
        focusClassName
      )}
      {...props}
      {...bindings}
    >
      <div
        role="button"
        tabIndex={-1}
        className={clsx('view', { disabled })}
        id={ariaLabelledById}
        aria-disabled={disabled}
        aria-expanded={visible}
        aria-controls={ariaControlId}
        onClick={handleChange}
      >
        <div className={clsx('title', { animated })}>
          {contentLeft && (
            <div className="title-content-left">{contentLeft}</div>
          )}
          <div className="title-content">
            {React.isValidElement(title) ? title : <h3>{title}</h3>}
            {subtitle && <div className="subtitle">{subtitle}</div>}
          </div>
          <div className="title-content-right">{arrowComponent}</div>
        </div>
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
          transition: box-shadow 0.25s ease;
        }
        .shadow {
          border: none;
          background: ${bgColor};
          box-shadow: ${theme.expressiveness.shadowMedium};
          border-radius: ${theme.layout.radius};
          padding: 0 ${theme.layout.gap};
        }
        .bordered {
          padding: 0 ${theme.layout.gap};
          border-radius: ${theme.layout.radius};
          border: ${borderWeight} solid ${theme.palette.border};
        }
        .view {
          width: 100%;
          display: block;
          text-align: left;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: ${theme.layout.gap} 0;
        }
        .view.disabled {
          cursor: not-allowed;
        }
        .view.disabled .title,
        .view.disabled .subtitle {
          opacity: 0.5;
        }
        .title-content-left,
        .title-content-right {
          display: flex;
          align-items: center;
        }
        .title-content-left {
          margin-right: ${theme.layout.gapHalf};
        }
        .title-content {
          width: 100%;
        }
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: ${theme.palette.foreground};
        }
        .title-content-right :global(svg) {
          transform: rotateZ(${visible ? '-90deg' : '0'});
        }
        .animated .title-content-right :global(svg) {
          transition: transform 200ms ease;
        }
        .title-content :global(h1),
        .title-content :global(h2),
        .title-content :global(h3),
        .title-content :global(h4),
        .title-content :global(h5),
        .title-content :global(h6),
        .title-content :global(p),
        .title-content :global(span),
        .title-content :global(b) {
          margin: 0 !important;
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
