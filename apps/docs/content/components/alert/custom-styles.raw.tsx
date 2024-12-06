import type {AlertProps} from "@nextui-org/react";

import React from "react";
import {Alert, Button, cn} from "@nextui-org/react";

const CustomAlert = ({children, variant, color, className, classNames, ...props}: AlertProps) => {
  const colorClass = React.useMemo(() => {
    switch (color) {
      case "default":
        return "before:bg-default-300";
      case "primary":
        return "before:bg-primary";
      case "secondary":
        return "before:bg-secondary";
      case "success":
        return "before:bg-success";
      case "warning":
        return "before:bg-warning";
      case "danger":
        return "before:bg-danger";
      default:
        return "before:bg-default-200";
    }
  }, []);

  return (
    <Alert
      classNames={{
        ...classNames,
        base: cn(
          [
            "bg-default-50 dark:bg-background shadow-sm",
            "border-1 border-default-200 dark:border-default-100",
            "relative before:content-[''] before:absolute before:z-10",
            "before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1",
            "rounded-l-none border-l-0",
            colorClass,
          ],
          classNames?.base,
          className,
        ),
        mainWrapper: cn("pt-1", classNames?.mainWrapper),
        iconWrapper: cn("dark:bg-transparent", classNames?.iconWrapper),
      }}
      color={color}
      variant={variant}
      {...props}
    >
      {children}
    </Alert>
  );
};

CustomAlert.displayName = "CustomAlert";

export default function App() {
  const colors = ["default", "primary", "secondary", "success", "warning", "danger"] as any;

  return (
    <div className="flex flex-col w-full gap-y-6">
      {colors.map((color) => (
        <CustomAlert
          key={color}
          color={color}
          description="The documents you requested are ready to be viewed"
        >
          <div className="flex items-center gap-1 mt-3">
            <Button
              className="bg-background text-default-700 font-medium border-1 shadow-small"
              size="sm"
              variant="bordered"
            >
              View documents
            </Button>
            <Button
              className="text-default-500 font-medium underline underline-offset-4"
              size="sm"
              variant="light"
            >
              Maybe later
            </Button>
          </div>
        </CustomAlert>
      ))}
    </div>
  );
}
