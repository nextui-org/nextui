import * as React from 'react';
import cn from 'classnames';
import { matchSorter } from 'match-sorter';
import type {
  Action,
  KBarResultsProps,
  ResultHandlers,
  ResultState
} from 'kbar';
import { VisualState, useKBar } from 'kbar';
import { groupBy, isEmpty } from 'lodash';
import { useTheme } from '@nextui-org/react';

function useMatches(term: string, actions: Action[]) {
  // TODO: we can throttle this if needed
  return React.useMemo(
    () =>
      term.trim() === ''
        ? actions
        : matchSorter(actions, term, { keys: ['keywords', 'name'] }),
    [term, actions]
  );
}

export default function KBarResults(props: KBarResultsProps) {
  const { search, actions, currentRootActionId, query } = useKBar((state) => ({
    search: state.searchQuery,
    currentRootActionId: state.currentRootActionId,
    actions: state.actions
  }));

  const theme = useTheme();

  // Store reference to a list of all actions
  const actionsList = React.useMemo(
    () =>
      Object.keys(actions).map((key) => {
        return actions[key];
      }),
    [actions]
  );

  const currActions = React.useMemo(() => {
    if (!currentRootActionId) {
      return actionsList.reduce((acc: any, curr) => {
        if (!curr.parent) {
          acc[curr.id] = curr;
        }
        return acc;
      }, {});
    }

    const root = actions[currentRootActionId];
    const children = root.children;

    if (!children) {
      return {
        [root.id]: root
      };
    }

    return {
      ...children.reduce((acc: any, actionId) => {
        acc[actionId] = actions[actionId];
        return acc;
      }, {})
    };
  }, [actions, actionsList, currentRootActionId]);

  const filteredList = React.useMemo(
    () =>
      Object.keys(currActions).map((key) => {
        const action = currActions[key];
        return action;
      }) as Action[],
    [currActions]
  );

  const matches = useMatches(search, filteredList);

  const [activeIndex, setActiveIndex] = React.useState(0);

  // Reset active index on root action change
  React.useEffect(() => {
    setActiveIndex(0);
  }, [currentRootActionId]);

  const select = React.useCallback(() => {
    const action = matches[activeIndex];

    if (!action) return;

    if (action.perform) {
      action.perform();
      query.setVisualState(() => VisualState.animatingOut);
    } else {
      query.setCurrentRootAction(action.id);
    }
  }, [matches, activeIndex, query]);

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      event.stopPropagation();
      if (event.key === 'ArrowDown' || (event.ctrlKey && event.key === 'j')) {
        event.preventDefault();
        setActiveIndex((index) => {
          if (index >= matches.length - 1) {
            return 0;
          } else {
            return index + 1;
          }
        });
      }

      if (event.key === 'ArrowUp' || (event.ctrlKey && event.key === 'k')) {
        event.preventDefault();
        setActiveIndex((index) => {
          if (index === 0) {
            return matches.length - 1;
          } else {
            return index - 1;
          }
        });
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        select();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [matches, select, activeIndex]);

  // Reset focused index when searching & updated results.
  React.useEffect(() => {
    setActiveIndex(0);
  }, [filteredList.length, search]);

  const groupedMatches = groupBy(matches, 'section');

  const renderAction = (action: any, index: number) => {
    const handlers: ResultHandlers = {
      onClick: select,
      onPointerDown: () => setActiveIndex(index),
      onMouseEnter: () => setActiveIndex(index)
    };
    const state: ResultState = {
      activeIndex,
      index
    };
    if (props.onRender) {
      // Implicitly add a `key` so the user won't have to.
      return React.cloneElement(props.onRender(action, handlers, state), {
        key: action.id
      });
    }
    return (
      <DefaultResultWrapper
        key={action.id}
        isActive={activeIndex === index}
        {...handlers}
      >
        {action.name}
      </DefaultResultWrapper>
    );
  };
  let idx = -1;
  return (
    <div className={cn('kbar-section', props.className)} style={props.style}>
      {!isEmpty(groupedMatches)
        ? Object.keys(groupedMatches).map((section, sectionIndex) => {
            return (
              <ul
                key={`${section}_${sectionIndex}`}
                className="kbar-section-list"
              >
                {section ? (
                  <b className="kbar-section-list__title">{section}</b>
                ) : null}
                {groupedMatches[section].map((action) => {
                  idx = idx + 1;
                  return renderAction(action, idx);
                })}
              </ul>
            );
          })
        : null}
      <style jsx>
        {`
          .kbar-section-list {
            display: flex;
            width: 100%;
            margin: 0;
            flex-direction: column;
            align-items: flex-start;
          }
          .kbar-section-list__title {
            padding: 4px 16px;
            color: ${theme.palette.accents_7};
            opacity: 0.4;
            font-size: 12px;
            font-weight: 500;
          }
        `}
      </style>
    </div>
  );
}

// Separate component to ensure we can scrollTo active elements properly.
const DefaultResultWrapper: React.FC<{ isActive: boolean }> = ({
  isActive,
  children,
  ...rest
}) => {
  const ownRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    if (isActive) {
      // wait for the KBarAnimator to resize, _then_ scrollIntoView.
      // https://medium.com/@owencm/one-weird-trick-to-performant-touch-response-animations-with-react-9fe4a0838116
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => {
          const element = ownRef.current;
          if (!element) {
            return;
          }
          element.scrollIntoView({ block: 'nearest' });
        })
      );
    }
  }, [isActive]);

  return (
    <ul ref={ownRef} className="kbar-result-list" {...rest}>
      {children}
    </ul>
  );
};
