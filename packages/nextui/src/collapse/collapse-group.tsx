import React, { useMemo } from 'react';
import withDefaults from '../utils/with-defaults';
import useTheme from '../use-theme';
import { NormalWeights } from '../utils/prop-types';
import { DefaultProps } from '../utils/default-props';
import { CollapseContext, CollapseConfig } from './collapse-context';
import useCurrentState from '../use-current-state';
import { getSpacingsStyles } from '../utils/styles';
import { setChildrenIndex } from '../utils/collections';
import { getNormalWeight } from '../utils/dimensions';
import clsx from '../utils/clsx';
import Collapse from './collapse';

interface Props extends DefaultProps {
  accordion?: boolean;
  className?: string;
  animated?: boolean;
  bordered?: boolean;
  splitted?: boolean;
  shadow?: boolean;
  divider?: boolean;
  borderWeight?: NormalWeights;
  onChange?: (index?: number | undefined, value?: boolean) => void;
}

const defaultProps = {
  accordion: true,
  shadow: false,
  bordered: false,
  splitted: false,
  borderWeight: 'light' as NormalWeights,
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type CollapseGroupProps = Props & typeof defaultProps & NativeAttrs;

const preClass = 'nextui-collapse-group';

const CollapseGroup: React.FC<React.PropsWithChildren<CollapseGroupProps>> = ({
  children,
  accordion,
  shadow,
  className,
  animated,
  bordered,
  splitted,
  divider,
  borderWeight: borderWeightProp,
  onChange,
  ...props
}) => {
  const theme = useTheme();
  const [state, setState, stateRef] = useCurrentState<Array<number>>([]);

  const { stringCss } = getSpacingsStyles(theme, props);

  const updateValues = (currentIndex: number, nextState: boolean) => {
    const hasChild = stateRef.current.find((val) => val === currentIndex);
    onChange && onChange(currentIndex, nextState);
    if (accordion) {
      if (nextState) return setState([currentIndex]);
      return setState([]);
    }
    if (nextState) {
      // In a few cases, the user will set Collapse Component state manually.
      // If the user incorrectly set the state, Group component should ignore it.
      /* istanbul ignore if */
      if (hasChild) return;
      return setState([...stateRef.current, currentIndex]);
    }
    setState(stateRef.current.filter((item) => item !== currentIndex));
  };

  const bgColor = useMemo(
    () =>
      theme.type === 'dark'
        ? theme.palette.accents_1
        : theme.palette.background,
    [theme.type]
  );

  const initialValue = useMemo<CollapseConfig>(
    () => ({
      values: state,
      updateValues,
      divider,
      animated
    }),
    [state.join(',')]
  );

  const hasIndexChildren = useMemo(
    () => setChildrenIndex(children, [Collapse]),
    [children]
  );

  const borderWeight = useMemo(() => {
    return bordered ? getNormalWeight(theme, borderWeightProp) : '0px';
  }, [theme, bordered, borderWeightProp]);

  return (
    <CollapseContext.Provider value={initialValue}>
      <div
        className={clsx(
          preClass,
          {
            [`${preClass}-shadow`]: shadow,
            [`${preClass}-bordered`]: bordered,
            [`${preClass}-splitted`]: splitted
          },
          className
        )}
        {...props}
      >
        {hasIndexChildren}
        <style jsx>{`
          .${preClass} {
            width: auto;
            padding: 0 ${theme.spacing.sm};
            ${stringCss};
          }
          .${preClass} > :global(div + div) {
            border-top: none;
          }
          .${preClass}-shadow,
            .${preClass}-bordered,
            .${preClass}-splitted
            :global(.nextui-collapse) {
            border-radius: ${theme.radius.lg};
            ${!stringCss?.includes('padding')
              ? `padding: 0 ${theme.spacing.lg}`
              : ''};
          }
          .${preClass}-shadow {
            border: none;
            background: ${bgColor};
            box-shadow: ${theme.shadows.md};
          }
          .${preClass}.${preClass}-splitted :global(.nextui-collapse) {
            border: none;
            background: ${bgColor};
            box-shadow: ${theme.shadows.md};
            margin: ${theme.spacing.sm} 0;
          }
          .${preClass}-bordered {
            border: ${borderWeight} solid ${theme.palette.border};
          }
          .${preClass} :global(.nextui-collapse:last-child) {
            border-bottom: none;
          }
          .${preClass} :global(.nextui-collapse:first-child) {
            border-top: none;
          }
        `}</style>
      </div>
    </CollapseContext.Provider>
  );
};

export default withDefaults(CollapseGroup, defaultProps);
