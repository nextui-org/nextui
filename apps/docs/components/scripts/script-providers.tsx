import * as React from "react";
import {Analytics} from "@vercel/analytics/react";
import Script from "next/script";

import {__PROD__} from "@/utils";

export function ScriptProviders() {
  return (
    <>
      <Script
        id="featurebase-sdk"
        src="https://do.featurebase.app/js/sdk.js"
        strategy={"beforeInteractive"}
      />
      <Script
        defer
        data-modal-disclaimer="This is a custom LLM for NextUI with access to all developer docs (nextui.org/docs) and GitHub Issues and PRs (github.com/nextui-org/nextui)."
        data-modal-example-questions="How do I install for Next.js?,How do I customize primary color?"
        data-project-color="#000000"
        data-project-logo="https://avatars.githubusercontent.com/u/86160567?s=280&v=4"
        data-project-name="NextUI"
        data-website-id="e733a73f-980e-4f7d-9e8b-91867453f899"
        src="https://widget.kapa.ai/kapa-widget.bundle.js"
        strategy="afterInteractive"
      />
      {__PROD__ && <Analytics />}
    </>
  );
}
