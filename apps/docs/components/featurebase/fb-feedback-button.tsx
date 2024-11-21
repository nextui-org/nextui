"use client";

import {useEffect} from "react";
import {usePostHog} from "posthog-js/react";

type Props = {
  className?: string;
};

// ref: https://developers.featurebase.app/install/feedback-widget/setup
export const FbFeedbackButton = ({className}: Props) => {
  const posthog = usePostHog();

  useEffect(() => {
    const win = window as any;

    if (typeof win.Featurebase !== "function") {
      win.Featurebase = function () {
        // eslint-disable-next-line prefer-rest-params
        (win.Featurebase.q = win.Featurebase.q || []).push(arguments);
      };
    }
    win.Featurebase("initialize_feedback_widget", {
      organization: process.env.NEXT_PUBLIC_FB_FEEDBACK_ORG,
      theme: "dark",
      email: "",
    });
  }, []);

  const fbButtonOnClick = () => {
    posthog.capture("Featurebase - Feedback", {
      name: "featurebase-feedback",
      action: "press",
      category: "featurebase",
    });
  };

  return (
    <button data-featurebase-feedback className={className} onClick={fbButtonOnClick}>
      Feedback
    </button>
  );
};
