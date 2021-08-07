import React from 'react';
import { NextUIThemes, useTheme, usePortal } from '@nextui-org/react';
import cn from 'classnames';
import { addColorAlpha } from '@utils/index';
import withDefaults from '@utils/with-defaults';
import { Route } from '@lib/docs/page';
import { createPortal } from 'react-dom';
import { Sidebar, Heading } from '@components';

interface Props {
  opened: boolean;
  routes?: Route[];
}

const defaultProps = {
  opened: false,
};

const MobileNavigation: React.FC<Props> = ({ opened, routes }) => {
  const theme = useTheme() as NextUIThemes;
  const portal = usePortal('mobile-navigation');

  return portal
    ? createPortal(
        <nav className={cn('mobile-navigation__container', { opened })}>
          <div className="mobile-navigation__nav-wrapper">
            <ul>
              <li>
                <Sidebar routes={routes} />
              </li>
              <li>
                <Heading title="Contributors" />
              </li>
              <li>
                <Heading title="Feedback" />
              </li>
            </ul>
          </div>
          <style jsx>{`
            .mobile-navigation__container {
              position: fixed;
              top: 60px;
              z-index: 9999;
              right: 0;
              left: 0;
              display: block;
              margin: 0;
              width: 100%;
              height: 0;
              transition: all 0.25s ease;
              overflow-y: scroll;
              background: ${addColorAlpha(theme.palette.background, 0.7)};
              user-select: none;
            }
            .mobile-navigation__nav-wrapper {
              display: none;
              transition: all 0.2s ease 50ms;
            }
            .mobile-navigation__container.opened {
              top: 63px;
              height: calc(100% - 64px);
            }
            .mobile-navigation__container.opened
              .mobile-navigation__nav-wrapper {
              display: block;
            }
            @supports (
              (-webkit-backdrop-filter: blur(10px)) or
                (backdrop-filter: blur(10px))
            ) {
              .mobile-navigation__container {
                backdrop-filter: saturate(180%) blur(10px);
              }
            }
            @supports (
              not (-webkit-backdrop-filter: blur(10px)) and not
                (backdrop-filter: blur(10px))
            ) {
              .mobile-navigation__container {
                background: theme.palette.background;
              }
            }
          `}</style>
        </nav>,
        portal
      )
    : null;
};

export default withDefaults(MobileNavigation, defaultProps);
