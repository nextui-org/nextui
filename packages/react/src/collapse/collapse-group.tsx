import React, { useMemo } from 'react';
import withDefaults from '../utils/with-defaults';
import { CollapseContext, CollapseConfig } from './collapse-context';
import useCurrentState from '../use-current-state';
import useTheme from '../use-theme';
import { setChildrenIndex } from '../utils/collections';
import { CSS } from '../theme/stitches.config';

import {
  StyledCollapseGroup,
  CollapseGroupVariantsProps
} from './collapse.styles';
import Collapse from './collapse';

interface Props {
  accordion?: boolean;
  animated?: boolean;
  divider?: boolean;
  onChange?: (index?: number | undefined, value?: boolean) => void;
  as?: keyof JSX.IntrinsicElements;
}

const defaultProps = {
  accordion: true
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;

export type CollapseGroupProps = Props &
  NativeAttrs &
  CollapseGroupVariantsProps & { css?: CSS };

const CollapseGroup: React.FC<React.PropsWithChildren<CollapseGroupProps>> = ({
  children,
  accordion,
  animated,
  divider,
  onChange,
  ...props
}) => {
  const [state, setState, stateRef] = useCurrentState<Array<number>>([]);

  const { isDark } = useTheme();

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

  return (
    <CollapseContext.Provider value={initialValue}>
      <StyledCollapseGroup isDark={isDark} {...props}>
        {hasIndexChildren}
      </StyledCollapseGroup>
    </CollapseContext.Provider>
  );
};

CollapseGroup.toString = () => '.nextui-collapse-group';

export default withDefaults(CollapseGroup, defaultProps);
