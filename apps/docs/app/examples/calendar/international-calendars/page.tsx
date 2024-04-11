"use client";

import React from "react";
import {Calendar} from "@nextui-org/react";
import {I18nProvider} from "@react-aria/i18n";

export default function Page() {
  return (
    <div className="p-4">
      <I18nProvider locale="zh-CN-u-ca-chinese">
        <Calendar aria-label="Date (International Calendar)" />
      </I18nProvider>
    </div>
  );
}
