import type {PropsWithChildren} from "react";

import {addons, makeDecorator} from "@storybook/preview-api";
import React, {StrictMode, useEffect, useState} from "react";

function StrictModeDecorator({children}: PropsWithChildren<any>) {
  const strictQuery = new URLSearchParams(window.location.search).get("strict");
  const [isStrict, setStrict] = useState(strictQuery === "true");

  useEffect(() => {
    const channel = addons.getChannel();

    channel.on("strict/updated", setStrict);

    return () => {
      channel.removeListener("strict/updated", setStrict);
    };
  }, []);

  return isStrict ? <StrictMode>{children}</StrictMode> : children;
}

export const withStrictModeSwitcher = makeDecorator({
  name: "withStrictModeSwitcher",
  parameterName: "strictModeSwitcher",
  wrapper: (getStory, context) => {
    return <StrictModeDecorator>{getStory(context)}</StrictModeDecorator>;
  },
});
