import React from 'react';
import cn from 'classnames';
import { Action, ResultHandlers, ResultState } from 'kbar';
import { useTheme } from '@nextui-org/react';
import { addColorAlpha } from '@utils/index';
import { ArrowRight } from '../icons';
import Keyboard from '../keyboard';

interface Props {
  action: Action;
  handlers: ResultHandlers;
  state: ResultState;
}

const KBarOption: React.FC<Props> = ({ action, handlers, state }) => {
  const ownRef = React.useRef<HTMLDivElement>(null);
  const active = state.index === state.activeIndex;

  const theme = useTheme();

  React.useEffect(() => {
    if (active) {
      // wait for the KBarAnimator to resize, _then_ scrollIntoView.
      // https://medium.com/@owencm/one-weird-trick-to-performant-touch-response-animations-with-react-9fe4a0838116
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => {
          const element = ownRef.current;
          if (!element) {
            return;
          }
          // @ts-ignore
          element.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth',
            inline: 'start'
          });
        })
      );
    }
  }, [active]);

  return (
    <div ref={ownRef} className="kbar-option" {...handlers}>
      <div className={cn('option-container', { active })}>
        <div className="option-left-container">
          {action.icon && <div className="option-icon"> {action.icon}</div>}
          <div className="option-text-container">
            <span className="option-text-title">{action.name}</span>
            {action.subtitle && (
              <span className="option-text-subtitle">{action.subtitle}</span>
            )}
          </div>
        </div>
        <div className="option-right-container">
          {action.shortcut?.length ? (
            <div className="kbd-container">
              {action.shortcut.map((sc) => (
                <Keyboard>{sc}</Keyboard>
              ))}
            </div>
          ) : null}
          <ArrowRight
            className="arrow-right"
            fill={theme.palette.accents_6}
            size={16}
          />
        </div>
      </div>

      <style jsx>
        {`
          .kbar-option {
            min-height: 54px;
          }
          .option-container {
            display: flex;
            height: 54px;
            padding: 0 10px;
            margin: 4px 12px;
            align-items: center;
            cursor: pointer;
            justify-content: space-between;
            transition: all 0.2s ease;
          }
          .active {
            border-radius: 4px;
            background: ${addColorAlpha(theme.palette.text, 0.1)};
          }
          .option-left-container {
            display: flex;
            align-items: center;
          }
          .option-icon {
            display: flex;
            align-items: center;
            padding-right: 12px;
          }
          .option-text-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .option-right-container {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .option-right-container :global(.arrow-right) {
            margin-left: 8px;
          }
          .option-text-title {
            color: ${theme.palette.text};
          }
          .option-text-subtitle {
            font-size: 12px;
            color: ${theme.palette.accents_4};
          }
          .kbd-container {
            display: grid;
            grid-auto-flow: column;
            gap: 4px;
          }
        `}
      </style>
    </div>
  );
};

export default KBarOption;
