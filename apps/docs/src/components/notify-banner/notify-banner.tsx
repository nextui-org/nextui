import * as React from 'react';
import NextLink from 'next/link';
import { Badge } from '@components';
import { Text, Spacer } from '@nextui-org/react';
import { ChevronRight } from '@components';
import { StyledNotifyBanner, StyledContent, StyledImg } from './styles';

const NotifyBanner = () => {
  return (
    <StyledNotifyBanner>
      <StyledImg
        src="/theming-gradient.svg"
        alt="gradient blue background"
        css={{
          position: 'absolute',
          opacity: 0.5,
          zIndex: '$1',
          left: '10%'
        }}
      />
      <Badge>🚀&nbsp;&nbsp;New</Badge>
      <NextLink href="/docs/components/table">
        <StyledContent>
          <Spacer x={0.2} />
          <Text b size={15} css={{ color: 'currentColor' }}>
            Table component
          </Text>
          <Spacer x={0.2} />
          <ChevronRight
            size={20}
            className="chevron-right-icon"
            fill="currentColor"
          />
        </StyledContent>
      </NextLink>
    </StyledNotifyBanner>
  );
};

export default NotifyBanner;
