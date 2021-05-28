import React from 'react';
import {
  useTheme,
  Container,
  Row,
  Text,
  Spacer,
  Link,
  NextUIThemes,
} from '@nextui/react';

const Footer: React.FC = () => {
  const theme = useTheme() as NextUIThemes;
  const year = new Date().getFullYear();
  return (
    <Container className="footer__container" gap={0}>
      <Row justify="end">
        <Text span className="footer__copy" size={14}>
          &copy; Copyright {year} NextUI
        </Text>
        <Spacer x={1} />
        <Text span className="footer__by" size={14}>
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
          :global(.footer__copy),
          :global(.footer__by) {
            color: ${theme.palette.accents_6} !important;
          }
        `}</style>
      </Row>
    </Container>
  );
};

export default Footer;
