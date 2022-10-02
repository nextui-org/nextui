export type HideShowInType = "xs" | "sm" | "md" | "lg" | "xl";

export interface HideShowInProps {
  /**
   * Whether the Text should be visible only from selected breakpoint.
   */
  showIn?: HideShowInType;
  /**
   * 	Whether the Text should be hidden from selected breakpoint.
   */
  hideIn?: HideShowInType;
}
