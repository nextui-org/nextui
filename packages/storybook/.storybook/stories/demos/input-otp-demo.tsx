import {InputOTP, Label, Link} from "@heroui/react";
import React, {useState} from "react";

export function InputOTPDemo() {
  // HERO - 4320 - easter egg
  const [value, setValue] = useState("4320");

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-[280px] flex-col items-start justify-center gap-2">
        <div className="flex flex-col items-start gap-1">
          <Label>Verify account</Label>
          <p className="text-sm text-muted">We&apos;ve sent a code to a****@gmail.com</p>
        </div>
        <InputOTP maxLength={6} value={value} onChange={setValue}>
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP.Group>
        </InputOTP>
        <div className="flex flex-wrap items-center gap-[5px] px-1 pt-1">
          <p className="text-sm text-muted">Didn&apos;t receive a code?</p>
          <Link className="text-foreground" underline="always">
            Resend
          </Link>
        </div>
      </div>
    </div>
  );
}
