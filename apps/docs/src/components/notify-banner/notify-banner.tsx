import * as React from "react";
import NextLink from "next/link";
import {Badge} from "@components";
import {Text, Spacer} from "@nextui-org/react";
import {ChevronRight} from "@components";

import {StyledNotifyBanner, StyledContent, StyledImg} from "./styles";

interface Props {
  text: string;
  href?: string;
  showBadge?: boolean;
}

const NotifyBanner: React.FC<Props> = (props) => {
  const {showBadge = true, text, href = "#"} = props;

  return (
    <StyledNotifyBanner>
      <StyledImg
        alt="gradient blue background"
        className="notify-gradient"
        css={{
          position: "absolute",
          opacity: 0.7,
          zIndex: -1,
          left: "0%",
        }}
        src="/notify-gradient.svg"
      />
      {showBadge && (
        <Badge solid>
          <span aria-label="notify-emoji" role="img">
            🚀
          </span>
          &nbsp;&nbsp;New
        </Badge>
      )}
      <NextLink href={href}>
        <StyledContent>
          <Spacer x={0.2} />
          <Text b css={{color: "currentColor"}} size={15}>
            {text}
          </Text>
          <Spacer x={0.2} />
          <ChevronRight className="chevron-right-icon" fill="currentColor" size={20} />
        </StyledContent>
      </NextLink>
    </StyledNotifyBanner>
  );
};

export default NotifyBanner;
