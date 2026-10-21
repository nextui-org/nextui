import React from "react";

import {AlertDemo} from "./alert-demo";
import {AlertDialogDemo} from "./alert-dialog-demo";
import {AllowNotificationsDemo} from "./allow-notifications-demo";
import {AvatarGroupDemo} from "./avatar-group-demo";
import {ButtonsDemo} from "./buttons-demo";
import {InputOTPDemo} from "./input-otp-demo";
import {ListBoxDemo} from "./list-box-demo";
import {LoginDemo} from "./login-demo";
import {SelectDemo} from "./select-demo";
import {SliderDemo} from "./slider-demo";
import {SubtleCardsDemo} from "./subtle-cards-demo";
import {TabsDemo1} from "./tabs-1-demo";
import {TabsDemo2} from "./tabs-2-demo";
import {TextfieldDemo} from "./textfield-demo";
import {UIComponentsDemo} from "./ui-components-demo";
import {XProfileDemo} from "./x-profile-demo";

export function DemoComponents() {
  return (
    <div className="@container/demo mx-auto w-full max-w-[1296px] px-4 py-8 sm:py-24">
      <div className="mx-auto grid w-full max-w-[400px] grid-cols-1 gap-8 @min-[672px]/demo:max-w-[832px] @min-[672px]/demo:grid-cols-2 @min-[1024px]/demo:max-w-none @min-[1024px]/demo:grid-cols-3">
        {/* Left */}
        <div className="flex min-w-0 flex-col items-center gap-10">
          <TextfieldDemo />
          <SelectDemo />
          <UIComponentsDemo />
          <SliderDemo />
          <TabsDemo1 />
          <TabsDemo2 />
          <ListBoxDemo />
        </div>
        {/* Center */}
        <div className="flex min-w-0 flex-col items-center gap-10">
          <AvatarGroupDemo />
          <InputOTPDemo />
          <ButtonsDemo />
          <XProfileDemo />
          <AlertDemo />
          <AllowNotificationsDemo />
        </div>
        {/* Right */}
        <div className="flex min-w-0 flex-col items-center gap-10">
          <LoginDemo />
          <SubtleCardsDemo />
          <AlertDialogDemo />
        </div>
      </div>
    </div>
  );
}
