"use client";

import {useEffect} from "react";

type Props = {
  userName?: string | null;
};

// ref: https://developers.featurebase.app/install/changelog-widget/install
export const FbChangelogButton = ({userName}: Props) => {
  useEffect(() => {
    const win = window as any;

    if (typeof win.Featurebase !== "function") {
      win.Featurebase = function () {
        // eslint-disable-next-line prefer-rest-params
        (win.Featurebase.q = win.Featurebase.q || []).push(arguments);
      };
    }
    win.Featurebase("initialize_changelog_widget", {
      organization: "nextui",
      theme: "dark",
      usersName: userName ?? "",
      fullscreenPopup: true,
      alwaysShow: true,
    });
  }, [userName]);

  return (
    <div>
      <button onClick={() => (window as any).Featurebase("manually_open_changelog_popup")}>
        Changelog <span id="fb-update-badge" />
      </button>
    </div>
  );
};
