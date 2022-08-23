import React from "react";
import {usePortal} from "@nextui-org/react";
import cn from "classnames";
import withDefaults from "@utils/with-defaults";
import {Route} from "@lib/docs/page";
import {createPortal} from "react-dom";
import {Sidebar} from "@components";

interface Props {
  opened: boolean;
  hasNotify?: boolean;
  detached?: boolean;
  routes?: Route[];
  onClose?: () => void;
}

const defaultProps = {
  opened: false,
  detached: false,
};

const MobileNavigation: React.FC<Props> = ({opened, detached, hasNotify, routes, onClose}) => {
  const portal = usePortal("mobile-navigation");

  const handlePostClick = () => {
    onClose && onClose();
  };

  return portal
    ? createPortal(
        <nav
          className={cn("mobile-navigation__container", {
            opened,
            detached,
            hasNotify,
          })}
        >
          <div className="mobile-navigation__wrapper">
            <ul className="mobile-navigation__list">
              <li>
                <Sidebar routes={routes} onPostClick={handlePostClick} />
              </li>
              {/* <li>
              <Heading title="Contributors" />
            </li>
            <li>
              <Heading title="Feedback" />
            </li> */}
            </ul>
          </div>
          <style jsx>{`
            .mobile-navigation__container {
              position: fixed;
              top: 60px;
              z-index: 1001;
              right: 0;
              left: 0;
              bottom: 0;
              display: block;
              margin: 0;
              width: 100%;
              height: 0;
              transition: height 0.25s ease;
              will-change: height;
              overflow-y: scroll;
              overflow-x: hidden;
              user-select: none;
            }
            .mobile-navigation__wrapper {
              display: none;
              width: 100%;
              min-height: 100%;
              background: var(--nextui-colors-background);
            }
            @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
              .mobile-navigation__wrapper {
                background: var(--nextui-colors-menuBackground);
                backdrop-filter: saturate(180%) blur(10px);
                --webkit-backdrop-filter: saturate(180%) blur(10px);
              }
            }
            .mobile-navigation__list {
              margin: 0;
              padding: 16px 0 16px 16px;
            }
            .mobile-navigation__container.opened {
              top: 63px;
              height: calc(100% - 64px);
            }
            .mobile-navigation__container.opened.hasNotify {
              top: calc(63px + 40px);
            }
            .mobile-navigation__container.opened.hasNotify:not(.detached) {
              padding-bottom: 30px;
            }
            .mobile-navigation__container.hasNotify.detached {
              top: 63px;
            }
            .mobile-navigation__container.opened .mobile-navigation__wrapper {
              display: block;
            }
          `}</style>
        </nav>,
        portal,
      )
    : null;
};

const MemoMobileNavigation = React.memo(MobileNavigation);

export default withDefaults(MemoMobileNavigation, defaultProps);
