import React from 'react';
import { useTheme, usePortal } from '@nextui-org/react';
import cn from 'classnames';
import { addColorAlpha } from '@utils/index';
import withDefaults from '@utils/with-defaults';
import { Route } from '@lib/docs/page';
import { createPortal } from 'react-dom';
import { Sidebar } from '@components';

interface Props {
  opened: boolean;
  routes?: Route[];
  onClose?: () => void;
}

const defaultProps = {
  opened: false
};

const MobileNavigation: React.FC<Props> = ({ opened, routes, onClose }) => {
  const { theme } = useTheme();
  const portal = usePortal('mobile-navigation');

  const handlePostClick = () => {
    onClose && onClose();
  };

  return portal
    ? createPortal(
        <nav className={cn('mobile-navigation__container', { opened })}>
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
              transition: all 0.25s ease;
              overflow-y: scroll;
              overflow-x: hidden;
              user-select: none;
            }
            .mobile-navigation__wrapper {
              display: none;
              width: 100%;
              min-height: 100%;
              transition: all 0.2s ease 50ms;
              background: ${addColorAlpha(theme.colors.background.value, 0.8)};
            }
            .mobile-navigation__list {
              margin: 0;
              padding: 16px 0 16px 16px;
            }
            .mobile-navigation__container.opened {
              top: 63px;
              height: calc(100% - 64px);
            }
            .mobile-navigation__container.opened .mobile-navigation__wrapper {
              display: block;
            }
            @supports (
              (-webkit-backdrop-filter: blur(10px)) or
                (backdrop-filter: blur(10px))
            ) {
              .mobile-navigation__wrapper {
                backdrop-filter: saturate(180%) blur(10px);
              }
            }
            @supports (
              not (-webkit-backdrop-filter: blur(10px)) and not
                (backdrop-filter: blur(10px))
            ) {
              .mobile-navigation__wrapper {
                background: theme.palette.background;
              }
            }
          `}</style>
        </nav>,
        portal
      )
    : null;
};

const MemoMobileNavigation = React.memo(MobileNavigation);

export default withDefaults(MemoMobileNavigation, defaultProps);
