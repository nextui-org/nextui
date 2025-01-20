import type {HTMLNextUIProps} from "@nextui-org/system";

import {useCalendarContext} from "./calendar-context";

export interface CalendarCellContentProps extends HTMLNextUIProps<"div"> {
  children: React.ReactNode;
}

export const CalendarCellContent = ({children, ...props}: CalendarCellContentProps) => {
  const {slots, classNames} = useCalendarContext();

  return (
    <div
      className={slots?.cellContent({class: classNames?.cellContent})}
      data-slot="cell-content"
      {...props}
    >
      {children}
    </div>
  );
};

CalendarCellContent.displayName = "NextUI.CalendarCellContent";

export default CalendarCellContent;
