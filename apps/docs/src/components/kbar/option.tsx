import React, {useCallback} from "react";
import cn from "classnames";
import Image from "next/image";
import {useTheme} from "@nextui-org/react";
import {addColorAlpha} from "@utils/index";
import {isEmpty} from "lodash";

import Keyboard from "../keyboard";
import Icon from "../icons/map-icons";

import {Action, ResultHandlers, ResultState} from "./types";

interface Props {
  action: Action;
  handlers: ResultHandlers;
  state: ResultState;
}

const KBarOption: React.FC<Props> = ({action, handlers, state}) => {
  const ownRef = React.useRef<HTMLLIElement>(null);
  const active = state.index === state.activeIndex;
  const {theme, isDark} = useTheme();

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
            block: "nearest",
            behavior: "smooth",
            inline: "start",
          });
        }),
      );
    }
  }, [active]);

  const renderIcon = useCallback(() => {
    if (isEmpty(action.icon)) {
      return (
        <div className="option-icon">
          <Icon
            fill={active ? theme?.colors?.accents5?.value : theme?.colors?.accents3?.value}
            name="arrow-right"
          />
        </div>
      );
    }
    if (action.icon && typeof action.icon === "string" && action.icon.includes(".svg")) {
      return (
        <div className="option-icon">
          <Image
            alt={`${action.name} icon`}
            height={24}
            src={action.icon?.replace(".svg", isDark ? "-dark.svg" : "-light.svg")}
            width={24}
          />
        </div>
      );
    } else if (action.icon && typeof action.icon === "string") {
      return (
        <div className="option-icon">
          <Icon
            fill={active ? theme?.colors?.accents5?.value : theme?.colors?.accents3?.value}
            name={action.icon}
          />
        </div>
      );
    }

    return <div className="option-icon">{action.icon}</div>;
  }, [active, isDark]);

  return (
    <li ref={ownRef} className="kbar-option" {...handlers}>
      <div className={cn("option-container", {active})}>
        <div className="option-left-container">
          {renderIcon()}
          <div className="option-text-container">
            <span className="option-text-title">{action.name}</span>
            {action.subtitle && <span className="option-text-subtitle">{action.subtitle}</span>}
          </div>
        </div>
        <div className="option-right-container">
          {action.shortcut?.length ? (
            <div className="kbd-container">
              {action.shortcut.map((sc, index) => (
                <Keyboard key={`${sc}_${index}`}>{sc}</Keyboard>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <style jsx>
        {`
          .kbar-option {
            width: 100%;
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
            border-radius: 4px;
            transition: all 0.2s ease;
          }
          .active {
            background: ${addColorAlpha(theme?.colors?.text?.value, 0.1)};
          }
          .option-left-container {
            display: flex;
            align-items: center;
          }
          :global(.option-icon) {
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
          .option-text-title {
            color: ${theme?.colors?.text?.value};
          }
          .option-text-subtitle {
            font-size: 12px;
            color: ${theme?.colors?.accents4?.value};
          }
          .kbd-container {
            display: grid;
            grid-auto-flow: column;
            gap: 4px;
          }
        `}
      </style>
    </li>
  );
};

const MemoKBarOption = React.memo(KBarOption);

export default MemoKBarOption;
