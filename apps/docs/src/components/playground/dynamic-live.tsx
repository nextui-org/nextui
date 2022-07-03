import React from "react";
import {LivePreview, LiveProvider, LiveError} from "react-live";
import NextLink from "next/link";
import {useMediaQuery} from "@hooks/use-media-query";
import {validateEmail} from "@utils/index";
import withDefaults from "@utils/with-defaults";
import {Box} from "@primitives";
import * as Components from "@nextui-org/react";

import * as TemplateComponents from "../templates";
import Palette from "../palette";
import * as Icons from "../icons";

import Editor from "./editor";
import makeCodeTheme from "./code-theme";

export interface Props {
  code: string;
  showEditor?: boolean;
  noInline?: boolean;
  initialEditorOpen?: boolean;
  overflow?: "auto" | "visible" | "hidden";
}

const defaultProps = {
  showEditor: true,
};

const StyledWrapper = Components.styled(Box, {
  width: "100%",
  padding: "$10",
  marginLeft: "-$sm",
  display: "flex",
  flexWrap: "wrap",
  color: "$text",
  flexDirection: "column",
  background: "transparent",
  "& > div": {
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
  },
  defaultVariants: {
    overflow: "hidden",
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

const DynamicLive: React.FC<Props & {css?: Components.CSS}> = ({
  code,
  showEditor,
  initialEditorOpen,
  noInline,
  overflow,
  css,
}) => {
  const codeTheme = makeCodeTheme();

  return (
    <LiveProvider code={code} noInline={noInline} scope={scope} theme={codeTheme}>
      <StyledWrapper className="wrapper" css={css} noInline={noInline} overflow={overflow}>
        <LivePreview />
        <LiveError />
      </StyledWrapper>
      {showEditor && <Editor code={code} initialOpen={initialEditorOpen} />}
    </LiveProvider>
  );
};

export default withDefaults(DynamicLive, defaultProps);
