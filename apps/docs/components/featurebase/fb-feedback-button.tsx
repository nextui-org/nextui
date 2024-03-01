"use client";

import {useEffect} from "react";

type Props = {
  userEmail?: string | null;
};

// ref: https://developers.featurebase.app/install/feedback-widget/setup
export const FbFeedbackButton = ({userEmail}: Props) => {
  useEffect(() => {
    const win = window as any;

    if (typeof win.Featurebase !== "function") {
      win.Featurebase = function () {
        // eslint-disable-next-line prefer-rest-params
        (win.Featurebase.q = win.Featurebase.q || []).push(arguments);
      };
    }
    win.Featurebase("initialize_feedback_widget", {
      organization: "nextui",
      theme: "dark",
      email: userEmail ?? "",
    });
  }, [userEmail]);

  return (
    <div>
      <button data-featurebase-feedback>Feedback</button>
    </div>
  );
};
