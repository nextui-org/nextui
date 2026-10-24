"use client";

import type {InputOTPVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {ValidationResult} from "react-aria-components/CheckboxGroup";

import {inputOTPVariants} from "@heroui/styles";
import {OTPInput, OTPInputContext} from "input-otp";
import React, {createContext, use} from "react";
import {FieldErrorContext} from "react-aria-components/FieldError";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName} from "../../utils/compose";

const EMPTY_VALIDATION_ERRORS: string[] = [];

/* -------------------------------------------------------------------------------------------------
 * Input OTP Context
 * -----------------------------------------------------------------------------------------------*/
interface InputOTPContext {
  slots?: ReturnType<typeof inputOTPVariants>;
  isDisabled?: boolean;
  isInvalid?: boolean;
}

const InputOTPContext = createContext<InputOTPContext>({
  isDisabled: false,
  isInvalid: false,
});

/* -------------------------------------------------------------------------------------------------
 * Input OTP Root
 * -----------------------------------------------------------------------------------------------*/
interface InputOTPRootProps
  extends
    Omit<ComponentPropsWithRef<typeof OTPInput>, "disabled" | "containerClassName" | "render">,
    InputOTPVariants {
  isDisabled?: boolean;
  isInvalid?: boolean;
  validationErrors?: string[];
  validationDetails?: ValidityState;
  inputClassName?: string;
  children: React.ReactNode;
}

const InputOTPRoot = ({
  className,
  inputClassName,
  isDisabled = false,
  isInvalid = false,
  validationDetails,
  validationErrors = EMPTY_VALIDATION_ERRORS,
  variant,
  ...props
}: InputOTPRootProps) => {
  const slots = React.useMemo(() => inputOTPVariants({variant}), [variant]);

  const validation = React.useMemo(
    () =>
      ({
        isInvalid,
        validationErrors,
        validationDetails,
      }) as ValidationResult,
    [isInvalid, validationErrors, validationDetails],
  );
  const contextValue = React.useMemo(
    () => ({slots, isDisabled, isInvalid}),
    [slots, isDisabled, isInvalid],
  );

  return (
    <InputOTPContext value={contextValue}>
      <FieldErrorContext value={validation}>
        <OTPInput
          // OTP Input package uses the `className` prop for the actual `input` element which is not visible to the user so no need to pass it to the base container
          className={slots.input({className: inputClassName})}
          containerClassName={slots.base({className})}
          data-disabled={dataAttr(isDisabled)}
          data-invalid={dataAttr(isInvalid)}
          data-slot="input-otp"
          disabled={isDisabled}
          {...props}
        />
      </FieldErrorContext>
    </InputOTPContext>
  );
};

InputOTPRoot.displayName = "HeroUI.InputOTP";

/* -------------------------------------------------------------------------------------------------
 * Input OTP Group
 * -----------------------------------------------------------------------------------------------*/

interface InputOTPGroupProps extends ComponentPropsWithRef<"div"> {}

const InputOTPGroup = ({className, ...props}: InputOTPGroupProps) => {
  const {slots} = use(InputOTPContext);

  return (
    <div
      className={composeSlotClassName(slots?.group, className)}
      data-slot="input-otp-group"
      {...props}
    />
  );
};

InputOTPGroup.displayName = "HeroUI.InputOTP.Group";

/* -------------------------------------------------------------------------------------------------
 * Input OTP Slot
 * -----------------------------------------------------------------------------------------------*/
interface InputOTPSlotProps extends ComponentPropsWithRef<"div"> {
  index: number;
}

const InputOTPSlot = ({className, index, ...props}: InputOTPSlotProps) => {
  const {isDisabled, isInvalid, slots} = use(InputOTPContext);

  const inputOTPContext = use(OTPInputContext);
  const {char, hasFakeCaret, isActive} = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      {...props}
      className={composeSlotClassName(slots?.slot, className)}
      data-active={dataAttr(isActive)}
      data-disabled={dataAttr(isDisabled)}
      data-filled={dataAttr(!!char)}
      data-invalid={dataAttr(isInvalid)}
      data-slot="input-otp-slot"
    >
      {char ? (
        <div className={slots?.slotValue()} data-slot="input-otp-slot-value">
          {char}
        </div>
      ) : null}
      {hasFakeCaret && isActive ? (
        <div className={slots?.caret()} data-slot="input-otp-caret" />
      ) : null}
    </div>
  );
};

InputOTPSlot.displayName = "HeroUI.InputOTP.Slot";

/* -------------------------------------------------------------------------------------------------
 * Input OTP Separator
 * -----------------------------------------------------------------------------------------------*/
interface InputOTPSeparatorProps extends ComponentPropsWithRef<"div"> {
  className?: string;
}

const InputOTPSeparator = ({className, ...props}: InputOTPSeparatorProps) => {
  const {slots} = use(InputOTPContext);

  return (
    <div
      className={composeSlotClassName(slots?.separator, className)}
      data-slot="input-otp-separator"
      {...props}
    />
  );
};

InputOTPSeparator.displayName = "HeroUI.InputOTP.Separator";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {InputOTPRoot, InputOTPGroup, InputOTPSlot, InputOTPSeparator};

export type {InputOTPRootProps, InputOTPGroupProps, InputOTPSlotProps, InputOTPSeparatorProps};
