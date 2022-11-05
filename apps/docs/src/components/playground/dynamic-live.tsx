import React, {useRef, useState, useEffect} from "react";
import {LivePreview, LiveProvider, LiveError} from "react-live";
import NextLink from "next/link";
import {useMediaQuery} from "@hooks/use-media-query";
import {validateEmail} from "@utils/index";
import withDefaults from "@utils/with-defaults";
import {motion, useTransform, useMotionValue} from "framer-motion";
import {InView} from "react-intersection-observer";
import {Box} from "@primitives";
import * as Components from "@nextui-org/react";
import {WindowActions} from "@components";
import {isProd} from "@utils/index";

import * as TemplateComponents from "../templates";
import Palette from "../palette";
import * as Icons from "../icons";

import Editor from "./editor";
import makeCodeTheme from "./code-theme";

export interface Props {
  code: string;
  height?: string | number;
  showEditor?: boolean;
  noInline?: boolean;
  initialEditorOpen?: boolean;
  showWindowActions?: boolean;
  iframeSrc?: string;
  iframeTitle?: string;
  iframeInitialWidth?: number;
  enableResize?: boolean;
  overflow?: "auto" | "visible" | "hidden";
}

const defaultProps = {
  showEditor: true,
  enableResize: false,
  showWindowActions: false,
  height: "auto",
};

const WindowIframe = Components.styled("iframe", {
  // reset styles
  width: "100%",
  height: "100%",
  border: "none",
  overflow: "visible scroll",
  zIndex: "$10",
  "&.dragging-ew": {
    zIndex: "1",
    pointerEvents: "none",
  },
});

const Resizer = Components.styled(Box, {
  position: "absolute",
  d: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  zIndex: "$1",
  right: "5px",
  width: "auto",
  height: "100%",
  "& .resizer-bar": {
    cursor: "ew-resize",
    userSelect: "none",
    position: "absolute",
    dflex: "center",
    width: "10px",
    height: "100%",
    "&:after": {
      zIndex: "$10",
      content: '""',
      width: "6px",
      height: "40px",
      borderRadius: "$pill",
      background: "$accents5",
    },
  },
  "@xsMax": {
    display: "none",
  },
  variants: {
    hasInitalWidth: {
      true: {
        justifyContent: "flex-start",
        "& .resizer-bar": {
          ml: "$2",
        },
      },
    },
  },
});

const StyledWrapper = Components.styled(Box, {
  width: "100%",
  padding: "$10",
  marginLeft: "-$sm",
  display: "flex",
  flexWrap: "wrap",
  color: "$text",
  flexDirection: "column",
  background: "transparent",
  position: "relative",
  "& .live-preview": {
    width: "100%",
  },
  "@xsMax": {
    p: "$5",
  },
  variants: {
    overflow: {
      visible: {
        overflowX: "visible",
      },
      hidden: {
        overflowX: "hidden",
      },
      auto: {
        overflowX: "auto",
      },
    },
    noInline: {
      true: {
        pb: "$10",
        ml: 0,
      },
    },
    isBrowser: {
      true: {
        p: 0,
        ml: "20px",
        overflow: "hidden",
        boxShadow: "$md",
        position: "relative",
        border: "1px solid $colors$border",
        borderRadius: "$md",
        height: "100%",
        flexWrap: "nowrap",
      },
    },
    enableResize: {
      true: {},
    },
    hasInitialWidth: {
      true: {},
    },
  },
  compoundVariants: [
    {
      enableResize: true,
      hasInitialWidth: true,
      css: {
        width: "var(--iframe-resizer-x)",
        "@xsMax": {
          ml: "0px",
          width: "100%",
        },
      },
    },
    {
      enableResize: true,
      hasInitialWidth: false,
      css: {
        width: "calc(100% - 34px + var(--iframe-resizer-x))",
        "@xsMax": {
          ml: "0px",
          width: "100%",
        },
      },
    },
  ],
  defaultVariants: {
    overflow: "hidden",
  },
});

const LiveContainer = Components.styled(Box, {
  width: "100%",
  position: "relative",
  my: 0,
  height: "100%",
  variants: {
    showWindowActions: {
      true: {
        my: "$10",
      },
    },
  },
});

export const scope = {
  ...Components,
  ...Icons,
  ...TemplateComponents,
  NextLink,
  Palette,
  useMediaQuery,
  validateEmail,
};

const MIN_WIDTH = 400;

const DynamicLive: React.FC<Props & {css?: Components.CSS}> = ({
  code,
  showEditor,
  initialEditorOpen,
  iframeInitialWidth,
  noInline,
  overflow,
  showWindowActions,
  enableResize,
  iframeSrc,
  iframeTitle,
  height,
  css,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const codeTheme = makeCodeTheme();

  const resizerX = useMotionValue(0);
  let constraintsResizerRef = useRef<HTMLDivElement>(null);
  let resizerRef = useRef<HTMLDivElement>(null);
  let iframeRef = useRef<HTMLIFrameElement>(null);

  const hasInitialWidth = iframeInitialWidth !== undefined;

  useEffect(() => {
    if (!resizerRef.current) {
      return;
    }
    resizerRef.current.onselectstart = () => false;
  }, []);

  let browserWidth = useTransform(resizerX, (x) =>
    hasInitialWidth ? `${x + iframeInitialWidth}px` : `${x}px`,
  );

  return (
    <LiveProvider code={code} noInline={noInline} scope={scope} theme={codeTheme}>
      <InView className="inview-section" triggerOnce={isProd} onChange={setIsVisible}>
        <LiveContainer
          className="dynamic-live-container"
          css={{
            height: enableResize && height === "auto" ? "420px" : height,
          }}
          showWindowActions={showWindowActions}
        >
          <StyledWrapper
            as={motion.div}
            className="dynamic-live-wrapper"
            css={css}
            enableResize={enableResize}
            hasInitialWidth={hasInitialWidth}
            isBrowser={showWindowActions}
            noInline={noInline}
            overflow={overflow}
            style={{
              // @ts-ignore
              "--iframe-resizer-x": browserWidth,
            }}
          >
            {showWindowActions ? (
              <>
                <WindowActions
                  css={{
                    py: "$6",
                    px: "$10",
                    bg: "$accents0",
                  }}
                  variant="normal"
                />
                {isVisible && (
                  <WindowIframe
                    ref={iframeRef}
                    as={motion.iframe}
                    id="dynamic-live-iframe"
                    src={iframeSrc}
                    title={iframeTitle}
                  />
                )}
              </>
            ) : (
              <LivePreview className="live-preview" />
            )}

            <LiveError />
          </StyledWrapper>
          {enableResize && (
            <Resizer
              ref={constraintsResizerRef}
              className="window-resizer"
              css={{
                top: 0,
                bottom: 0,
                right: 0,
                width: `calc(100% - ${hasInitialWidth ? iframeInitialWidth : MIN_WIDTH}px - 20px)`,
              }}
              hasInitalWidth={hasInitialWidth}
            >
              <Box
                ref={resizerRef}
                _dragX={resizerX}
                as={motion.div}
                className="resizer-bar"
                drag="x"
                dragConstraints={constraintsResizerRef}
                dragElastic={0}
                dragMomentum={false}
                style={{x: resizerX}}
                onDragEnd={() => {
                  document.documentElement.classList.remove("dragging-ew");
                  iframeRef.current?.classList.remove("dragging-ew");
                }}
                onDragStart={() => {
                  document.documentElement.classList.add("dragging-ew");
                  iframeRef.current?.classList.add("dragging-ew");
                }}
              />
            </Resizer>
          )}
          {showEditor && <Editor code={code} initialOpen={initialEditorOpen} />}
        </LiveContainer>
      </InView>
    </LiveProvider>
  );
};

export default withDefaults(DynamicLive, defaultProps);
