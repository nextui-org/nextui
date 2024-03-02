"use client";

import {useEffect} from "react";

import {trackEvent} from "@/utils/va";

type Props = {
  className?: string;
};

// ref: https://developers.featurebase.app/install/changelog-widget/install
export const FbChangelogButton = ({className}: Props) => {
  useEffect(() => {
    const win = window as any;

    if (typeof win.Featurebase !== "function") {
      win.Featurebase = function () {
        // eslint-disable-next-line prefer-rest-params
        (win.Featurebase.q = win.Featurebase.q || []).push(arguments);
      };
    }
    win.Featurebase("initialize_changelog_widget", {
      organization: process.env.NEXT_PUBLIC_FB_FEEDBACK_ORG,
      theme: "dark",
      usersName: "",
      fullscreenPopup: true,
      alwaysShow: true,
    });
  }, []);

  const fbButtonOnClick = () => {
    (window as any).Featurebase("manually_open_changelog_popup");

    trackEvent("Featurebase - Changelog", {
      name: "featurebase-changelog",
      action: "press",
      category: "featurebase",
    });
  };

  return (
    <button className={className} onClick={fbButtonOnClick}>
      Changelog <span id="fb-update-badge" />
    </button>
  );
};
