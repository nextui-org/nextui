import type {UseCheckboxReturn} from "./use-checkbox";

type CheckboxIconProps = Partial<ReturnType<UseCheckboxReturn["getIconProps"]>>;

function CheckIcon(props: CheckboxIconProps) {
  return (
    <svg aria-hidden="true" role="presentation" viewBox="0 0 17 18" {...props}>
      <polyline
        fill="none"
        points="1 9 7 14 15 4"
        stroke="currentColor"
        strokeDasharray={22}
        strokeDashoffset={props.isSelected ? 44 : 66}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        style={
          !props.disableAnimation
            ? {
                transition: "stroke-dashoffset 250ms ease 0s",
                transitionDelay: "250ms",
              }
            : {}
        }
      />
    </svg>
  );
}

function IndeterminateIcon(props: CheckboxIconProps) {
  return (
    <svg stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24" {...props}>
      <line x1="21" x2="3" y1="12" y2="12" />
    </svg>
  );
}

/**
 * CheckboxIcon is used to visually indicate the checked or indeterminate
 * state of a checkbox.
 */
export function CheckboxIcon(props: CheckboxIconProps) {
  const BaseIcon = props.isIndeterminate ? IndeterminateIcon : CheckIcon;

  return <BaseIcon {...props} />;
}
