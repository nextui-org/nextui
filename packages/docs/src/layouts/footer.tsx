import React from 'react';
import {
  useTheme,
  Container,
  Row,
  Text,
  Spacer,
  Link,
  NextUIThemes
} from '@nextui-org/react';
import { useMediaQuery } from '@hooks/use-media-query';

const Footer: React.FC = () => {
  const theme = useTheme() as NextUIThemes;
  const year = new Date().getFullYear();
  const isMobile = useMediaQuery(
    Number(theme.breakpoints.sm.replace('px', ''))
  );
  const fontSize = isMobile ? 12 : 14;
  return (
    <Container fluid className="footer__container" gap={0}>
      <Row>
        <Text span className="footer__copy" size={fontSize}>
          &copy;&nbsp;Copyright&nbsp;{year}&nbsp;NextUI
        </Text>
        <Spacer x={1} />
        <Text span className="footer__by" size={fontSize}>
          Created&nbsp;by&nbsp;
          <Link href="https://jrgarciadev.com" rel="noreferrer" target="_blank">
            Junior Garcia
          </Link>
        </Text>
        <style jsx>{`
          :global(.footer__container) {
            z-index: 99;
            padding: 1rem 0;
            padding-left: ${theme.spacing.sm} !important;
            padding-right: ${theme.spacing.sm} !important;
          }
          :global(.footer__copy),
          :global(.footer__by) {
            color: ${theme.palette.accents_6} !important;
          }
          :global(.footer__container .row) {
            justify-content: flex-end !important;
          }
          @media only screen and (max-width: ${theme.breakpoints.xs}) {
            :global(.footer__container) {
              z-index: 99;
            }
            :global(.footer__container .row) {
              justify-content: flex-start !important;
              padding-left: calc(
                2 * calc(${theme.spacing.sm} * 0.5)
              ) !important;
              padding-right: calc(
                2 * calc(${theme.spacing.sm} * 0.5)
              ) !important;
            }
          }
          @media only screen and (max-width: ${theme.breakpoints.md}) {
            :global(.footer__container .row) {
              justify-content: space-between;
            }
          }
        `}</style>
      </Row>
    </Container>
  );
};

export default Footer;
