import React from 'react';
import {
  useTheme,
  Container,
  Row,
  Text,
  Spacer,
  Link,
  NextUIThemes,
} from '@nextui-org/react';
import { useMediaQuery } from '@hooks/use-media-query';

const Footer: React.FC = () => {
  const theme = useTheme() as NextUIThemes;
  const year = new Date().getFullYear();
  const isMobile = useMediaQuery(
    Number(theme.breakpoints.sm.max.replace('px', ''))
  );
  return (
    <Container className="footer__container" gap={0}>
      <Row justify={isMobile ? 'space-between' : 'flex-end'}>
        <Text span className="footer__copy" size={isMobile ? 12 : 14}>
          &copy; Copyright {year} NextUI
        </Text>
        <Spacer x={1} />
        <Text span className="footer__by" size={isMobile ? 12 : 14}>
          Created by&nbsp;
          <Link
            href="https://jrgarciadev.com"
            rel="no-referrer"
            target="_blank"
          >
            Junior Garcia
          </Link>
        </Text>
        <style jsx>{`
          :global(.footer__container) {
            z-index: 99;
            padding: 1rem 0;
          }
          :global(.footer__copy),
          :global(.footer__by) {
            color: ${theme.palette.accents_6} !important;
          }
          @media only screen and (max-width: ${theme.breakpoints.xs.max}) {
            :global(.footer__container) {
              z-index: 99;
              padding: 1rem;
            }
            :global(.footer__container .row) {
              padding: 0 calc(2 * ${theme.layout.gapQuarter}) !important;
            }
          }
        `}</style>
      </Row>
    </Container>
  );
};

export default Footer;
