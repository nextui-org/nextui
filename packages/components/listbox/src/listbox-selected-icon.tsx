export interface MenuSelectedIconProps {
  isSelected: boolean;
  disableAnimation?: boolean;
}

export function ListboxSelectedIcon(props: MenuSelectedIconProps) {
  const {isSelected, disableAnimation, ...otherProps} = props;

  return (
    <svg
      aria-hidden="true"
      data-selected={isSelected}
      role="presentation"
      viewBox="0 0 17 18"
      {...otherProps}
    >
      <polyline
        fill="none"
        points="1 9 7 14 15 4"
        stroke="currentColor"
        strokeDasharray={22}
        strokeDashoffset={isSelected ? 44 : 66}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        style={
          !disableAnimation
            ? {
                transition: "stroke-dashoffset 200ms ease",
              }
            : {}
        }
      />
    </svg>
  );
}
