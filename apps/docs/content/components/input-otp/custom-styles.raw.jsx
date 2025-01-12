import {InputOtp} from "@heroui/react";

export default function App() {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <InputOtp
        classNames={{
          segmentWrapper: "gap-x-0",
          segment: [
            "relative",
            "h-10",
            "w-10",
            "border-y",
            "border-r",
            "first:rounded-l-md",
            "first:border-l",
            "last:rounded-r-md",
            "border-default-200",
            "data-[active=true]:border",
            "data-[active=true]:z-20",
            "data-[active=true]:ring-2",
            "data-[active=true]:ring-offset-2",
            "data-[active=true]:ring-offset-background",
            "data-[active=true]:ring-foreground",
          ],
        }}
        description="Enter the 4 digit code sent to your email"
        length={4}
        radius="none"
      />
    </div>
  );
}
