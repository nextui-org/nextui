import * as React from "react";
import {useRouter} from "next/router";
import {Badge, Link, Spacer, Text} from "@nextui-org/react";
import {ChevronRight, Sparkles} from "@components";
import {AnimatedText} from "@primitives";
import {darkTheme} from "@theme/shared";

import {StyledNotifyBanner, StyledContent} from "./styles";

interface Props {
  text: string | React.ReactNode;
  href?: string;
  showBadge?: boolean;
  isVisible?: boolean;
  showSparkles?: boolean;
  showAnimatedText?: boolean;
  showIcon?: boolean;
}

const NotifyBanner: React.FC<Props> = (props) => {
  const {
    showBadge = true,
    showSparkles = true,
    isVisible = true,
    showIcon = true,
    showAnimatedText = true,
    text,
    href = "#",
  } = props;

  const router = useRouter();

  const handleOnLinkClick = () => {
    if (href) {
      const isExternal = href.startsWith("http");

      if (isExternal) {
        const newWindow = window.open(href, "_blank", "noopener,noreferrer");

        if (newWindow) newWindow.opener = null;
      } else {
        router.push(href);
      }
    }
  };
  const textContent = showAnimatedText ? (
    <AnimatedText css={{cursor: "pointer", userSelect: "none"}} size={16}>
      {text}
    </AnimatedText>
  ) : (
    <Text css={{cursor: "pointer", userSelect: "none", fontWeight: "$semibold"}} size={16}>
      {text}
    </Text>
  );

  return (
    <StyledNotifyBanner isVisible={isVisible}>
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
          {showIcon && (
            <span aria-label="notify" role="img">
              🎉&nbsp;
            </span>
          )}
          UPDATE
        </Badge>
      )}
      <Link onClick={handleOnLinkClick}>
        <StyledContent>
          <Spacer x={0.3} />
          {showSparkles ? <Sparkles activeOnHover>{textContent}</Sparkles> : textContent}
          <Spacer x={0.2} />
          <ChevronRight
            className="chevron-right-icon"
            fill="var(--nextui-colors-secondary)"
            size={20}
            strokeWidth={2}
          />
        </StyledContent>
      </Link>
    </StyledNotifyBanner>
  );
};

export default NotifyBanner;
