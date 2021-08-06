import React from 'react';
import { NextUIThemes, useTheme, usePortal, Link } from '@nextui-org/react';
import cn from 'classnames';
import { addColorAlpha } from '@utils/index';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import withDefaults from '@utils/with-defaults';
import { createPortal } from 'react-dom';
import { isActive } from '@utils/links';

interface Props {
  opened: boolean;
}

const defaultProps = {
  opened: false,
};

const MobileNavigation: React.FC<Props> = ({ opened }) => {
  const theme = useTheme() as NextUIThemes;
  const router = useRouter();
  const portal = usePortal('mobile-navigation');

  return portal
    ? createPortal(
        <nav className={cn('mobile-navigation__container', { opened })}>
          <div className="mobile-navigation__nav-wrapper">
            <ul>
              <li>
                <NextLink href="/docs/guide/getting-started">
                  <Link
                    className={cn('navbar__link', {
                      active: isActive(router.pathname, '/docs/[[...slug]]'),
                    })}
                    href="#"
                  >
                    Docs
                  </Link>
                </NextLink>
              </li>
              <li>
                <NextLink href="/docs/guide/getting-started">
                  <Link
                    className={cn('navbar__link', {
                      active: isActive(router.pathname, '/docs/[[...slug]]'),
                    })}
                    href="#"
                  >
                    Blog
                  </Link>
                </NextLink>
              </li>
              <li>
                <NextLink href="/docs/guide/getting-started">
                  <Link
                    className={cn('navbar__link', {
                      active: isActive(router.pathname, '/docs/[[...slug]]'),
                    })}
                    href="#"
                  >
                    Ecosystem
                  </Link>
                </NextLink>
              </li>
            </ul>
          </div>
          <style jsx>{`
            .mobile-navigation__container {
              position: fixed;
              top: 20px;
              z-index: 99;
              right: 0;
              left: 0;
              display: block;
              margin: 0;
              width: 100%;
              height: 0;
              transition: all 0.25s ease;
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
