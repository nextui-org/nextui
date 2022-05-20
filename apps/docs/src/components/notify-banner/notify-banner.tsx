import * as React from 'react';
import NextLink from 'next/link';
import { Badge } from '@components';
import { Text, Spacer } from '@nextui-org/react';
import { ChevronRight } from '@components';
import { StyledNotifyBanner, StyledContent, StyledImg } from './styles';

interface Props {
  text: string;
  href?: string;
  showBadge?: boolean;
}

const NotifyBanner: React.FC<Props> = (props) => {
  const { showBadge = true, text, href = '#' } = props;

  return (
    <StyledNotifyBanner>
      <StyledImg
        src="/notify-gradient.svg"
        className="notify-gradient"
        alt="gradient blue background"
        css={{
          position: 'absolute',
          opacity: 0.7,
          zIndex: -1,
          left: '0%'
        }}
      />
      {showBadge && (
        <Badge solid>
          <span role="img" aria-label="notify-emoji">
            🚀
          </span>
          &nbsp;&nbsp;New
        </Badge>
      )}
      <NextLink href={href}>
        <StyledContent>
          <Spacer x={0.2} />
          <Text b size={15} css={{ color: 'currentColor' }}>
            {text}
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
