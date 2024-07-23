import type {DateInputReturnType, DateInputSlots, SlotsToClasses} from "@nextui-org/theme";

import {HTMLNextUIProps} from "@nextui-org/system";
import {useDateSegment} from "@react-aria/datepicker";
import {DateFieldState, DateSegment} from "@react-stately/datepicker";
import {mergeProps} from "@react-aria/utils";
import {useRef} from "react";
import {dataAttr} from "@nextui-org/shared-utils";

export interface DateInputSegmentProps extends HTMLNextUIProps<"div"> {
  state: DateFieldState;
  segment: DateSegment;
  slots: DateInputReturnType;
  classNames?: SlotsToClasses<DateInputSlots>;
}

export const DateInputSegment: React.FC<DateInputSegmentProps> = ({
  state,
  segment,
  slots,
  classNames,
  ...otherProps
}) => {
  const ref = useRef(null);

  let {segmentProps} = useDateSegment(segment, state, ref);

  return (
    <div
      {...mergeProps(segmentProps, otherProps)}
      ref={ref}
      className={slots.segment({
        class: classNames?.segment,
      })}
      data-editable={dataAttr(segment.isEditable)}
      data-invalid={dataAttr(state.isInvalid)}
      data-placeholder={dataAttr(segment.isPlaceholder)}
      data-slot="segment"
      data-type={segment.type}
      style={{
        ...segmentProps.style,
      }}
    >
      {segment.text}
    </div>
  );
};
