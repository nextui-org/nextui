import React from 'react';
import { Container, Row, Text, Spacer, Link } from '@nextui-org/react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <Container
      fluid
      className="footer__container"
      gap={2}
      css={{
        zIndex: '$1',
        padding: '$md $sm'
      }}
    >
      <Row
        justify="flex-end"
        css={{
          '@mdMax': {
            justifyContent: 'space-between'
          },
          '@xsMax': {
            justifyContent: 'flex-start',
            paddingLeft: '$sm',
            paddingRight: '$sm'
          }
        }}
      >
        <Text
          span
          className="footer__copy"
          css={{
            fontSize: '$xs',
            color: '$accents6'
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
            color: '$accents6'
          }}
        >
          Created&nbsp;by&nbsp;
          <Link href="https://jrgarciadev.com" rel="noreferrer" target="_blank">
            Junior Garcia
          </Link>
        </Text>
      </Row>
    </Container>
  );
};

export default Footer;
