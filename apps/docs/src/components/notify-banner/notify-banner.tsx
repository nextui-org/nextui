import * as React from "react";
import NextLink from "next/link";
import {Badge, Spacer, useTheme} from "@nextui-org/react";
import {ChevronRight, Sparkles} from "@components";
import {AnimatedText} from "@primitives";
import {darkTheme} from "@theme/shared";

import {StyledNotifyBanner, StyledContent, StyledImg} from "./styles";

interface Props {
  text: string;
  href?: string;
  showBadge?: boolean;
  showSparkles?: boolean;
}

const NotifyBanner: React.FC<Props> = (props) => {
  const {showBadge = true, showSparkles = true, text, href = "#"} = props;

  const {isDark} = useTheme();

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
        <Badge
          disableOutline
          color="secondary"
          css={{
            fontSize: "10px",
            fontWeight: "$black",
            [`.${darkTheme} &`]: {
              bg: "$purple400",
              color: "$purple900",
            },
          }}
          size="xs"
          variant="flat"
        >
          <span aria-label="notify" role="img">
            🎉
          </span>
          &nbsp;NEW
        </Badge>
      )}
      <NextLink href={href}>
        <StyledContent>
          <Spacer x={0.3} />
          {showSparkles ? (
            <Sparkles activeOnHover>
              <AnimatedText css={{cursor: "pointer", userSelect: "none"}} size={16}>
                {text}
              </AnimatedText>
            </Sparkles>
          ) : (
            <AnimatedText css={{cursor: "pointer", userSelect: "none"}} size={16}>
              {text}
            </AnimatedText>
          )}
          <Spacer x={0.2} />
          <ChevronRight
            className="chevron-right-icon"
            fill="var(--nextui-colors-secondary)"
            size={20}
            strokeWidth={2}
          />
        </StyledContent>
      </NextLink>
    </StyledNotifyBanner>
  );
};

export default NotifyBanner;
