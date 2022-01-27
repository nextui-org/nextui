import React from 'react';
import { Container, Row, Text, Spacer, Link, CSS } from '@nextui-org/react';
import { VercelCallout } from '@components';

export interface Props {
  css?: CSS;
  containerCss?: CSS;
}

const Footer: React.FC<Props> = ({ css, containerCss }) => {
  const year = new Date().getFullYear();
  return (
    <Container
      fluid
      className="footer__container"
      gap={2}
      css={{
        zIndex: '$1',
        padding: '$md $sm',
        '@xsMax': {
          padding: '$sm $xs'
        },
        ...containerCss
      }}
    >
      <Row justify="center" css={css}>
        <Text
          span
          className="footer__copy"
          css={{
            fontSize: '$xs',
            color: '$accents6',
            '@mdMax': {
              fontSize: '$tiny'
            }
          }}
        >
          &copy;&nbsp;Copyright&nbsp;{year}&nbsp;NextUI
        </Text>
        <Spacer x={0.5} />
        <Text
          span
          className="footer__by"
          css={{
            fontSize: '$xs',
            color: '$accents6',
            '@mdMax': {
              fontSize: '$tiny'
            }
          }}
        >
          Created&nbsp;by&nbsp;
          <Link href="https://jrgarciadev.com" rel="noreferrer" target="_blank">
            Junior Garcia
          </Link>
        </Text>
      </Row>
      <Row justify="center" css={css}>
        <VercelCallout />
      </Row>
    </Container>
  );
};

export default Footer;
