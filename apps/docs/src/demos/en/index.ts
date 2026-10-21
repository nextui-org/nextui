/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
import type {DemoItem} from "@/demos";

export const demos: Record<string, DemoItem> = {
  // Accordion Demo
  "accordion-basic": {
    loader: () => import("./accordion/basic").then((m) => m.Basic),
    file: "en/accordion/basic.tsx",
  },
  "accordion-surface": {
    loader: () => import("./accordion/surface").then((m) => m.Surface),
    file: "en/accordion/surface.tsx",
  },
  "accordion-without-separator": {
    loader: () => import("./accordion/without-separator").then((m) => m.WithoutSeparator),
    file: "en/accordion/without-separator.tsx",
  },
  "accordion-multiple": {
    loader: () => import("./accordion/multiple").then((m) => m.Multiple),
    file: "en/accordion/multiple.tsx",
  },
  "accordion-disabled": {
    loader: () => import("./accordion/disabled").then((m) => m.Disabled),
    file: "en/accordion/disabled.tsx",
  },
  "accordion-controlled": {
    loader: () => import("./accordion/controlled").then((m) => m.Controlled),
    file: "en/accordion/controlled.tsx",
  },
  "accordion-custom-indicator": {
    loader: () => import("./accordion/custom-indicator").then((m) => m.CustomIndicator),
    file: "en/accordion/custom-indicator.tsx",
  },
  "accordion-render-function": {
    loader: () => import("./accordion/render-function").then((m) => m.RenderFunction),
    file: "en/accordion/render-function.tsx",
  },
  "accordion-faq": {
    loader: () => import("./accordion/faq").then((m) => m.FAQ),
    file: "en/accordion/faq.tsx",
  },
  "accordion-custom-styles": {
    loader: () => import("./accordion/custom-styles").then((m) => m.CustomStyles),
    file: "en/accordion/custom-styles.tsx",
  },

  // Alert Demo
  "alert-basic": {
    loader: () => import("./alert/basic").then((m) => m.Basic),
    file: "en/alert/basic.tsx",
  },
  "alert-custom-styles": {
    loader: () => import("./alert/custom-styles").then((m) => m.CustomStyles),
    file: "en/alert/custom-styles.tsx",
  },

  // AlertDialog Demo
  "alert-dialog-default": {
    loader: () => import("./alert-dialog/default").then((m) => m.Default),
    file: "en/alert-dialog/default.tsx",
  },
  "alert-dialog-statuses": {
    loader: () => import("./alert-dialog/statuses").then((m) => m.Statuses),
    file: "en/alert-dialog/statuses.tsx",
  },
  "alert-dialog-placements": {
    loader: () => import("./alert-dialog/placements").then((m) => m.Placements),
    file: "en/alert-dialog/placements.tsx",
  },
  "alert-dialog-sizes": {
    loader: () => import("./alert-dialog/sizes").then((m) => m.Sizes),
    file: "en/alert-dialog/sizes.tsx",
  },
  "alert-dialog-controlled": {
    loader: () => import("./alert-dialog/controlled").then((m) => m.Controlled),
    file: "en/alert-dialog/controlled.tsx",
  },
  "alert-dialog-custom-icon": {
    loader: () => import("./alert-dialog/custom-icon").then((m) => m.CustomIcon),
    file: "en/alert-dialog/custom-icon.tsx",
  },
  "alert-dialog-custom-trigger": {
    loader: () => import("./alert-dialog/custom-trigger").then((m) => m.CustomTrigger),
    file: "en/alert-dialog/custom-trigger.tsx",
  },
  "alert-dialog-backdrop-variants": {
    loader: () => import("./alert-dialog/backdrop-variants").then((m) => m.BackdropVariants),
    file: "en/alert-dialog/backdrop-variants.tsx",
  },
  "alert-dialog-custom-backdrop": {
    loader: () => import("./alert-dialog/custom-backdrop").then((m) => m.CustomBackdrop),
    file: "en/alert-dialog/custom-backdrop.tsx",
  },
  "alert-dialog-dismiss-behavior": {
    loader: () => import("./alert-dialog/dismiss-behavior").then((m) => m.DismissBehavior),
    file: "en/alert-dialog/dismiss-behavior.tsx",
  },
  "alert-dialog-close-methods": {
    loader: () => import("./alert-dialog/close-methods").then((m) => m.CloseMethods),
    file: "en/alert-dialog/close-methods.tsx",
  },
  "alert-dialog-custom-animations": {
    loader: () => import("./alert-dialog/custom-animations").then((m) => m.CustomAnimations),
    file: "en/alert-dialog/custom-animations.tsx",
  },
  "alert-dialog-custom-portal": {
    loader: () => import("./alert-dialog/custom-portal").then((m) => m.CustomPortal),
    file: "en/alert-dialog/custom-portal.tsx",
  },
  "alert-dialog-custom-styles": {
    loader: () => import("./alert-dialog/custom-styles").then((m) => m.CustomStyles),
    file: "en/alert-dialog/custom-styles.tsx",
  },

  // Autocomplete Demo
  "autocomplete-default": {
    loader: () => import("./autocomplete/default").then((m) => m.default),
    file: "en/autocomplete/default.tsx",
  },
  "autocomplete-variants": {
    loader: () => import("./autocomplete/variants").then((m) => m.Variants),
    file: "en/autocomplete/variants.tsx",
  },
  "autocomplete-full-width": {
    loader: () => import("./autocomplete/full-width").then((m) => m.FullWidth),
    file: "en/autocomplete/full-width.tsx",
  },
  "autocomplete-with-description": {
    loader: () => import("./autocomplete/with-description").then((m) => m.WithDescription),
    file: "en/autocomplete/with-description.tsx",
  },
  "autocomplete-required": {
    loader: () => import("./autocomplete/required").then((m) => m.Required),
    file: "en/autocomplete/required.tsx",
  },
  "autocomplete-disabled": {
    loader: () => import("./autocomplete/disabled").then((m) => m.Disabled),
    file: "en/autocomplete/disabled.tsx",
  },
  "autocomplete-with-disabled-options": {
    loader: () => import("./autocomplete/with-disabled-options").then((m) => m.WithDisabledOptions),
    file: "en/autocomplete/with-disabled-options.tsx",
  },
  "autocomplete-allows-empty-collection": {
    loader: () =>
      import("./autocomplete/allows-empty-collection").then((m) => m.AllowsEmptyCollection),
    file: "en/autocomplete/allows-empty-collection.tsx",
  },
  "autocomplete-with-sections": {
    loader: () => import("./autocomplete/with-sections").then((m) => m.WithSections),
    file: "en/autocomplete/with-sections.tsx",
  },
  "autocomplete-multiple-select": {
    loader: () => import("./autocomplete/multiple-select").then((m) => m.MultipleSelect),
    file: "en/autocomplete/multiple-select.tsx",
  },
  "autocomplete-controlled": {
    loader: () => import("./autocomplete/controlled").then((m) => m.Controlled),
    file: "en/autocomplete/controlled.tsx",
  },
  "autocomplete-controlled-multiple": {
    loader: () => import("./autocomplete/controlled-multiple").then((m) => m.ControlledMultiple),
    file: "en/autocomplete/controlled-multiple.tsx",
  },
  "autocomplete-controlled-open-state": {
    loader: () => import("./autocomplete/controlled-open-state").then((m) => m.ControlledOpenState),
    file: "en/autocomplete/controlled-open-state.tsx",
  },
  "autocomplete-asynchronous-filtering": {
    loader: () =>
      import("./autocomplete/asynchronous-filtering").then((m) => m.AsynchronousFiltering),
    file: "en/autocomplete/asynchronous-filtering.tsx",
  },
  "autocomplete-custom-indicator": {
    loader: () => import("./autocomplete/custom-indicator").then((m) => m.CustomIndicator),
    file: "en/autocomplete/custom-indicator.tsx",
  },
  "autocomplete-custom-value": {
    loader: () => import("./autocomplete/custom-value").then((m) => m.CustomValue),
    file: "en/autocomplete/custom-value.tsx",
  },
  "autocomplete-on-surface": {
    loader: () => import("./autocomplete/on-surface").then((m) => m.OnSurface),
    file: "en/autocomplete/on-surface.tsx",
  },
  "autocomplete-virtualization": {
    loader: () => import("./autocomplete/virtualization").then((m) => m.Virtualization),
    file: "en/autocomplete/virtualization.tsx",
  },
  "autocomplete-user-selection": {
    loader: () => import("./autocomplete/user-selection").then((m) => m.UserSelection),
    file: "en/autocomplete/user-selection.tsx",
  },
  "autocomplete-user-selection-multiple": {
    loader: () =>
      import("./autocomplete/user-selection-multiple").then((m) => m.UserSelectionMultiple),
    file: "en/autocomplete/user-selection-multiple.tsx",
  },
  "autocomplete-location-search": {
    loader: () => import("./autocomplete/location-search").then((m) => m.LocationSearch),
    file: "en/autocomplete/location-search.tsx",
  },
  "autocomplete-tag-group-selection": {
    loader: () => import("./autocomplete/tag-group-selection").then((m) => m.TagGroupSelection),
    file: "en/autocomplete/tag-group-selection.tsx",
  },
  "autocomplete-email-recipients": {
    loader: () => import("./autocomplete/email-recipients").then((m) => m.EmailRecipients),
    file: "en/autocomplete/email-recipients.tsx",
  },
  "autocomplete-custom-styles": {
    loader: () => import("./autocomplete/custom-styles").then((m) => m.CustomStyles),
    file: "en/autocomplete/custom-styles.tsx",
  },

  // Avatar Demo
  "avatar-basic": {
    loader: () => import("./avatar/basic").then((m) => m.Basic),
    file: "en/avatar/basic.tsx",
  },
  "avatar-sizes": {
    loader: () => import("./avatar/sizes").then((m) => m.Sizes),
    file: "en/avatar/sizes.tsx",
  },
  "avatar-colors": {
    loader: () => import("./avatar/colors").then((m) => m.Colors),
    file: "en/avatar/colors.tsx",
  },
  "avatar-variants": {
    loader: () => import("./avatar/variants").then((m) => m.Variants),
    file: "en/avatar/variants.tsx",
  },
  "avatar-fallback": {
    loader: () => import("./avatar/fallback").then((m) => m.Fallback),
    file: "en/avatar/fallback.tsx",
  },
  "avatar-custom-styles": {
    loader: () => import("./avatar/custom-styles").then((m) => m.CustomStyles),
    file: "en/avatar/custom-styles.tsx",
  },
  "avatar-custom-image-component": {
    loader: () => import("./avatar/custom-image-component").then((m) => m.CustomImageComponent),
    file: "en/avatar/custom-image-component.tsx",
  },

  // AvatarGroup Demo
  "avatar-group-basic": {
    loader: () => import("./avatar-group/basic").then((m) => m.Basic),
    file: "en/avatar-group/basic.tsx",
  },
  "avatar-group-max": {
    loader: () => import("./avatar-group/max").then((m) => m.Max),
    file: "en/avatar-group/max.tsx",
  },
  "avatar-group-count": {
    loader: () => import("./avatar-group/count").then((m) => m.Count),
    file: "en/avatar-group/count.tsx",
  },
  "avatar-group-sizes": {
    loader: () => import("./avatar-group/sizes").then((m) => m.Sizes),
    file: "en/avatar-group/sizes.tsx",
  },
  "avatar-group-grid": {
    loader: () => import("./avatar-group/grid").then((m) => m.Grid),
    file: "en/avatar-group/grid.tsx",
  },
  "avatar-group-custom-styles": {
    loader: () => import("./avatar-group/custom-styles").then((m) => m.CustomStyles),
    file: "en/avatar-group/custom-styles.tsx",
  },

  "avatar-group-overlap": {
    loader: () => import("./avatar-group/overlap").then((m) => m.Overlap),
    file: "en/avatar-group/overlap.tsx",
  },

  // Badge Demo
  "badge-basic": {
    loader: () => import("./badge/basic").then((m) => m.BadgeBasic),
    file: "en/badge/basic.tsx",
  },
  "badge-variants": {
    loader: () => import("./badge/variants").then((m) => m.BadgeVariants),
    file: "en/badge/variants.tsx",
  },
  "badge-sizes": {
    loader: () => import("./badge/sizes").then((m) => m.BadgeSizes),
    file: "en/badge/sizes.tsx",
  },
  "badge-colors": {
    loader: () => import("./badge/colors").then((m) => m.BadgeColors),
    file: "en/badge/colors.tsx",
  },
  "badge-placements": {
    loader: () => import("./badge/placements").then((m) => m.BadgePlacements),
    file: "en/badge/placements.tsx",
  },
  "badge-dot": {
    loader: () => import("./badge/dot").then((m) => m.BadgeDot),
    file: "en/badge/dot.tsx",
  },
  "badge-with-content": {
    loader: () => import("./badge/with-content").then((m) => m.BadgeWithContent),
    file: "en/badge/with-content.tsx",
  },
  "badge-custom-styles": {
    loader: () => import("./badge/custom-styles").then((m) => m.CustomStyles),
    file: "en/badge/custom-styles.tsx",
  },

  // Breadcrumbs Demo
  "breadcrumbs-basic": {
    loader: () => import("./breadcrumbs/basic").then((m) => m.default),
    file: "en/breadcrumbs/basic.tsx",
  },
  "breadcrumbs-level-2": {
    loader: () => import("./breadcrumbs/level-2").then((m) => m.default),
    file: "en/breadcrumbs/level-2.tsx",
  },
  "breadcrumbs-level-3": {
    loader: () => import("./breadcrumbs/level-3").then((m) => m.default),
    file: "en/breadcrumbs/level-3.tsx",
  },
  "breadcrumbs-disabled": {
    loader: () => import("./breadcrumbs/disabled").then((m) => m.default),
    file: "en/breadcrumbs/disabled.tsx",
  },
  "breadcrumbs-custom-separator": {
    loader: () => import("./breadcrumbs/custom-separator").then((m) => m.default),
    file: "en/breadcrumbs/custom-separator.tsx",
  },
  "breadcrumbs-render-function": {
    loader: () => import("./breadcrumbs/render-function").then((m) => m.RenderFunction),
    file: "en/breadcrumbs/render-function.tsx",
  },
  "breadcrumbs-custom-styles": {
    loader: () => import("./breadcrumbs/custom-styles").then((m) => m.CustomStyles),
    file: "en/breadcrumbs/custom-styles.tsx",
  },

  // Button Demo
  "button-basic": {
    loader: () => import("./button/basic").then((m) => m.Basic),
    file: "en/button/basic.tsx",
  },
  "button-variants": {
    loader: () => import("./button/variants").then((m) => m.Variants),
    file: "en/button/variants.tsx",
  },
  "button-sizes": {
    loader: () => import("./button/sizes").then((m) => m.Sizes),
    file: "en/button/sizes.tsx",
  },
  "button-with-icons": {
    loader: () => import("./button/with-icons").then((m) => m.WithIcons),
    file: "en/button/with-icons.tsx",
  },
  "button-icon-only": {
    loader: () => import("./button/icon-only").then((m) => m.IconOnly),
    file: "en/button/icon-only.tsx",
  },
  "button-loading": {
    loader: () => import("./button/loading").then((m) => m.Loading),
    file: "en/button/loading.tsx",
  },
  "button-loading-state": {
    loader: () => import("./button/loading-state").then((m) => m.LoadingState),
    file: "en/button/loading-state.tsx",
  },
  "button-full-width": {
    loader: () => import("./button/full-width").then((m) => m.FullWidth),
    file: "en/button/full-width.tsx",
  },
  "button-disabled": {
    loader: () => import("./button/disabled").then((m) => m.Disabled),
    file: "en/button/disabled.tsx",
  },
  "button-social": {
    loader: () => import("./button/social").then((m) => m.Social),
    file: "en/button/social.tsx",
  },
  "button-render-function": {
    loader: () => import("./button/render-function").then((m) => m.RenderFunction),
    file: "en/button/render-function.tsx",
  },
  "button-custom-variants": {
    loader: () => import("./button/custom-variants").then((m) => m.CustomVariants),
    file: "en/button/custom-variants.tsx",
  },
  "button-ripple-effect": {
    loader: () => import("./button/ripple-effect").then((m) => m.RippleEffect),
    file: "en/button/ripple-effect.tsx",
  },
  "button-custom-styles": {
    loader: () => import("./button/custom-styles").then((m) => m.CustomStyles),
    file: "en/button/custom-styles.tsx",
  },

  // ButtonGroup Demo
  "button-group-basic": {
    loader: () => import("./button-group/basic").then((m) => m.Basic),
    file: "en/button-group/basic.tsx",
  },
  "button-group-variants": {
    loader: () => import("./button-group/variants").then((m) => m.Variants),
    file: "en/button-group/variants.tsx",
  },
  "button-group-sizes": {
    loader: () => import("./button-group/sizes").then((m) => m.Sizes),
    file: "en/button-group/sizes.tsx",
  },
  "button-group-orientation": {
    loader: () => import("./button-group/orientation").then((m) => m.Orientation),
    file: "en/button-group/orientation.tsx",
  },
  "button-group-with-icons": {
    loader: () => import("./button-group/with-icons").then((m) => m.WithIcons),
    file: "en/button-group/with-icons.tsx",
  },
  "button-group-full-width": {
    loader: () => import("./button-group/full-width").then((m) => m.FullWidth),
    file: "en/button-group/full-width.tsx",
  },
  "button-group-disabled": {
    loader: () => import("./button-group/disabled").then((m) => m.Disabled),
    file: "en/button-group/disabled.tsx",
  },
  "button-group-without-separator": {
    loader: () => import("./button-group/without-separator").then((m) => m.WithoutSeparator),
    file: "en/button-group/without-separator.tsx",
  },
  "button-group-custom-styles": {
    loader: () => import("./button-group/custom-styles").then((m) => m.CustomStyles),
    file: "en/button-group/custom-styles.tsx",
  },

  // Calendar Demo
  "calendar-basic": {
    loader: () => import("./calendar/basic").then((m) => m.Basic),
    file: "en/calendar/basic.tsx",
  },
  "calendar-disabled": {
    loader: () => import("./calendar/disabled").then((m) => m.Disabled),
    file: "en/calendar/disabled.tsx",
  },
  "calendar-read-only": {
    loader: () => import("./calendar/read-only").then((m) => m.ReadOnly),
    file: "en/calendar/read-only.tsx",
  },
  "calendar-default-value": {
    loader: () => import("./calendar/default-value").then((m) => m.DefaultValue),
    file: "en/calendar/default-value.tsx",
  },
  "calendar-year-picker": {
    loader: () => import("./calendar/year-picker").then((m) => m.YearPicker),
    file: "en/calendar/year-picker.tsx",
  },
  "calendar-controlled": {
    loader: () => import("./calendar/controlled").then((m) => m.Controlled),
    file: "en/calendar/controlled.tsx",
  },
  "calendar-min-max-dates": {
    loader: () => import("./calendar/min-max-dates").then((m) => m.MinMaxDates),
    file: "en/calendar/min-max-dates.tsx",
  },
  "calendar-unavailable-dates": {
    loader: () => import("./calendar/unavailable-dates").then((m) => m.UnavailableDates),
    file: "en/calendar/unavailable-dates.tsx",
  },
  "calendar-weeks-in-month": {
    loader: () => import("./calendar/weeks-in-month").then((m) => m.WeeksInMonth),
    file: "en/calendar/weeks-in-month.tsx",
  },
  "calendar-week-view": {
    loader: () => import("./calendar/week-view").then((m) => m.WeekView),
    file: "en/calendar/week-view.tsx",
  },
  "calendar-day-view": {
    loader: () => import("./calendar/day-view").then((m) => m.DayView),
    file: "en/calendar/day-view.tsx",
  },
  "calendar-multiple-selection": {
    loader: () => import("./calendar/multiple-selection").then((m) => m.MultipleSelection),
    file: "en/calendar/multiple-selection.tsx",
  },
  "calendar-focused-value": {
    loader: () => import("./calendar/focused-value").then((m) => m.FocusedValue),
    file: "en/calendar/focused-value.tsx",
  },
  "calendar-with-indicators": {
    loader: () => import("./calendar/with-indicators").then((m) => m.WithIndicators),
    file: "en/calendar/with-indicators.tsx",
  },
  "calendar-custom-icons": {
    loader: () => import("./calendar/custom-icons").then((m) => m.CustomIcons),
    file: "en/calendar/custom-icons.tsx",
  },
  "calendar-multiple-months": {
    loader: () => import("./calendar/multiple-months").then((m) => m.MultipleMonths),
    file: "en/calendar/multiple-months.tsx",
  },
  "calendar-booking-calendar": {
    loader: () => import("./calendar/booking-calendar").then((m) => m.BookingCalendar),
    file: "en/calendar/booking-calendar.tsx",
  },
  "calendar-international-calendar": {
    loader: () => import("./calendar/international-calendar").then((m) => m.InternationalCalendar),
    file: "en/calendar/international-calendar.tsx",
  },
  "calendar-custom-styles": {
    loader: () => import("./calendar/custom-styles").then((m) => m.CustomStyles),
    file: "en/calendar/custom-styles.tsx",
  },

  // Card Demo
  "card-default": {
    loader: () => import("./card/default").then((m) => m.Default),
    file: "en/card/default.tsx",
  },
  "card-variants": {
    loader: () => import("./card/variants").then((m) => m.Variants),
    file: "en/card/variants.tsx",
  },
  "card-horizontal": {
    loader: () => import("./card/horizontal").then((m) => m.Horizontal),
    file: "en/card/horizontal.tsx",
  },
  "card-with-avatar": {
    loader: () => import("./card/with-avatar").then((m) => m.WithAvatar),
    file: "en/card/with-avatar.tsx",
  },
  "card-with-images": {
    loader: () => import("./card/with-images").then((m) => m.WithImages),
    file: "en/card/with-images.tsx",
  },
  "card-with-form": {
    loader: () => import("./card/with-form").then((m) => m.WithForm),
    file: "en/card/with-form.tsx",
  },
  "card-custom-styles": {
    loader: () => import("./card/custom-styles").then((m) => m.CustomStyles),
    file: "en/card/custom-styles.tsx",
  },

  // Checkbox Demo
  "checkbox-basic": {
    loader: () => import("./checkbox/basic").then((m) => m.Basic),
    file: "en/checkbox/basic.tsx",
  },
  "checkbox-variants": {
    loader: () => import("./checkbox/variants").then((m) => m.Variants),
    file: "en/checkbox/variants.tsx",
  },
  "checkbox-full-rounded": {
    loader: () => import("./checkbox/full-rounded").then((m) => m.FullRounded),
    file: "en/checkbox/full-rounded.tsx",
  },
  "checkbox-disabled": {
    loader: () => import("./checkbox/disabled").then((m) => m.Disabled),
    file: "en/checkbox/disabled.tsx",
  },
  "checkbox-external-label": {
    loader: () => import("./checkbox/external-label").then((m) => m.ExternalLabel),
    file: "en/checkbox/external-label.tsx",
  },
  "checkbox-with-description": {
    loader: () => import("./checkbox/with-description").then((m) => m.WithDescription),
    file: "en/checkbox/with-description.tsx",
  },
  "checkbox-default-selected": {
    loader: () => import("./checkbox/default-selected").then((m) => m.DefaultSelected),
    file: "en/checkbox/default-selected.tsx",
  },
  "checkbox-invalid": {
    loader: () => import("./checkbox/invalid").then((m) => m.Invalid),
    file: "en/checkbox/invalid.tsx",
  },
  "checkbox-controlled": {
    loader: () => import("./checkbox/controlled").then((m) => m.Controlled),
    file: "en/checkbox/controlled.tsx",
  },
  "checkbox-indeterminate": {
    loader: () => import("./checkbox/indeterminate").then((m) => m.Indeterminate),
    file: "en/checkbox/indeterminate.tsx",
  },
  "checkbox-form": {
    loader: () => import("./checkbox/form").then((m) => m.Form),
    file: "en/checkbox/form.tsx",
  },
  "checkbox-render-props": {
    loader: () => import("./checkbox/render-props").then((m) => m.RenderProps),
    file: "en/checkbox/render-props.tsx",
  },
  "checkbox-render-function": {
    loader: () => import("./checkbox/render-function").then((m) => m.RenderFunction),
    file: "en/checkbox/render-function.tsx",
  },
  "checkbox-custom-indicator": {
    loader: () => import("./checkbox/custom-indicator").then((m) => m.CustomIndicator),
    file: "en/checkbox/custom-indicator.tsx",
  },
  "checkbox-custom-styles": {
    loader: () => import("./checkbox/custom-styles").then((m) => m.CustomStyles),
    file: "en/checkbox/custom-styles.tsx",
  },

  // CheckboxGroup Demo
  "checkbox-group-basic": {
    loader: () => import("./checkbox-group/basic").then((m) => m.Basic),
    file: "en/checkbox-group/basic.tsx",
  },
  "checkbox-group-on-surface": {
    loader: () => import("./checkbox-group/on-surface").then((m) => m.OnSurface),
    file: "en/checkbox-group/on-surface.tsx",
  },
  "checkbox-group-disabled": {
    loader: () => import("./checkbox-group/disabled").then((m) => m.Disabled),
    file: "en/checkbox-group/disabled.tsx",
  },
  "checkbox-group-indeterminate": {
    loader: () => import("./checkbox-group/indeterminate").then((m) => m.Indeterminate),
    file: "en/checkbox-group/indeterminate.tsx",
  },
  "checkbox-group-controlled": {
    loader: () => import("./checkbox-group/controlled").then((m) => m.Controlled),
    file: "en/checkbox-group/controlled.tsx",
  },
  "checkbox-group-validation": {
    loader: () => import("./checkbox-group/validation").then((m) => m.Validation),
    file: "en/checkbox-group/validation.tsx",
  },
  "checkbox-group-features-and-addons": {
    loader: () => import("./checkbox-group/features-and-addons").then((m) => m.FeaturesAndAddOns),
    file: "en/checkbox-group/features-and-addons.tsx",
  },
  "checkbox-group-with-custom-indicator": {
    loader: () =>
      import("./checkbox-group/with-custom-indicator").then((m) => m.WithCustomIndicator),
    file: "en/checkbox-group/with-custom-indicator.tsx",
  },
  "checkbox-group-render-function": {
    loader: () => import("./checkbox-group/render-function").then((m) => m.RenderFunction),
    file: "en/checkbox-group/render-function.tsx",
  },
  "checkbox-group-custom-styles": {
    loader: () => import("./checkbox-group/custom-styles").then((m) => m.CustomStyles),
    file: "en/checkbox-group/custom-styles.tsx",
  },

  // Chip Demo
  "chip-basic": {
    loader: () => import("./chip/basic").then((m) => m.ChipBasic),
    file: "en/chip/basic.tsx",
  },
  "chip-variants": {
    loader: () => import("./chip/variants").then((m) => m.ChipVariants),
    file: "en/chip/variants.tsx",
  },
  "chip-statuses": {
    loader: () => import("./chip/statuses").then((m) => m.ChipStatuses),
    file: "en/chip/statuses.tsx",
  },
  "chip-with-icon": {
    loader: () => import("./chip/with-icon").then((m) => m.ChipWithIcon),
    file: "en/chip/with-icon.tsx",
  },
  "chip-custom-styles": {
    loader: () => import("./chip/custom-styles").then((m) => m.CustomStyles),
    file: "en/chip/custom-styles.tsx",
  },

  // CloseButton Demo
  "close-button-default": {
    loader: () => import("./close-button/default").then((m) => m.Default),
    file: "en/close-button/default.tsx",
  },
  "close-button-interactive": {
    loader: () => import("./close-button/interactive").then((m) => m.Interactive),
    file: "en/close-button/interactive.tsx",
  },
  "close-button-with-custom-icon": {
    loader: () => import("./close-button/with-custom-icon").then((m) => m.WithCustomIcon),
    file: "en/close-button/with-custom-icon.tsx",
  },
  "close-button-custom-styles": {
    loader: () => import("./close-button/custom-styles").then((m) => m.CustomStyles),
    file: "en/close-button/custom-styles.tsx",
  },

  // ColorArea Demo
  "color-area-basic": {
    loader: () => import("./color-area/basic").then((m) => m.ColorAreaBasic),
    file: "en/color-area/basic.tsx",
  },
  "color-area-with-dots": {
    loader: () => import("./color-area/with-dots").then((m) => m.ColorAreaWithDots),
    file: "en/color-area/with-dots.tsx",
  },
  "color-area-space-and-channels": {
    loader: () =>
      import("./color-area/space-and-channels").then((m) => m.ColorAreaSpaceAndChannels),
    file: "en/color-area/space-and-channels.tsx",
  },
  "color-area-disabled": {
    loader: () => import("./color-area/disabled").then((m) => m.ColorAreaDisabled),
    file: "en/color-area/disabled.tsx",
  },
  "color-area-controlled": {
    loader: () => import("./color-area/controlled").then((m) => m.ColorAreaControlled),
    file: "en/color-area/controlled.tsx",
  },
  "color-area-render-function": {
    loader: () => import("./color-area/render-function").then((m) => m.RenderFunction),
    file: "en/color-area/render-function.tsx",
  },
  "color-area-custom-styles": {
    loader: () => import("./color-area/custom-styles").then((m) => m.CustomStyles),
    file: "en/color-area/custom-styles.tsx",
  },

  // ColorField Demo
  "color-field-basic": {
    loader: () => import("./color-field/basic").then((m) => m.Basic),
    file: "en/color-field/basic.tsx",
  },
  "color-field-variants": {
    loader: () => import("./color-field/variants").then((m) => m.Variants),
    file: "en/color-field/variants.tsx",
  },
  "color-field-on-surface": {
    loader: () => import("./color-field/on-surface").then((m) => m.OnSurface),
    file: "en/color-field/on-surface.tsx",
  },
  "color-field-with-description": {
    loader: () => import("./color-field/with-description").then((m) => m.WithDescription),
    file: "en/color-field/with-description.tsx",
  },
  "color-field-required": {
    loader: () => import("./color-field/required").then((m) => m.Required),
    file: "en/color-field/required.tsx",
  },
  "color-field-disabled": {
    loader: () => import("./color-field/disabled").then((m) => m.Disabled),
    file: "en/color-field/disabled.tsx",
  },
  "color-field-full-width": {
    loader: () => import("./color-field/full-width").then((m) => m.FullWidth),
    file: "en/color-field/full-width.tsx",
  },
  "color-field-invalid": {
    loader: () => import("./color-field/invalid").then((m) => m.Invalid),
    file: "en/color-field/invalid.tsx",
  },
  "color-field-channel-editing": {
    loader: () => import("./color-field/channel-editing").then((m) => m.ChannelEditing),
    file: "en/color-field/channel-editing.tsx",
  },
  "color-field-controlled": {
    loader: () => import("./color-field/controlled").then((m) => m.Controlled),
    file: "en/color-field/controlled.tsx",
  },
  "color-field-form-example": {
    loader: () => import("./color-field/form-example").then((m) => m.FormExample),
    file: "en/color-field/form-example.tsx",
  },
  "color-field-render-function": {
    loader: () => import("./color-field/render-function").then((m) => m.RenderFunction),
    file: "en/color-field/render-function.tsx",
  },
  "color-field-custom-styles": {
    loader: () => import("./color-field/custom-styles").then((m) => m.CustomStyles),
    file: "en/color-field/custom-styles.tsx",
  },

  // ColorPicker Demo
  "color-picker-basic": {
    loader: () => import("./color-picker/basic").then((m) => m.Basic),
    file: "en/color-picker/basic.tsx",
  },
  "color-picker-controlled": {
    loader: () => import("./color-picker/controlled").then((m) => m.Controlled),
    file: "en/color-picker/controlled.tsx",
  },
  "color-picker-with-swatches": {
    loader: () => import("./color-picker/with-swatches").then((m) => m.WithSwatches),
    file: "en/color-picker/with-swatches.tsx",
  },
  "color-picker-with-fields": {
    loader: () => import("./color-picker/with-fields").then((m) => m.WithFields),
    file: "en/color-picker/with-fields.tsx",
  },
  "color-picker-with-sliders": {
    loader: () => import("./color-picker/with-sliders").then((m) => m.WithSliders),
    file: "en/color-picker/with-sliders.tsx",
  },
  "color-picker-custom-styles": {
    loader: () => import("./color-picker/custom-styles").then((m) => m.CustomStyles),
    file: "en/color-picker/custom-styles.tsx",
  },

  // ColorSlider Demo
  "color-slider-basic": {
    loader: () => import("./color-slider/basic").then((m) => m.Basic),
    file: "en/color-slider/basic.tsx",
  },
  "color-slider-disabled": {
    loader: () => import("./color-slider/disabled").then((m) => m.Disabled),
    file: "en/color-slider/disabled.tsx",
  },
  "color-slider-vertical": {
    loader: () => import("./color-slider/vertical").then((m) => m.Vertical),
    file: "en/color-slider/vertical.tsx",
  },
  "color-slider-controlled": {
    loader: () => import("./color-slider/controlled").then((m) => m.Controlled),
    file: "en/color-slider/controlled.tsx",
  },
  "color-slider-channels": {
    loader: () => import("./color-slider/channels").then((m) => m.Channels),
    file: "en/color-slider/channels.tsx",
  },
  "color-slider-alpha-channel": {
    loader: () => import("./color-slider/alpha-channel").then((m) => m.AlphaChannel),
    file: "en/color-slider/alpha-channel.tsx",
  },
  "color-slider-rgb-channels": {
    loader: () => import("./color-slider/rgb-channels").then((m) => m.RGBChannels),
    file: "en/color-slider/rgb-channels.tsx",
  },
  "color-slider-render-function": {
    loader: () => import("./color-slider/render-function").then((m) => m.RenderFunction),
    file: "en/color-slider/render-function.tsx",
  },
  "color-slider-custom-styles": {
    loader: () => import("./color-slider/custom-styles").then((m) => m.CustomStyles),
    file: "en/color-slider/custom-styles.tsx",
  },

  // ColorSwatch Demo
  "color-swatch-basic": {
    loader: () => import("./color-swatch/basic").then((m) => m.ColorSwatchBasic),
    file: "en/color-swatch/basic.tsx",
  },
  "color-swatch-sizes": {
    loader: () => import("./color-swatch/sizes").then((m) => m.ColorSwatchSizes),
    file: "en/color-swatch/sizes.tsx",
  },
  "color-swatch-shapes": {
    loader: () => import("./color-swatch/shapes").then((m) => m.ColorSwatchShapes),
    file: "en/color-swatch/shapes.tsx",
  },
  "color-swatch-transparency": {
    loader: () => import("./color-swatch/transparency").then((m) => m.ColorSwatchTransparency),
    file: "en/color-swatch/transparency.tsx",
  },
  "color-swatch-render-function": {
    loader: () => import("./color-swatch/render-function").then((m) => m.RenderFunction),
    file: "en/color-swatch/render-function.tsx",
  },
  "color-swatch-accessibility": {
    loader: () => import("./color-swatch/accessibility").then((m) => m.ColorSwatchAccessibility),
    file: "en/color-swatch/accessibility.tsx",
  },
  "color-swatch-custom-styles": {
    loader: () => import("./color-swatch/custom-styles").then((m) => m.ColorSwatchCustomStyles),
    file: "en/color-swatch/custom-styles.tsx",
  },

  // ColorSwatchPicker Demo
  "color-swatch-picker-basic": {
    loader: () => import("./color-swatch-picker/basic").then((m) => m.Basic),
    file: "en/color-swatch-picker/basic.tsx",
  },
  "color-swatch-picker-variants": {
    loader: () => import("./color-swatch-picker/variants").then((m) => m.Variants),
    file: "en/color-swatch-picker/variants.tsx",
  },
  "color-swatch-picker-sizes": {
    loader: () => import("./color-swatch-picker/sizes").then((m) => m.Sizes),
    file: "en/color-swatch-picker/sizes.tsx",
  },
  "color-swatch-picker-disabled": {
    loader: () => import("./color-swatch-picker/disabled").then((m) => m.Disabled),
    file: "en/color-swatch-picker/disabled.tsx",
  },
  "color-swatch-picker-stack-layout": {
    loader: () => import("./color-swatch-picker/stack-layout").then((m) => m.StackLayout),
    file: "en/color-swatch-picker/stack-layout.tsx",
  },
  "color-swatch-picker-default-value": {
    loader: () => import("./color-swatch-picker/default-value").then((m) => m.DefaultValue),
    file: "en/color-swatch-picker/default-value.tsx",
  },
  "color-swatch-picker-controlled": {
    loader: () => import("./color-swatch-picker/controlled").then((m) => m.Controlled),
    file: "en/color-swatch-picker/controlled.tsx",
  },
  "color-swatch-picker-custom-indicator": {
    loader: () => import("./color-swatch-picker/custom-indicator").then((m) => m.CustomIndicator),
    file: "en/color-swatch-picker/custom-indicator.tsx",
  },
  "color-swatch-picker-render-function": {
    loader: () => import("./color-swatch-picker/render-function").then((m) => m.RenderFunction),
    file: "en/color-swatch-picker/render-function.tsx",
  },
  "color-swatch-picker-custom-styles": {
    loader: () => import("./color-swatch-picker/custom-styles").then((m) => m.CustomStyles),
    file: "en/color-swatch-picker/custom-styles.tsx",
  },

  // ComboBox Demo
  "combo-box-default": {
    loader: () => import("./combo-box/default").then((m) => m.Default),
    file: "en/combo-box/default.tsx",
  },
  "combo-box-full-width": {
    loader: () => import("./combo-box/full-width").then((m) => m.FullWidth),
    file: "en/combo-box/full-width.tsx",
  },
  "combo-box-with-description": {
    loader: () => import("./combo-box/with-description").then((m) => m.WithDescription),
    file: "en/combo-box/with-description.tsx",
  },
  "combo-box-required": {
    loader: () => import("./combo-box/required").then((m) => m.Required),
    file: "en/combo-box/required.tsx",
  },
  "combo-box-disabled": {
    loader: () => import("./combo-box/disabled").then((m) => m.Disabled),
    file: "en/combo-box/disabled.tsx",
  },
  "combo-box-with-disabled-options": {
    loader: () => import("./combo-box/with-disabled-options").then((m) => m.WithDisabledOptions),
    file: "en/combo-box/with-disabled-options.tsx",
  },
  "combo-box-with-sections": {
    loader: () => import("./combo-box/with-sections").then((m) => m.WithSections),
    file: "en/combo-box/with-sections.tsx",
  },
  "combo-box-controlled": {
    loader: () => import("./combo-box/controlled").then((m) => m.Controlled),
    file: "en/combo-box/controlled.tsx",
  },
  "combo-box-controlled-input-value": {
    loader: () => import("./combo-box/controlled-input-value").then((m) => m.ControlledInputValue),
    file: "en/combo-box/controlled-input-value.tsx",
  },
  "combo-box-asynchronous-loading": {
    loader: () => import("./combo-box/asynchronous-loading").then((m) => m.AsynchronousLoading),
    file: "en/combo-box/asynchronous-loading.tsx",
  },
  "combo-box-default-selected-key": {
    loader: () => import("./combo-box/default-selected-key").then((m) => m.DefaultSelectedKey),
    file: "en/combo-box/default-selected-key.tsx",
  },
  "combo-box-allows-custom-value": {
    loader: () => import("./combo-box/allows-custom-value").then((m) => m.AllowsCustomValue),
    file: "en/combo-box/allows-custom-value.tsx",
  },
  "combo-box-custom-indicator": {
    loader: () => import("./combo-box/custom-indicator").then((m) => m.CustomIndicator),
    file: "en/combo-box/custom-indicator.tsx",
  },
  "combo-box-custom-value": {
    loader: () => import("./combo-box/custom-value").then((m) => m.CustomValue),
    file: "en/combo-box/custom-value.tsx",
  },
  "combo-box-custom-filtering": {
    loader: () => import("./combo-box/custom-filtering").then((m) => m.CustomFiltering),
    file: "en/combo-box/custom-filtering.tsx",
  },
  "combo-box-custom-validation": {
    loader: () => import("./combo-box/custom-validation").then((m) => m.CustomValidation),
    file: "en/combo-box/custom-validation.tsx",
  },
  "combo-box-render-function": {
    loader: () => import("./combo-box/render-function").then((m) => m.RenderFunction),
    file: "en/combo-box/render-function.tsx",
  },
  "combo-box-menu-trigger": {
    loader: () => import("./combo-box/menu-trigger").then((m) => m.MenuTrigger),
    file: "en/combo-box/menu-trigger.tsx",
  },
  "combo-box-form-value": {
    loader: () => import("./combo-box/form-value").then((m) => m.FormValue),
    file: "en/combo-box/form-value.tsx",
  },
  "combo-box-validation-behavior": {
    loader: () => import("./combo-box/validation-behavior").then((m) => m.ValidationBehavior),
    file: "en/combo-box/validation-behavior.tsx",
  },
  "combo-box-read-only": {
    loader: () => import("./combo-box/read-only").then((m) => m.ReadOnly),
    file: "en/combo-box/read-only.tsx",
  },
  "combo-box-multiple-selection": {
    loader: () => import("./combo-box/multiple-selection").then((m) => m.MultipleSelection),
    file: "en/combo-box/multiple-selection.tsx",
  },
  "combo-box-on-surface": {
    loader: () => import("./combo-box/on-surface").then((m) => m.OnSurface),
    file: "en/combo-box/on-surface.tsx",
  },
  "combo-box-custom-styles": {
    loader: () => import("./combo-box/custom-styles").then((m) => m.CustomStyles),
    file: "en/combo-box/custom-styles.tsx",
  },

  // DateField Demo
  "date-field-basic": {
    loader: () => import("./date-field/basic").then((m) => m.Basic),
    file: "en/date-field/basic.tsx",
  },
  "date-field-with-prefix-icon": {
    loader: () => import("./date-field/with-prefix-icon").then((m) => m.WithPrefixIcon),
    file: "en/date-field/with-prefix-icon.tsx",
  },
  "date-field-with-suffix-icon": {
    loader: () => import("./date-field/with-suffix-icon").then((m) => m.WithSuffixIcon),
    file: "en/date-field/with-suffix-icon.tsx",
  },
  "date-field-with-prefix-and-suffix": {
    loader: () => import("./date-field/with-prefix-and-suffix").then((m) => m.WithPrefixAndSuffix),
    file: "en/date-field/with-prefix-and-suffix.tsx",
  },
  "date-field-variants": {
    loader: () => import("./date-field/variants").then((m) => m.Variants),
    file: "en/date-field/variants.tsx",
  },
  "date-field-on-surface": {
    loader: () => import("./date-field/on-surface").then((m) => m.OnSurface),
    file: "en/date-field/on-surface.tsx",
  },
  "date-field-with-description": {
    loader: () => import("./date-field/with-description").then((m) => m.WithDescription),
    file: "en/date-field/with-description.tsx",
  },
  "date-field-required": {
    loader: () => import("./date-field/required").then((m) => m.Required),
    file: "en/date-field/required.tsx",
  },
  "date-field-disabled": {
    loader: () => import("./date-field/disabled").then((m) => m.Disabled),
    file: "en/date-field/disabled.tsx",
  },
  "date-field-full-width": {
    loader: () => import("./date-field/full-width").then((m) => m.FullWidth),
    file: "en/date-field/full-width.tsx",
  },
  "date-field-invalid": {
    loader: () => import("./date-field/invalid").then((m) => m.Invalid),
    file: "en/date-field/invalid.tsx",
  },
  "date-field-granularity": {
    loader: () => import("./date-field/granularity").then((m) => m.Granularity),
    file: "en/date-field/granularity.tsx",
  },
  "date-field-controlled": {
    loader: () => import("./date-field/controlled").then((m) => m.Controlled),
    file: "en/date-field/controlled.tsx",
  },
  "date-field-form-example": {
    loader: () => import("./date-field/form-example").then((m) => m.FormExample),
    file: "en/date-field/form-example.tsx",
  },
  "date-field-with-validation": {
    loader: () => import("./date-field/with-validation").then((m) => m.WithValidation),
    file: "en/date-field/with-validation.tsx",
  },
  "date-field-render-function": {
    loader: () => import("./date-field/render-function").then((m) => m.RenderFunction),
    file: "en/date-field/render-function.tsx",
  },
  "date-field-custom-styles": {
    loader: () => import("./date-field/custom-styles").then((m) => m.CustomStyles),
    file: "en/date-field/custom-styles.tsx",
  },

  // DatePicker Demo
  "date-picker-basic": {
    loader: () => import("./date-picker/basic").then((m) => m.Basic),
    file: "en/date-picker/basic.tsx",
  },
  "date-picker-disabled": {
    loader: () => import("./date-picker/disabled").then((m) => m.Disabled),
    file: "en/date-picker/disabled.tsx",
  },
  "date-picker-controlled": {
    loader: () => import("./date-picker/controlled").then((m) => m.Controlled),
    file: "en/date-picker/controlled.tsx",
  },
  "date-picker-with-validation": {
    loader: () => import("./date-picker/with-validation").then((m) => m.WithValidation),
    file: "en/date-picker/with-validation.tsx",
  },
  "date-picker-format-options": {
    loader: () => import("./date-picker/format-options-no-ssr").then((m) => m.FormatOptions),
    file: "en/date-picker/format-options.tsx",
  },
  "date-picker-form-example": {
    loader: () => import("./date-picker/form-example").then((m) => m.FormExample),
    file: "en/date-picker/form-example.tsx",
  },
  "date-picker-with-custom-indicator": {
    loader: () => import("./date-picker/with-custom-indicator").then((m) => m.WithCustomIndicator),
    file: "en/date-picker/with-custom-indicator.tsx",
  },
  "date-picker-render-function": {
    loader: () => import("./date-picker/render-function").then((m) => m.RenderFunction),
    file: "en/date-picker/render-function.tsx",
  },
  "date-picker-international-calendar": {
    loader: () =>
      import("./date-picker/international-calendar").then((m) => m.InternationalCalendar),
    file: "en/date-picker/international-calendar.tsx",
  },
  "date-picker-custom-styles": {
    loader: () => import("./date-picker/custom-styles").then((m) => m.CustomStyles),
    file: "en/date-picker/custom-styles.tsx",
  },

  // DateRangePicker Demo
  "date-range-picker-basic": {
    loader: () => import("./date-range-picker/basic").then((m) => m.Basic),
    file: "en/date-range-picker/basic.tsx",
  },
  "date-range-picker-disabled": {
    loader: () => import("./date-range-picker/disabled").then((m) => m.Disabled),
    file: "en/date-range-picker/disabled.tsx",
  },
  "date-range-picker-controlled": {
    loader: () => import("./date-range-picker/controlled").then((m) => m.Controlled),
    file: "en/date-range-picker/controlled.tsx",
  },
  "date-range-picker-with-validation": {
    loader: () => import("./date-range-picker/with-validation").then((m) => m.WithValidation),
    file: "en/date-range-picker/with-validation.tsx",
  },
  "date-range-picker-format-options": {
    loader: () => import("./date-range-picker/format-options-no-ssr").then((m) => m.FormatOptions),
    file: "en/date-range-picker/format-options.tsx",
  },
  "date-range-picker-form-example": {
    loader: () => import("./date-range-picker/form-example").then((m) => m.FormExample),
    file: "en/date-range-picker/form-example.tsx",
  },
  "date-range-picker-with-custom-indicator": {
    loader: () =>
      import("./date-range-picker/with-custom-indicator").then((m) => m.WithCustomIndicator),
    file: "en/date-range-picker/with-custom-indicator.tsx",
  },
  "date-range-picker-render-function": {
    loader: () => import("./date-range-picker/render-function").then((m) => m.RenderFunction),
    file: "en/date-range-picker/render-function.tsx",
  },
  "date-range-picker-international-calendar": {
    loader: () =>
      import("./date-range-picker/international-calendar").then((m) => m.InternationalCalendar),
    file: "en/date-range-picker/international-calendar.tsx",
  },
  "date-range-picker-custom-styles": {
    loader: () => import("./date-range-picker/custom-styles").then((m) => m.CustomStyles),
    file: "en/date-range-picker/custom-styles.tsx",
  },

  // Description Demo
  "description-basic": {
    loader: () => import("./description/basic").then((m) => m.Basic),
    file: "en/description/basic.tsx",
  },
  "description-custom-styles": {
    loader: () => import("./description/custom-styles").then((m) => m.CustomStyles),
    file: "en/description/custom-styles.tsx",
  },

  // Disclosure Demo
  "disclosure-basic": {
    loader: () => import("./disclosure/basic").then((m) => m.Basic),
    file: "en/disclosure/basic.tsx",
  },
  "disclosure-render-function": {
    loader: () => import("./disclosure/render-function").then((m) => m.RenderFunction),
    file: "en/disclosure/render-function.tsx",
  },
  "disclosure-custom-styles": {
    loader: () => import("./disclosure/custom-styles").then((m) => m.CustomStyles),
    file: "en/disclosure/custom-styles.tsx",
  },

  // DisclosureGroup Demo
  "disclosure-group-basic": {
    loader: () => import("./disclosure-group/basic").then((m) => m.Basic),
    file: "en/disclosure-group/basic.tsx",
  },
  "disclosure-group-controlled": {
    loader: () => import("./disclosure-group/controlled").then((m) => m.Controlled),
    file: "en/disclosure-group/controlled.tsx",
  },
  "disclosure-group-custom-styles": {
    loader: () => import("./disclosure-group/custom-styles").then((m) => m.CustomStyles),
    file: "en/disclosure-group/custom-styles.tsx",
  },

  // Drawer Demo
  "drawer-basic": {
    loader: () => import("./drawer/basic").then((m) => m.Basic),
    file: "en/drawer/basic.tsx",
  },
  "drawer-placements": {
    loader: () => import("./drawer/placements").then((m) => m.Placements),
    file: "en/drawer/placements.tsx",
  },
  "drawer-non-dismissable": {
    loader: () => import("./drawer/non-dismissable").then((m) => m.NonDismissable),
    file: "en/drawer/non-dismissable.tsx",
  },
  "drawer-scrollable-content": {
    loader: () => import("./drawer/scrollable-content").then((m) => m.ScrollableContent),
    file: "en/drawer/scrollable-content.tsx",
  },
  "drawer-controlled": {
    loader: () => import("./drawer/controlled").then((m) => m.Controlled),
    file: "en/drawer/controlled.tsx",
  },
  "drawer-with-form": {
    loader: () => import("./drawer/with-form").then((m) => m.WithForm),
    file: "en/drawer/with-form.tsx",
  },
  "drawer-navigation": {
    loader: () => import("./drawer/navigation").then((m) => m.Navigation),
    file: "en/drawer/navigation.tsx",
  },
  "drawer-backdrop-variants": {
    loader: () => import("./drawer/backdrop-variants").then((m) => m.BackdropVariants),
    file: "en/drawer/backdrop-variants.tsx",
  },
  "drawer-custom-styles": {
    loader: () => import("./drawer/custom-styles").then((m) => m.CustomStyles),
    file: "en/drawer/custom-styles.tsx",
  },

  // Dropdown Demo
  "dropdown-default": {
    loader: () => import("./dropdown/default").then((m) => m.Default),
    file: "en/dropdown/default.tsx",
  },
  "dropdown-with-icons": {
    loader: () => import("./dropdown/with-icons").then((m) => m.WithIcons),
    file: "en/dropdown/with-icons.tsx",
  },
  "dropdown-with-descriptions": {
    loader: () => import("./dropdown/with-descriptions").then((m) => m.WithDescriptions),
    file: "en/dropdown/with-descriptions.tsx",
  },
  "dropdown-with-disabled-items": {
    loader: () => import("./dropdown/with-disabled-items").then((m) => m.WithDisabledItems),
    file: "en/dropdown/with-disabled-items.tsx",
  },
  "dropdown-with-sections": {
    loader: () => import("./dropdown/with-sections").then((m) => m.WithSections),
    file: "en/dropdown/with-sections.tsx",
  },
  "dropdown-with-multiple-selection": {
    loader: () => import("./dropdown/with-multiple-selection").then((m) => m.WithMultipleSelection),
    file: "en/dropdown/with-multiple-selection.tsx",
  },
  "dropdown-controlled": {
    loader: () => import("./dropdown/controlled").then((m) => m.Controlled),
    file: "en/dropdown/controlled.tsx",
  },
  "dropdown-controlled-open-state": {
    loader: () => import("./dropdown/controlled-open-state").then((m) => m.ControlledOpenState),
    file: "en/dropdown/controlled-open-state.tsx",
  },
  "dropdown-with-single-selection": {
    loader: () => import("./dropdown/with-single-selection").then((m) => m.WithSingleSelection),
    file: "en/dropdown/with-single-selection.tsx",
  },
  "dropdown-single-with-custom-indicator": {
    loader: () =>
      import("./dropdown/single-with-custom-indicator").then((m) => m.SingleWithCustomIndicator),
    file: "en/dropdown/single-with-custom-indicator.tsx",
  },
  "dropdown-with-section-level-selection": {
    loader: () =>
      import("./dropdown/with-section-level-selection").then((m) => m.WithSectionLevelSelection),
    file: "en/dropdown/with-section-level-selection.tsx",
  },
  "dropdown-with-keyboard-shortcuts": {
    loader: () => import("./dropdown/with-keyboard-shortcuts").then((m) => m.WithKeyboardShortcuts),
    file: "en/dropdown/with-keyboard-shortcuts.tsx",
  },
  "dropdown-with-submenus": {
    loader: () => import("./dropdown/with-submenus").then((m) => m.WithSubmenus),
    file: "en/dropdown/with-submenus.tsx",
  },
  "dropdown-with-custom-submenu-indicator": {
    loader: () =>
      import("./dropdown/with-custom-submenu-indicator").then((m) => m.WithCustomSubmenuIndicator),
    file: "en/dropdown/with-custom-submenu-indicator.tsx",
  },
  "dropdown-custom-trigger": {
    loader: () => import("./dropdown/custom-trigger").then((m) => m.CustomTrigger),
    file: "en/dropdown/custom-trigger.tsx",
  },
  "dropdown-long-press-trigger": {
    loader: () => import("./dropdown/long-press-trigger").then((m) => m.LongPressTrigger),
    file: "en/dropdown/long-press-trigger.tsx",
  },
  "dropdown-custom-styles": {
    loader: () => import("./dropdown/custom-styles").then((m) => m.CustomStyles),
    file: "en/dropdown/custom-styles.tsx",
  },

  // ErrorMessage Demo
  "error-message-basic": {
    loader: () => import("./error-message/basic").then((m) => m.ErrorMessageBasic),
    file: "en/error-message/basic.tsx",
  },
  "error-message-custom-styles": {
    loader: () => import("./error-message/custom-styles").then((m) => m.CustomStyles),
    file: "en/error-message/custom-styles.tsx",
  },

  // FieldError Demo
  "field-error-basic": {
    loader: () => import("./field-error/basic").then((m) => m.Basic),
    file: "en/field-error/basic.tsx",
  },
  "field-error-custom-styles": {
    loader: () => import("./field-error/custom-styles").then((m) => m.CustomStyles),
    file: "en/field-error/custom-styles.tsx",
  },

  // Fieldset Demo
  "fieldset-basic": {
    loader: () => import("./fieldset/basic").then((m) => m.Basic),
    file: "en/fieldset/basic.tsx",
  },
  "fieldset-on-surface": {
    loader: () => import("./fieldset/on-surface").then((m) => m.OnSurface),
    file: "en/fieldset/on-surface.tsx",
  },
  "fieldset-custom-styles": {
    loader: () => import("./fieldset/custom-styles").then((m) => m.CustomStyles),
    file: "en/fieldset/custom-styles.tsx",
  },

  // Form Demo
  "form-basic": {
    loader: () => import("./form/basic").then((m) => m.Basic),
    file: "en/form/basic.tsx",
  },
  "form-render-function": {
    loader: () => import("./form/render-function").then((m) => m.RenderFunction),
    file: "en/form/render-function.tsx",
  },
  "form-custom-styles": {
    loader: () => import("./form/custom-styles").then((m) => m.CustomStyles),
    file: "en/form/custom-styles.tsx",
  },

  // Input Demo
  "input-basic": {
    loader: () => import("./input/basic").then((m) => m.Basic),
    file: "en/input/basic.tsx",
  },
  "input-variants": {
    loader: () => import("./input/variants").then((m) => m.Variants),
    file: "en/input/variants.tsx",
  },
  "input-on-surface": {
    loader: () => import("./input/on-surface").then((m) => m.OnSurface),
    file: "en/input/on-surface.tsx",
  },
  "input-full-width": {
    loader: () => import("./input/full-width").then((m) => m.FullWidth),
    file: "en/input/full-width.tsx",
  },
  "input-types": {
    loader: () => import("./input/types").then((m) => m.Types),
    file: "en/input/types.tsx",
  },
  "input-controlled": {
    loader: () => import("./input/controlled").then((m) => m.Controlled),
    file: "en/input/controlled.tsx",
  },
  "input-custom-styles": {
    loader: () => import("./input/custom-styles").then((m) => m.CustomStyles),
    file: "en/input/custom-styles.tsx",
  },

  // InputGroup Demo
  "input-group-default": {
    loader: () => import("./input-group/default").then((m) => m.Default),
    file: "en/input-group/default.tsx",
  },
  "input-group-variants": {
    loader: () => import("./input-group/variants").then((m) => m.Variants),
    file: "en/input-group/variants.tsx",
  },
  "input-group-on-surface": {
    loader: () => import("./input-group/on-surface").then((m) => m.OnSurface),
    file: "en/input-group/on-surface.tsx",
  },
  "input-group-with-loading-suffix": {
    loader: () => import("./input-group/with-loading-suffix").then((m) => m.WithLoadingSuffix),
    file: "en/input-group/with-loading-suffix.tsx",
  },
  "input-group-required": {
    loader: () => import("./input-group/required").then((m) => m.Required),
    file: "en/input-group/required.tsx",
  },
  "input-group-disabled": {
    loader: () => import("./input-group/disabled").then((m) => m.Disabled),
    file: "en/input-group/disabled.tsx",
  },
  "input-group-full-width": {
    loader: () => import("./input-group/full-width").then((m) => m.FullWidth),
    file: "en/input-group/full-width.tsx",
  },
  "input-group-with-text-prefix": {
    loader: () => import("./input-group/with-text-prefix").then((m) => m.WithTextPrefix),
    file: "en/input-group/with-text-prefix.tsx",
  },
  "input-group-with-text-suffix": {
    loader: () => import("./input-group/with-text-suffix").then((m) => m.WithTextSuffix),
    file: "en/input-group/with-text-suffix.tsx",
  },
  "input-group-with-icon-prefix-and-text-suffix": {
    loader: () =>
      import("./input-group/with-icon-prefix-and-text-suffix").then(
        (m) => m.WithIconPrefixAndTextSuffix,
      ),
    file: "en/input-group/with-icon-prefix-and-text-suffix.tsx",
  },
  "input-group-with-copy-suffix": {
    loader: () => import("./input-group/with-copy-suffix").then((m) => m.WithCopySuffix),
    file: "en/input-group/with-copy-suffix.tsx",
  },
  "input-group-with-icon-prefix-and-copy-suffix": {
    loader: () =>
      import("./input-group/with-icon-prefix-and-copy-suffix").then(
        (m) => m.WithIconPrefixAndCopySuffix,
      ),
    file: "en/input-group/with-icon-prefix-and-copy-suffix.tsx",
  },
  "input-group-password-with-toggle": {
    loader: () => import("./input-group/password-with-toggle").then((m) => m.PasswordWithToggle),
    file: "en/input-group/password-with-toggle.tsx",
  },
  "input-group-with-keyboard-shortcut": {
    loader: () =>
      import("./input-group/with-keyboard-shortcut").then((m) => m.WithKeyboardShortcut),
    file: "en/input-group/with-keyboard-shortcut.tsx",
  },
  "input-group-with-badge-suffix": {
    loader: () => import("./input-group/with-badge-suffix").then((m) => m.WithBadgeSuffix),
    file: "en/input-group/with-badge-suffix.tsx",
  },
  "input-group-invalid": {
    loader: () => import("./input-group/invalid").then((m) => m.Invalid),
    file: "en/input-group/invalid.tsx",
  },
  "input-group-with-prefix-icon": {
    loader: () => import("./input-group/with-prefix-icon").then((m) => m.WithPrefixIcon),
    file: "en/input-group/with-prefix-icon.tsx",
  },
  "input-group-with-suffix-icon": {
    loader: () => import("./input-group/with-suffix-icon").then((m) => m.WithSuffixIcon),
    file: "en/input-group/with-suffix-icon.tsx",
  },
  "input-group-with-prefix-and-suffix": {
    loader: () => import("./input-group/with-prefix-and-suffix").then((m) => m.WithPrefixAndSuffix),
    file: "en/input-group/with-prefix-and-suffix.tsx",
  },
  "input-group-with-textarea": {
    loader: () => import("./input-group/with-textarea").then((m) => m.WithTextArea),
    file: "en/input-group/with-textarea.tsx",
  },
  "input-group-custom-styles": {
    loader: () => import("./input-group/custom-styles").then((m) => m.CustomStyles),
    file: "en/input-group/custom-styles.tsx",
  },

  // InputOTP Demo
  "input-otp-basic": {
    loader: () => import("./input-otp/basic").then((m) => m.Basic),
    file: "en/input-otp/basic.tsx",
  },
  "input-otp-variants": {
    loader: () => import("./input-otp/variants").then((m) => m.Variants),
    file: "en/input-otp/variants.tsx",
  },
  "input-otp-on-surface": {
    loader: () => import("./input-otp/on-surface").then((m) => m.OnSurface),
    file: "en/input-otp/on-surface.tsx",
  },
  "input-otp-disabled": {
    loader: () => import("./input-otp/disabled").then((m) => m.Disabled),
    file: "en/input-otp/disabled.tsx",
  },
  "input-otp-four-digits": {
    loader: () => import("./input-otp/four-digits").then((m) => m.FourDigits),
    file: "en/input-otp/four-digits.tsx",
  },
  "input-otp-controlled": {
    loader: () => import("./input-otp/controlled").then((m) => m.Controlled),
    file: "en/input-otp/controlled.tsx",
  },
  "input-otp-on-complete": {
    loader: () => import("./input-otp/on-complete").then((m) => m.OnComplete),
    file: "en/input-otp/on-complete.tsx",
  },
  "input-otp-form-example": {
    loader: () => import("./input-otp/form-example").then((m) => m.FormExample),
    file: "en/input-otp/form-example.tsx",
  },
  "input-otp-with-pattern": {
    loader: () => import("./input-otp/with-pattern").then((m) => m.WithPattern),
    file: "en/input-otp/with-pattern.tsx",
  },
  "input-otp-with-validation": {
    loader: () => import("./input-otp/with-validation").then((m) => m.WithValidation),
    file: "en/input-otp/with-validation.tsx",
  },
  "input-otp-custom-styles": {
    loader: () => import("./input-otp/custom-styles").then((m) => m.CustomStyles),
    file: "en/input-otp/custom-styles.tsx",
  },

  // Kbd Demo
  "kbd-basic": {
    loader: () => import("./kbd/basic").then((m) => m.Basic),
    file: "en/kbd/basic.tsx",
  },
  "kbd-variants": {
    loader: () => import("./kbd/variants").then((m) => m.Variants),
    file: "en/kbd/variants.tsx",
  },
  "kbd-navigation-keys": {
    loader: () => import("./kbd/navigation").then((m) => m.NavigationKeys),
    file: "en/kbd/navigation.tsx",
  },
  "kbd-inline-usage": {
    loader: () => import("./kbd/inline").then((m) => m.InlineUsage),
    file: "en/kbd/inline.tsx",
  },
  "kbd-instructional-text": {
    loader: () => import("./kbd/instructional").then((m) => m.InstructionalText),
    file: "en/kbd/instructional.tsx",
  },
  "kbd-special-keys": {
    loader: () => import("./kbd/special").then((m) => m.SpecialKeys),
    file: "en/kbd/special.tsx",
  },
  "kbd-custom-styles": {
    loader: () => import("./kbd/custom-styles").then((m) => m.CustomStyles),
    file: "en/kbd/custom-styles.tsx",
  },

  // Label Demo
  "label-basic": {
    loader: () => import("./label/basic").then((m) => m.Basic),
    file: "en/label/basic.tsx",
  },
  "label-custom-styles": {
    loader: () => import("./label/custom-styles").then((m) => m.CustomStyles),
    file: "en/label/custom-styles.tsx",
  },

  // Link Demo
  "link-basic": {
    loader: () => import("./link/basic").then((m) => m.LinkBasic),
    file: "en/link/basic.tsx",
  },
  "link-icon-placement": {
    loader: () => import("./link/icon-placement").then((m) => m.LinkIconPlacement),
    file: "en/link/icon-placement.tsx",
  },
  "link-underline-and-offset": {
    loader: () => import("./link/underline-and-offset").then((m) => m.LinkUnderlineAndOffset),
    file: "en/link/underline-and-offset.tsx",
  },
  "link-custom-icon": {
    loader: () => import("./link/custom-icon").then((m) => m.LinkCustomIcon),
    file: "en/link/custom-icon.tsx",
  },
  "link-render-function": {
    loader: () => import("./link/render-function").then((m) => m.RenderFunction),
    file: "en/link/render-function.tsx",
  },
  "link-custom-styles": {
    loader: () => import("./link/custom-styles").then((m) => m.CustomStyles),
    file: "en/link/custom-styles.tsx",
  },

  // ListBox Demo
  "list-box-default": {
    loader: () => import("./list-box/default").then((m) => m.Default),
    file: "en/list-box/default.tsx",
  },
  "list-box-with-disabled-items": {
    loader: () => import("./list-box/with-disabled-items").then((m) => m.WithDisabledItems),
    file: "en/list-box/with-disabled-items.tsx",
  },
  "list-box-with-sections": {
    loader: () => import("./list-box/with-sections").then((m) => m.WithSections),
    file: "en/list-box/with-sections.tsx",
  },
  "list-box-multi-select": {
    loader: () => import("./list-box/multi-select").then((m) => m.MultiSelect),
    file: "en/list-box/multi-select.tsx",
  },
  "list-box-controlled": {
    loader: () => import("./list-box/controlled").then((m) => m.Controlled),
    file: "en/list-box/controlled.tsx",
  },
  "list-box-virtualization": {
    loader: () => import("./list-box/virtualization").then((m) => m.Virtualization),
    file: "en/list-box/virtualization.tsx",
  },
  "list-box-custom-check-icon": {
    loader: () => import("./list-box/custom-check-icon").then((m) => m.CustomCheckIcon),
    file: "en/list-box/custom-check-icon.tsx",
  },
  "list-box-render-function": {
    loader: () => import("./list-box/render-function").then((m) => m.RenderFunction),
    file: "en/list-box/render-function.tsx",
  },
  "list-box-custom-styles": {
    loader: () => import("./list-box/custom-styles").then((m) => m.CustomStyles),
    file: "en/list-box/custom-styles.tsx",
  },

  // Meter Demo
  "meter-basic": {
    loader: () => import("./meter/basic").then((m) => m.Basic),
    file: "en/meter/basic.tsx",
  },
  "meter-sizes": {
    loader: () => import("./meter/sizes").then((m) => m.Sizes),
    file: "en/meter/sizes.tsx",
  },
  "meter-colors": {
    loader: () => import("./meter/colors").then((m) => m.Colors),
    file: "en/meter/colors.tsx",
  },
  "meter-without-label": {
    loader: () => import("./meter/without-label").then((m) => m.WithoutLabel),
    file: "en/meter/without-label.tsx",
  },
  "meter-custom-value": {
    loader: () => import("./meter/custom-value").then((m) => m.CustomValue),
    file: "en/meter/custom-value.tsx",
  },
  "meter-custom-styles": {
    loader: () => import("./meter/custom-styles").then((m) => m.CustomStyles),
    file: "en/meter/custom-styles.tsx",
  },

  // Modal Demo
  "modal-default": {
    loader: () => import("./modal/default").then((m) => m.Default),
    file: "en/modal/default.tsx",
  },
  "modal-sizes": {
    loader: () => import("./modal/sizes").then((m) => m.Sizes),
    file: "en/modal/sizes.tsx",
  },
  "modal-placements": {
    loader: () => import("./modal/placements").then((m) => m.Placements),
    file: "en/modal/placements.tsx",
  },
  "modal-scroll-comparison": {
    loader: () => import("./modal/scroll-comparison").then((m) => m.ScrollComparison),
    file: "en/modal/scroll-comparison.tsx",
  },
  "modal-controlled": {
    loader: () => import("./modal/controlled").then((m) => m.Controlled),
    file: "en/modal/controlled.tsx",
  },
  "modal-with-form": {
    loader: () => import("./modal/with-form").then((m) => m.WithForm),
    file: "en/modal/with-form.tsx",
  },
  "modal-custom-trigger": {
    loader: () => import("./modal/custom-trigger").then((m) => m.CustomTrigger),
    file: "en/modal/custom-trigger.tsx",
  },
  "modal-backdrop-variants": {
    loader: () => import("./modal/backdrop-variants").then((m) => m.BackdropVariants),
    file: "en/modal/backdrop-variants.tsx",
  },
  "modal-custom-backdrop": {
    loader: () => import("./modal/custom-backdrop").then((m) => m.CustomBackdrop),
    file: "en/modal/custom-backdrop.tsx",
  },
  "modal-dismiss-behavior": {
    loader: () => import("./modal/dismiss-behavior").then((m) => m.DismissBehavior),
    file: "en/modal/dismiss-behavior.tsx",
  },
  "modal-close-methods": {
    loader: () => import("./modal/close-methods").then((m) => m.CloseMethods),
    file: "en/modal/close-methods.tsx",
  },
  "modal-custom-animations": {
    loader: () => import("./modal/custom-animations").then((m) => m.CustomAnimations),
    file: "en/modal/custom-animations.tsx",
  },
  "modal-custom-portal": {
    loader: () => import("./modal/custom-portal").then((m) => m.CustomPortal),
    file: "en/modal/custom-portal.tsx",
  },
  "modal-custom-styles": {
    loader: () => import("./modal/custom-styles").then((m) => m.CustomStyles),
    file: "en/modal/custom-styles.tsx",
  },

  // NumberField Demo
  "number-field-basic": {
    loader: () => import("./number-field/basic").then((m) => m.Basic),
    file: "en/number-field/basic.tsx",
  },
  "number-field-variants": {
    loader: () => import("./number-field/variants").then((m) => m.Variants),
    file: "en/number-field/variants.tsx",
  },
  "number-field-on-surface": {
    loader: () => import("./number-field/on-surface").then((m) => m.OnSurface),
    file: "en/number-field/on-surface.tsx",
  },
  "number-field-with-description": {
    loader: () => import("./number-field/with-description").then((m) => m.WithDescription),
    file: "en/number-field/with-description.tsx",
  },
  "number-field-required": {
    loader: () => import("./number-field/required").then((m) => m.Required),
    file: "en/number-field/required.tsx",
  },
  "number-field-disabled": {
    loader: () => import("./number-field/disabled").then((m) => m.Disabled),
    file: "en/number-field/disabled.tsx",
  },
  "number-field-full-width": {
    loader: () => import("./number-field/full-width").then((m) => m.FullWidth),
    file: "en/number-field/full-width.tsx",
  },
  "number-field-validation": {
    loader: () => import("./number-field/validation").then((m) => m.Validation),
    file: "en/number-field/validation.tsx",
  },
  "number-field-controlled": {
    loader: () => import("./number-field/controlled").then((m) => m.Controlled),
    file: "en/number-field/controlled.tsx",
  },
  "number-field-with-step": {
    loader: () => import("./number-field/with-step").then((m) => m.WithStep),
    file: "en/number-field/with-step.tsx",
  },
  "number-field-with-format-options": {
    loader: () => import("./number-field/with-format-options").then((m) => m.WithFormatOptions),
    file: "en/number-field/with-format-options.tsx",
  },
  "number-field-form-example": {
    loader: () => import("./number-field/form-example").then((m) => m.FormExample),
    file: "en/number-field/form-example.tsx",
  },
  "number-field-with-validation": {
    loader: () => import("./number-field/with-validation").then((m) => m.WithValidation),
    file: "en/number-field/with-validation.tsx",
  },
  "number-field-custom-icons": {
    loader: () => import("./number-field/custom-icons").then((m) => m.CustomIcons),
    file: "en/number-field/custom-icons.tsx",
  },
  "number-field-with-chevrons": {
    loader: () => import("./number-field/with-chevrons").then((m) => m.WithChevrons),
    file: "en/number-field/with-chevrons.tsx",
  },
  "number-field-render-function": {
    loader: () => import("./number-field/render-function").then((m) => m.RenderFunction),
    file: "en/number-field/render-function.tsx",
  },
  "number-field-custom-styles": {
    loader: () => import("./number-field/custom-styles").then((m) => m.CustomStyles),
    file: "en/number-field/custom-styles.tsx",
  },

  // Pagination Demo
  "pagination-basic": {
    loader: () => import("./pagination/basic").then((m) => m.PaginationBasic),
    file: "en/pagination/basic.tsx",
  },
  "pagination-sizes": {
    loader: () => import("./pagination/sizes").then((m) => m.PaginationSizes),
    file: "en/pagination/sizes.tsx",
  },
  "pagination-disabled": {
    loader: () => import("./pagination/disabled").then((m) => m.PaginationDisabled),
    file: "en/pagination/disabled.tsx",
  },
  "pagination-simple-prev-next": {
    loader: () => import("./pagination/simple-prev-next").then((m) => m.PaginationSimplePrevNext),
    file: "en/pagination/simple-prev-next.tsx",
  },
  "pagination-controlled": {
    loader: () => import("./pagination/controlled").then((m) => m.PaginationControlled),
    file: "en/pagination/controlled.tsx",
  },
  "pagination-with-ellipsis": {
    loader: () => import("./pagination/with-ellipsis").then((m) => m.PaginationWithEllipsis),
    file: "en/pagination/with-ellipsis.tsx",
  },
  "pagination-with-summary": {
    loader: () => import("./pagination/with-summary").then((m) => m.PaginationWithSummary),
    file: "en/pagination/with-summary.tsx",
  },
  "pagination-custom-icons": {
    loader: () => import("./pagination/custom-icons").then((m) => m.PaginationCustomIcons),
    file: "en/pagination/custom-icons.tsx",
  },
  "pagination-custom-styles": {
    loader: () => import("./pagination/custom-styles").then((m) => m.CustomStyles),
    file: "en/pagination/custom-styles.tsx",
  },

  // Popover Demo
  "popover-basic": {
    loader: () => import("./popover/basic").then((m) => m.PopoverBasic),
    file: "en/popover/basic.tsx",
  },
  "popover-with-arrow": {
    loader: () => import("./popover/with-arrow").then((m) => m.PopoverWithArrow),
    file: "en/popover/with-arrow.tsx",
  },
  "popover-interactive": {
    loader: () => import("./popover/interactive").then((m) => m.PopoverInteractive),
    file: "en/popover/interactive.tsx",
  },
  "popover-placement": {
    loader: () => import("./popover/placement").then((m) => m.PopoverPlacement),
    file: "en/popover/placement.tsx",
  },
  "popover-render-function": {
    loader: () => import("./popover/render-function").then((m) => m.RenderFunction),
    file: "en/popover/render-function.tsx",
  },
  "popover-custom-styles": {
    loader: () => import("./popover/custom-styles").then((m) => m.CustomStyles),
    file: "en/popover/custom-styles.tsx",
  },

  // ProgressBar Demo
  "progress-bar-basic": {
    loader: () => import("./progress-bar/basic").then((m) => m.Basic),
    file: "en/progress-bar/basic.tsx",
  },
  "progress-bar-sizes": {
    loader: () => import("./progress-bar/sizes").then((m) => m.Sizes),
    file: "en/progress-bar/sizes.tsx",
  },
  "progress-bar-colors": {
    loader: () => import("./progress-bar/colors").then((m) => m.Colors),
    file: "en/progress-bar/colors.tsx",
  },
  "progress-bar-without-label": {
    loader: () => import("./progress-bar/without-label").then((m) => m.WithoutLabel),
    file: "en/progress-bar/without-label.tsx",
  },
  "progress-bar-indeterminate": {
    loader: () => import("./progress-bar/indeterminate").then((m) => m.Indeterminate),
    file: "en/progress-bar/indeterminate.tsx",
  },
  "progress-bar-custom-value": {
    loader: () => import("./progress-bar/custom-value").then((m) => m.CustomValue),
    file: "en/progress-bar/custom-value.tsx",
  },
  "progress-bar-custom-styles": {
    loader: () => import("./progress-bar/custom-styles").then((m) => m.CustomStyles),
    file: "en/progress-bar/custom-styles.tsx",
  },

  // ProgressCircle Demo
  "progress-circle-basic": {
    loader: () => import("./progress-circle/basic").then((m) => m.Basic),
    file: "en/progress-circle/basic.tsx",
  },
  "progress-circle-sizes": {
    loader: () => import("./progress-circle/sizes").then((m) => m.Sizes),
    file: "en/progress-circle/sizes.tsx",
  },
  "progress-circle-colors": {
    loader: () => import("./progress-circle/colors").then((m) => m.Colors),
    file: "en/progress-circle/colors.tsx",
  },
  "progress-circle-indeterminate": {
    loader: () => import("./progress-circle/indeterminate").then((m) => m.Indeterminate),
    file: "en/progress-circle/indeterminate.tsx",
  },
  "progress-circle-with-label": {
    loader: () => import("./progress-circle/with-label").then((m) => m.WithLabel),
    file: "en/progress-circle/with-label.tsx",
  },
  "progress-circle-custom-svg": {
    loader: () => import("./progress-circle/custom-svg").then((m) => m.CustomSvg),
    file: "en/progress-circle/custom-svg.tsx",
  },
  "progress-circle-custom-styles": {
    loader: () => import("./progress-circle/custom-styles").then((m) => m.CustomStyles),
    file: "en/progress-circle/custom-styles.tsx",
  },

  // RadioGroup Demo
  "radio-group-basic": {
    loader: () => import("./radio-group/basic").then((m) => m.Basic),
    file: "en/radio-group/basic.tsx",
  },
  "radio-group-horizontal": {
    loader: () => import("./radio-group/horizontal").then((m) => m.Horizontal),
    file: "en/radio-group/horizontal.tsx",
  },
  "radio-group-variants": {
    loader: () => import("./radio-group/variants").then((m) => m.Variants),
    file: "en/radio-group/variants.tsx",
  },
  "radio-group-on-surface": {
    loader: () => import("./radio-group/on-surface").then((m) => m.OnSurface),
    file: "en/radio-group/on-surface.tsx",
  },
  "radio-group-disabled": {
    loader: () => import("./radio-group/disabled").then((m) => m.Disabled),
    file: "en/radio-group/disabled.tsx",
  },
  "radio-group-controlled": {
    loader: () => import("./radio-group/controlled").then((m) => m.Controlled),
    file: "en/radio-group/controlled.tsx",
  },
  "radio-group-uncontrolled": {
    loader: () => import("./radio-group/uncontrolled").then((m) => m.Uncontrolled),
    file: "en/radio-group/uncontrolled.tsx",
  },
  "radio-group-validation": {
    loader: () => import("./radio-group/validation").then((m) => m.Validation),
    file: "en/radio-group/validation.tsx",
  },
  "radio-group-delivery-and-payment": {
    loader: () => import("./radio-group/delivery-and-payment").then((m) => m.DeliveryAndPayment),
    file: "en/radio-group/delivery-and-payment.tsx",
  },
  "radio-group-custom-indicator": {
    loader: () => import("./radio-group/custom-indicator").then((m) => m.CustomIndicator),
    file: "en/radio-group/custom-indicator.tsx",
  },
  "radio-group-render-function": {
    loader: () => import("./radio-group/render-function").then((m) => m.RenderFunction),
    file: "en/radio-group/render-function.tsx",
  },
  "radio-group-custom-styles": {
    loader: () => import("./radio-group/custom-styles").then((m) => m.CustomStyles),
    file: "en/radio-group/custom-styles.tsx",
  },

  // RangeCalendar Demo
  "range-calendar-basic": {
    loader: () => import("./range-calendar/basic").then((m) => m.Basic),
    file: "en/range-calendar/basic.tsx",
  },
  "range-calendar-disabled": {
    loader: () => import("./range-calendar/disabled").then((m) => m.Disabled),
    file: "en/range-calendar/disabled.tsx",
  },
  "range-calendar-year-picker": {
    loader: () => import("./range-calendar/year-picker").then((m) => m.YearPicker),
    file: "en/range-calendar/year-picker.tsx",
  },
  "range-calendar-default-value": {
    loader: () => import("./range-calendar/default-value").then((m) => m.DefaultValue),
    file: "en/range-calendar/default-value.tsx",
  },
  "range-calendar-controlled": {
    loader: () => import("./range-calendar/controlled").then((m) => m.Controlled),
    file: "en/range-calendar/controlled.tsx",
  },
  "range-calendar-min-max-dates": {
    loader: () => import("./range-calendar/min-max-dates").then((m) => m.MinMaxDates),
    file: "en/range-calendar/min-max-dates.tsx",
  },
  "range-calendar-unavailable-dates": {
    loader: () => import("./range-calendar/unavailable-dates").then((m) => m.UnavailableDates),
    file: "en/range-calendar/unavailable-dates.tsx",
  },
  "range-calendar-anchor-unavailable-dates": {
    loader: () =>
      import("./range-calendar/anchor-unavailable-dates").then((m) => m.AnchorUnavailableDates),
    file: "en/range-calendar/anchor-unavailable-dates.tsx",
  },
  "range-calendar-weeks-in-month": {
    loader: () => import("./range-calendar/weeks-in-month").then((m) => m.WeeksInMonth),
    file: "en/range-calendar/weeks-in-month.tsx",
  },
  "range-calendar-week-view": {
    loader: () => import("./range-calendar/week-view").then((m) => m.WeekView),
    file: "en/range-calendar/week-view.tsx",
  },
  "range-calendar-day-view": {
    loader: () => import("./range-calendar/day-view").then((m) => m.DayView),
    file: "en/range-calendar/day-view.tsx",
  },
  "range-calendar-allows-non-contiguous-ranges": {
    loader: () =>
      import("./range-calendar/allows-non-contiguous-ranges").then(
        (m) => m.AllowsNonContiguousRanges,
      ),
    file: "en/range-calendar/allows-non-contiguous-ranges.tsx",
  },
  "range-calendar-read-only": {
    loader: () => import("./range-calendar/read-only").then((m) => m.ReadOnly),
    file: "en/range-calendar/read-only.tsx",
  },
  "range-calendar-invalid": {
    loader: () => import("./range-calendar/invalid").then((m) => m.Invalid),
    file: "en/range-calendar/invalid.tsx",
  },
  "range-calendar-focused-value": {
    loader: () => import("./range-calendar/focused-value").then((m) => m.FocusedValue),
    file: "en/range-calendar/focused-value.tsx",
  },
  "range-calendar-with-indicators": {
    loader: () => import("./range-calendar/with-indicators").then((m) => m.WithIndicators),
    file: "en/range-calendar/with-indicators.tsx",
  },
  "range-calendar-booking-calendar": {
    loader: () => import("./range-calendar/booking-calendar").then((m) => m.BookingCalendar),
    file: "en/range-calendar/booking-calendar.tsx",
  },
  "range-calendar-multiple-months": {
    loader: () => import("./range-calendar/multiple-months").then((m) => m.MultipleMonths),
    file: "en/range-calendar/multiple-months.tsx",
  },
  "range-calendar-international-calendar": {
    loader: () =>
      import("./range-calendar/international-calendar").then((m) => m.InternationalCalendar),
    file: "en/range-calendar/international-calendar.tsx",
  },
  "range-calendar-custom-styles": {
    loader: () => import("./range-calendar/custom-styles").then((m) => m.CustomStyles),
    file: "en/range-calendar/custom-styles.tsx",
  },

  // ScrollShadow Demo
  "scroll-shadow-default": {
    loader: () => import("./scroll-shadow/default").then((m) => m.default),
    file: "en/scroll-shadow/default.tsx",
  },
  "scroll-shadow-orientation": {
    loader: () => import("./scroll-shadow/orientation").then((m) => m.default),
    file: "en/scroll-shadow/orientation.tsx",
  },
  "scroll-shadow-size": {
    loader: () => import("./scroll-shadow/size").then((m) => m.default),
    file: "en/scroll-shadow/size.tsx",
  },
  "scroll-shadow-with-card": {
    loader: () => import("./scroll-shadow/with-card").then((m) => m.default),
    file: "en/scroll-shadow/with-card.tsx",
  },
  "scroll-shadow-hide-scroll-bar": {
    loader: () => import("./scroll-shadow/hide-scroll-bar").then((m) => m.default),
    file: "en/scroll-shadow/hide-scroll-bar.tsx",
  },
  "scroll-shadow-visibility-change": {
    loader: () => import("./scroll-shadow/visibility-change").then((m) => m.default),
    file: "en/scroll-shadow/visibility-change.tsx",
  },
  "scroll-shadow-custom-styles": {
    loader: () => import("./scroll-shadow/custom-styles").then((m) => m.CustomStyles),
    file: "en/scroll-shadow/custom-styles.tsx",
  },

  // SearchField Demo
  "search-field-basic": {
    loader: () => import("./search-field/basic").then((m) => m.Basic),
    file: "en/search-field/basic.tsx",
  },
  "search-field-variants": {
    loader: () => import("./search-field/variants").then((m) => m.Variants),
    file: "en/search-field/variants.tsx",
  },
  "search-field-on-surface": {
    loader: () => import("./search-field/on-surface").then((m) => m.OnSurface),
    file: "en/search-field/on-surface.tsx",
  },
  "search-field-with-description": {
    loader: () => import("./search-field/with-description").then((m) => m.WithDescription),
    file: "en/search-field/with-description.tsx",
  },
  "search-field-required": {
    loader: () => import("./search-field/required").then((m) => m.Required),
    file: "en/search-field/required.tsx",
  },
  "search-field-disabled": {
    loader: () => import("./search-field/disabled").then((m) => m.Disabled),
    file: "en/search-field/disabled.tsx",
  },
  "search-field-full-width": {
    loader: () => import("./search-field/full-width").then((m) => m.FullWidth),
    file: "en/search-field/full-width.tsx",
  },
  "search-field-validation": {
    loader: () => import("./search-field/validation").then((m) => m.Validation),
    file: "en/search-field/validation.tsx",
  },
  "search-field-controlled": {
    loader: () => import("./search-field/controlled").then((m) => m.Controlled),
    file: "en/search-field/controlled.tsx",
  },
  "search-field-form-example": {
    loader: () => import("./search-field/form-example").then((m) => m.FormExample),
    file: "en/search-field/form-example.tsx",
  },
  "search-field-with-validation": {
    loader: () => import("./search-field/with-validation").then((m) => m.WithValidation),
    file: "en/search-field/with-validation.tsx",
  },
  "search-field-custom-icons": {
    loader: () => import("./search-field/custom-icons").then((m) => m.CustomIcons),
    file: "en/search-field/custom-icons.tsx",
  },
  "search-field-with-keyboard-shortcut": {
    loader: () =>
      import("./search-field/with-keyboard-shortcut").then((m) => m.WithKeyboardShortcut),
    file: "en/search-field/with-keyboard-shortcut.tsx",
  },
  "search-field-render-function": {
    loader: () => import("./search-field/render-function").then((m) => m.RenderFunction),
    file: "en/search-field/render-function.tsx",
  },
  "search-field-custom-styles": {
    loader: () => import("./search-field/custom-styles").then((m) => m.CustomStyles),
    file: "en/search-field/custom-styles.tsx",
  },

  // Select Demo
  "select-default": {
    loader: () => import("./select/default").then((m) => m.Default),
    file: "en/select/default.tsx",
  },
  "select-variants": {
    loader: () => import("./select/variants").then((m) => m.Variants),
    file: "en/select/variants.tsx",
  },
  "select-full-width": {
    loader: () => import("./select/full-width").then((m) => m.FullWidth),
    file: "en/select/full-width.tsx",
  },
  "select-with-description": {
    loader: () => import("./select/with-description").then((m) => m.WithDescription),
    file: "en/select/with-description.tsx",
  },
  "select-required": {
    loader: () => import("./select/required").then((m) => m.Required),
    file: "en/select/required.tsx",
  },
  "select-disabled": {
    loader: () => import("./select/disabled").then((m) => m.Disabled),
    file: "en/select/disabled.tsx",
  },
  "select-with-disabled-options": {
    loader: () => import("./select/with-disabled-options").then((m) => m.WithDisabledOptions),
    file: "en/select/with-disabled-options.tsx",
  },
  "select-multiple-select": {
    loader: () => import("./select/multiple-select").then((m) => m.MultipleSelect),
    file: "en/select/multiple-select.tsx",
  },
  "select-with-sections": {
    loader: () => import("./select/with-sections").then((m) => m.WithSections),
    file: "en/select/with-sections.tsx",
  },
  "select-controlled": {
    loader: () => import("./select/controlled").then((m) => m.Controlled),
    file: "en/select/controlled.tsx",
  },
  "select-controlled-multiple": {
    loader: () => import("./select/controlled-multiple").then((m) => m.ControlledMultiple),
    file: "en/select/controlled-multiple.tsx",
  },
  "select-controlled-open-state": {
    loader: () => import("./select/controlled-open-state").then((m) => m.ControlledOpenState),
    file: "en/select/controlled-open-state.tsx",
  },
  "select-asynchronous-loading": {
    loader: () => import("./select/asynchronous-loading").then((m) => m.AsynchronousLoading),
    file: "en/select/asynchronous-loading.tsx",
  },
  "select-custom-indicator": {
    loader: () => import("./select/custom-indicator").then((m) => m.CustomIndicator),
    file: "en/select/custom-indicator.tsx",
  },
  "select-with-clear-button": {
    loader: () => import("./select/with-clear-button").then((m) => m.WithClearButton),
    file: "en/select/with-clear-button.tsx",
  },
  "select-custom-value": {
    loader: () => import("./select/custom-value").then((m) => m.CustomValue),
    file: "en/select/custom-value.tsx",
  },
  "select-render-function": {
    loader: () => import("./select/render-function").then((m) => m.RenderFunction),
    file: "en/select/render-function.tsx",
  },
  "select-on-surface": {
    loader: () => import("./select/on-surface").then((m) => m.OnSurface),
    file: "en/select/on-surface.tsx",
  },
  "select-custom-styles": {
    loader: () => import("./select/custom-styles").then((m) => m.CustomStyles),
    file: "en/select/custom-styles.tsx",
  },

  // Separator Demo
  "separator-basic": {
    loader: () => import("./separator/basic").then((m) => m.Basic),
    file: "en/separator/basic.tsx",
  },
  "separator-variants": {
    loader: () => import("./separator/variants").then((m) => m.Variants),
    file: "en/separator/variants.tsx",
  },
  "separator-with-surface": {
    loader: () => import("./separator/with-surface").then((m) => m.WithSurface),
    file: "en/separator/with-surface.tsx",
  },
  "separator-vertical": {
    loader: () => import("./separator/vertical").then((m) => m.Vertical),
    file: "en/separator/vertical.tsx",
  },
  "separator-with-content": {
    loader: () => import("./separator/with-content").then((m) => m.WithContent),
    file: "en/separator/with-content.tsx",
  },
  "separator-render-function": {
    loader: () => import("./separator/render-function").then((m) => m.RenderFunction),
    file: "en/separator/render-function.tsx",
  },
  "separator-custom-styles": {
    loader: () => import("./separator/custom-styles").then((m) => m.CustomStyles),
    file: "en/separator/custom-styles.tsx",
  },

  // Skeleton Demo
  "skeleton-basic": {
    loader: () => import("./skeleton/basic").then((m) => m.Basic),
    file: "en/skeleton/basic.tsx",
  },
  "skeleton-text-content": {
    loader: () => import("./skeleton/text-content").then((m) => m.TextContent),
    file: "en/skeleton/text-content.tsx",
  },
  "skeleton-user-profile": {
    loader: () => import("./skeleton/user-profile").then((m) => m.UserProfile),
    file: "en/skeleton/user-profile.tsx",
  },
  "skeleton-list": {
    loader: () => import("./skeleton/list").then((m) => m.List),
    file: "en/skeleton/list.tsx",
  },
  "skeleton-grid": {
    loader: () => import("./skeleton/grid").then((m) => m.Grid),
    file: "en/skeleton/grid.tsx",
  },
  "skeleton-single-shimmer": {
    loader: () => import("./skeleton/single-shimmer").then((m) => m.SingleShimmer),
    file: "en/skeleton/single-shimmer.tsx",
  },
  "skeleton-animation-types": {
    loader: () => import("./skeleton/animation-types").then((m) => m.AnimationTypes),
    file: "en/skeleton/animation-types.tsx",
  },
  "skeleton-custom-styles": {
    loader: () => import("./skeleton/custom-styles").then((m) => m.CustomStyles),
    file: "en/skeleton/custom-styles.tsx",
  },

  // Slider Demo
  "slider-default": {
    loader: () => import("./slider/default").then((m) => m.Default),
    file: "en/slider/default.tsx",
  },
  "slider-disabled": {
    loader: () => import("./slider/disabled").then((m) => m.Disabled),
    file: "en/slider/disabled.tsx",
  },
  "slider-vertical": {
    loader: () => import("./slider/vertical").then((m) => m.Vertical),
    file: "en/slider/vertical.tsx",
  },
  "slider-range": {
    loader: () => import("./slider/range").then((m) => m.Range),
    file: "en/slider/range.tsx",
  },
  "slider-controlled": {
    loader: () => import("./slider/controlled").then((m) => m.Controlled),
    file: "en/slider/controlled.tsx",
  },
  "slider-custom-value-formatting": {
    loader: () => import("./slider/custom-value-formatting").then((m) => m.CustomValueFormatting),
    file: "en/slider/custom-value-formatting.tsx",
  },
  "slider-custom-output": {
    loader: () => import("./slider/custom-output").then((m) => m.CustomOutput),
    file: "en/slider/custom-output.tsx",
  },
  "slider-render-function": {
    loader: () => import("./slider/render-function").then((m) => m.RenderFunction),
    file: "en/slider/render-function.tsx",
  },
  "slider-custom-styles": {
    loader: () => import("./slider/custom-styles").then((m) => m.CustomStyles),
    file: "en/slider/custom-styles.tsx",
  },

  // Spinner Demo
  "spinner-basic": {
    loader: () => import("./spinner/basic").then((m) => m.SpinnerBasic),
    file: "en/spinner/basic.tsx",
  },
  "spinner-colors": {
    loader: () => import("./spinner/colors").then((m) => m.SpinnerColors),
    file: "en/spinner/colors.tsx",
  },
  "spinner-sizes": {
    loader: () => import("./spinner/sizes").then((m) => m.SpinnerSizes),
    file: "en/spinner/sizes.tsx",
  },
  "spinner-speed": {
    loader: () => import("./spinner/speed").then((m) => m.SpinnerSpeed),
    file: "en/spinner/speed.tsx",
  },
  "spinner-custom-styles": {
    loader: () => import("./spinner/custom-styles").then((m) => m.CustomStyles),
    file: "en/spinner/custom-styles.tsx",
  },

  // Surface Demo
  "surface-basic": {
    loader: () => import("./surface/basic").then((m) => m.Basic),
    file: "en/surface/basic.tsx",
  },
  "surface-variants": {
    loader: () => import("./surface/variants").then((m) => m.Variants),
    file: "en/surface/variants.tsx",
  },
  "surface-with-form-components": {
    loader: () => import("./surface/with-form-components").then((m) => m.WithFormComponents),
    file: "en/surface/with-form-components.tsx",
  },
  "surface-custom-styles": {
    loader: () => import("./surface/custom-styles").then((m) => m.CustomStyles),
    file: "en/surface/custom-styles.tsx",
  },

  // Switch Demo
  "switch-basic": {
    loader: () => import("./switch/basic").then((m) => m.Basic),
    file: "en/switch/basic.tsx",
  },
  "switch-sizes": {
    loader: () => import("./switch/sizes").then((m) => m.Sizes),
    file: "en/switch/sizes.tsx",
  },
  "switch-with-icons": {
    loader: () => import("./switch/with-icons").then((m) => m.WithIcons),
    file: "en/switch/with-icons.tsx",
  },
  "switch-disabled": {
    loader: () => import("./switch/disabled").then((m) => m.Disabled),
    file: "en/switch/disabled.tsx",
  },
  "switch-without-label": {
    loader: () => import("./switch/without-label").then((m) => m.WithoutLabel),
    file: "en/switch/without-label.tsx",
  },
  "switch-with-description": {
    loader: () => import("./switch/with-description").then((m) => m.WithDescription),
    file: "en/switch/with-description.tsx",
  },
  "switch-default-selected": {
    loader: () => import("./switch/default-selected").then((m) => m.DefaultSelected),
    file: "en/switch/default-selected.tsx",
  },
  "switch-controlled": {
    loader: () => import("./switch/controlled").then((m) => m.Controlled),
    file: "en/switch/controlled.tsx",
  },
  "switch-label-position": {
    loader: () => import("./switch/label-position").then((m) => m.LabelPosition),
    file: "en/switch/label-position.tsx",
  },
  "switch-group": {
    loader: () => import("./switch/group").then((m) => m.Group),
    file: "en/switch/group.tsx",
  },
  "switch-group-horizontal": {
    loader: () => import("./switch/group-horizontal").then((m) => m.GroupHorizontal),
    file: "en/switch/group-horizontal.tsx",
  },
  "switch-form": {
    loader: () => import("./switch/form").then((m) => m.Form),
    file: "en/switch/form.tsx",
  },
  "switch-render-props": {
    loader: () => import("./switch/render-props").then((m) => m.RenderProps),
    file: "en/switch/render-props.tsx",
  },
  "switch-render-function": {
    loader: () => import("./switch/render-function").then((m) => m.RenderFunction),
    file: "en/switch/render-function.tsx",
  },
  "switch-custom-styles": {
    loader: () => import("./switch/custom-styles").then((m) => m.CustomStyles),
    file: "en/switch/custom-styles.tsx",
  },

  // Table Demo
  "table-basic": {
    loader: () => import("./table/basic").then((m) => m.Basic),
    file: "en/table/basic.tsx",
  },
  "table-secondary-variant": {
    loader: () => import("./table/secondary-variant").then((m) => m.SecondaryVariant),
    file: "en/table/secondary-variant.tsx",
  },
  "table-async-loading": {
    loader: () => import("./table/async-loading").then((m) => m.AsyncLoading),
    file: "en/table/async-loading.tsx",
  },
  "table-sorting": {
    loader: () => import("./table/sorting").then((m) => m.Sorting),
    file: "en/table/sorting.tsx",
  },
  "table-selection": {
    loader: () => import("./table/selection").then((m) => m.SelectionDemo),
    file: "en/table/selection.tsx",
  },
  "table-expandable-rows": {
    loader: () => import("./table/expandable-rows").then((m) => m.ExpandableRows),
    file: "en/table/expandable-rows.tsx",
  },
  "table-pagination": {
    loader: () => import("./table/pagination").then((m) => m.PaginationDemo),
    file: "en/table/pagination.tsx",
  },
  "table-column-resizing": {
    loader: () => import("./table/column-resizing").then((m) => m.ColumnResizing),
    file: "en/table/column-resizing.tsx",
  },
  "table-empty-state": {
    loader: () => import("./table/empty-state").then((m) => m.EmptyStateDemo),
    file: "en/table/empty-state.tsx",
  },
  "table-virtualization": {
    loader: () => import("./table/virtualization").then((m) => m.Virtualization),
    file: "en/table/virtualization.tsx",
  },
  "table-tanstack-table": {
    loader: () => import("./table/tanstack-table").then((m) => m.TanstackTable),
    file: "en/table/tanstack-table.tsx",
  },
  "table-custom-cells": {
    loader: () => import("./table/custom-cells").then((m) => m.CustomCells),
    file: "en/table/custom-cells.tsx",
  },
  "table-custom-styles": {
    loader: () => import("./table/custom-styles").then((m) => m.CustomStyles),
    file: "en/table/custom-styles.tsx",
  },

  // Tabs Demo
  "tabs-basic": {
    loader: () => import("./tabs/basic").then((m) => m.Basic),
    file: "en/tabs/basic.tsx",
  },
  "tabs-vertical": {
    loader: () => import("./tabs/vertical").then((m) => m.Vertical),
    file: "en/tabs/vertical.tsx",
  },
  "tabs-overflow": {
    loader: () => import("./tabs/overflow").then((m) => m.Overflow),
    file: "en/tabs/overflow.tsx",
  },
  "tabs-disabled": {
    loader: () => import("./tabs/disabled").then((m) => m.Disabled),
    file: "en/tabs/disabled.tsx",
  },
  "tabs-with-separator": {
    loader: () => import("./tabs/with-separator").then((m) => m.WithSeparator),
    file: "en/tabs/with-separator.tsx",
  },
  "tabs-secondary": {
    loader: () => import("./tabs/secondary").then((m) => m.Secondary),
    file: "en/tabs/secondary.tsx",
  },
  "tabs-secondary-vertical": {
    loader: () => import("./tabs/secondary-vertical").then((m) => m.SecondaryVertical),
    file: "en/tabs/secondary-vertical.tsx",
  },
  "tabs-vertical-alignment": {
    loader: () => import("./tabs/vertical-alignment").then((m) => m.VerticalAlignment),
    file: "en/tabs/vertical-alignment.tsx",
  },
  "tabs-render-function": {
    loader: () => import("./tabs/render-function").then((m) => m.RenderFunction),
    file: "en/tabs/render-function.tsx",
  },
  "tabs-custom-styles": {
    loader: () => import("./tabs/custom-styles").then((m) => m.CustomStyles),
    file: "en/tabs/custom-styles.tsx",
  },

  // TagGroup Demo
  "tag-group-basic": {
    loader: () => import("./tag-group/basic").then((m) => m.TagGroupBasic),
    file: "en/tag-group/basic.tsx",
  },
  "tag-group-sizes": {
    loader: () => import("./tag-group/sizes").then((m) => m.TagGroupSizes),
    file: "en/tag-group/sizes.tsx",
  },
  "tag-group-variants": {
    loader: () => import("./tag-group/variants").then((m) => m.TagGroupVariants),
    file: "en/tag-group/variants.tsx",
  },
  "tag-group-disabled": {
    loader: () => import("./tag-group/disabled").then((m) => m.TagGroupDisabled),
    file: "en/tag-group/disabled.tsx",
  },
  "tag-group-selection-modes": {
    loader: () => import("./tag-group/selection-modes").then((m) => m.TagGroupSelectionModes),
    file: "en/tag-group/selection-modes.tsx",
  },
  "tag-group-controlled": {
    loader: () => import("./tag-group/controlled").then((m) => m.TagGroupControlled),
    file: "en/tag-group/controlled.tsx",
  },
  "tag-group-with-error-message": {
    loader: () => import("./tag-group/with-error-message").then((m) => m.TagGroupWithErrorMessage),
    file: "en/tag-group/with-error-message.tsx",
  },
  "tag-group-with-list-data": {
    loader: () => import("./tag-group/with-list-data").then((m) => m.TagGroupWithListData),
    file: "en/tag-group/with-list-data.tsx",
  },
  "tag-group-with-prefix": {
    loader: () => import("./tag-group/with-prefix").then((m) => m.TagGroupWithPrefix),
    file: "en/tag-group/with-prefix.tsx",
  },
  "tag-group-with-remove-button": {
    loader: () => import("./tag-group/with-remove-button").then((m) => m.TagGroupWithRemoveButton),
    file: "en/tag-group/with-remove-button.tsx",
  },
  "tag-group-render-function": {
    loader: () => import("./tag-group/render-function").then((m) => m.RenderFunction),
    file: "en/tag-group/render-function.tsx",
  },
  "tag-group-custom-styles": {
    loader: () => import("./tag-group/custom-styles").then((m) => m.CustomStyles),
    file: "en/tag-group/custom-styles.tsx",
  },

  // TextArea Demo
  "textarea-basic": {
    loader: () => import("./textarea/basic").then((m) => m.Basic),
    file: "en/textarea/basic.tsx",
  },
  "textarea-variants": {
    loader: () => import("./textarea/variants").then((m) => m.Variants),
    file: "en/textarea/variants.tsx",
  },
  "textarea-on-surface": {
    loader: () => import("./textarea/on-surface").then((m) => m.OnSurface),
    file: "en/textarea/on-surface.tsx",
  },
  "textarea-full-width": {
    loader: () => import("./textarea/full-width").then((m) => m.FullWidth),
    file: "en/textarea/full-width.tsx",
  },
  "textarea-controlled": {
    loader: () => import("./textarea/controlled").then((m) => m.Controlled),
    file: "en/textarea/controlled.tsx",
  },
  "textarea-rows": {
    loader: () => import("./textarea/rows").then((m) => m.Rows),
    file: "en/textarea/rows.tsx",
  },
  "text-area-custom-styles": {
    loader: () => import("./textarea/custom-styles").then((m) => m.CustomStyles),
    file: "en/textarea/custom-styles.tsx",
  },

  // TextField Demo
  "textfield-basic": {
    loader: () => import("./textfield/basic").then((m) => m.Basic),
    file: "en/textfield/basic.tsx",
  },
  "textfield-on-surface": {
    loader: () => import("./textfield/on-surface").then((m) => m.OnSurface),
    file: "en/textfield/on-surface.tsx",
  },
  "textfield-with-description": {
    loader: () => import("./textfield/with-description").then((m) => m.WithDescription),
    file: "en/textfield/with-description.tsx",
  },
  "textfield-required": {
    loader: () => import("./textfield/required").then((m) => m.Required),
    file: "en/textfield/required.tsx",
  },
  "textfield-disabled": {
    loader: () => import("./textfield/disabled").then((m) => m.Disabled),
    file: "en/textfield/disabled.tsx",
  },
  "textfield-full-width": {
    loader: () => import("./textfield/full-width").then((m) => m.FullWidth),
    file: "en/textfield/full-width.tsx",
  },
  "textfield-validation": {
    loader: () => import("./textfield/validation").then((m) => m.Validation),
    file: "en/textfield/validation.tsx",
  },
  "textfield-controlled": {
    loader: () => import("./textfield/controlled").then((m) => m.Controlled),
    file: "en/textfield/controlled.tsx",
  },
  "textfield-with-error": {
    loader: () => import("./textfield/with-error").then((m) => m.WithError),
    file: "en/textfield/with-error.tsx",
  },
  "textfield-textarea": {
    loader: () => import("./textfield/textarea").then((m) => m.TextAreaExample),
    file: "en/textfield/textarea.tsx",
  },
  "textfield-input-types": {
    loader: () => import("./textfield/input-types").then((m) => m.InputTypes),
    file: "en/textfield/input-types.tsx",
  },
  "textfield-render-function": {
    loader: () => import("./textfield/render-function").then((m) => m.RenderFunction),
    file: "en/textfield/render-function.tsx",
  },
  "text-field-custom-styles": {
    loader: () => import("./textfield/custom-styles").then((m) => m.CustomStyles),
    file: "en/textfield/custom-styles.tsx",
  },

  // TimeField Demo
  "time-field-basic": {
    loader: () => import("./time-field/basic").then((m) => m.Basic),
    file: "en/time-field/basic.tsx",
  },
  "time-field-with-prefix-icon": {
    loader: () => import("./time-field/with-prefix-icon").then((m) => m.WithPrefixIcon),
    file: "en/time-field/with-prefix-icon.tsx",
  },
  "time-field-with-suffix-icon": {
    loader: () => import("./time-field/with-suffix-icon").then((m) => m.WithSuffixIcon),
    file: "en/time-field/with-suffix-icon.tsx",
  },
  "time-field-with-prefix-and-suffix": {
    loader: () => import("./time-field/with-prefix-and-suffix").then((m) => m.WithPrefixAndSuffix),
    file: "en/time-field/with-prefix-and-suffix.tsx",
  },
  "time-field-on-surface": {
    loader: () => import("./time-field/on-surface").then((m) => m.OnSurface),
    file: "en/time-field/on-surface.tsx",
  },
  "time-field-with-description": {
    loader: () => import("./time-field/with-description").then((m) => m.WithDescription),
    file: "en/time-field/with-description.tsx",
  },
  "time-field-required": {
    loader: () => import("./time-field/required").then((m) => m.Required),
    file: "en/time-field/required.tsx",
  },
  "time-field-disabled": {
    loader: () => import("./time-field/disabled").then((m) => m.Disabled),
    file: "en/time-field/disabled.tsx",
  },
  "time-field-full-width": {
    loader: () => import("./time-field/full-width").then((m) => m.FullWidth),
    file: "en/time-field/full-width.tsx",
  },
  "time-field-invalid": {
    loader: () => import("./time-field/invalid").then((m) => m.Invalid),
    file: "en/time-field/invalid.tsx",
  },
  "time-field-controlled": {
    loader: () => import("./time-field/controlled").then((m) => m.Controlled),
    file: "en/time-field/controlled.tsx",
  },
  "time-field-form-example": {
    loader: () => import("./time-field/form-example").then((m) => m.FormExample),
    file: "en/time-field/form-example.tsx",
  },
  "time-field-with-validation": {
    loader: () => import("./time-field/with-validation").then((m) => m.WithValidation),
    file: "en/time-field/with-validation.tsx",
  },
  "time-field-render-function": {
    loader: () => import("./time-field/render-function").then((m) => m.RenderFunction),
    file: "en/time-field/render-function.tsx",
  },
  "time-field-custom-styles": {
    loader: () => import("./time-field/custom-styles").then((m) => m.CustomStyles),
    file: "en/time-field/custom-styles.tsx",
  },

  // Toast Demo
  "toast-default": {
    loader: () => import("./toast/default").then((m) => m.Default),
    file: "en/toast/default.tsx",
  },
  "toast-variants": {
    loader: () => import("./toast/variants").then((m) => m.Variants),
    file: "en/toast/variants.tsx",
  },
  "toast-placements": {
    loader: () => import("./toast/placements").then((m) => m.Placements),
    file: "en/toast/placements.tsx",
  },
  "toast-expanded": {
    loader: () => import("./toast/expanded").then((m) => m.Expanded),
    file: "en/toast/expanded.tsx",
  },
  "toast-simple": {
    loader: () => import("./toast/simple").then((m) => m.Simple),
    file: "en/toast/simple.tsx",
  },
  "toast-custom-indicator": {
    loader: () => import("./toast/custom-indicator").then((m) => m.CustomIndicator),
    file: "en/toast/custom-indicator.tsx",
  },
  "toast-custom-toast": {
    loader: () => import("./toast/custom-toast").then((m) => m.CustomToast),
    file: "en/toast/custom-toast.tsx",
  },
  "toast-promise": {
    loader: () => import("./toast/promise").then((m) => m.PromiseDemo),
    file: "en/toast/promise.tsx",
  },
  "toast-callbacks": {
    loader: () => import("./toast/callbacks").then((m) => m.Callbacks),
    file: "en/toast/callbacks.tsx",
  },
  "toast-custom-queue": {
    loader: () => import("./toast/custom-queue").then((m) => m.CustomQueue),
    file: "en/toast/custom-queue.tsx",
  },
  "toast-custom-styles": {
    loader: () => import("./toast/custom-styles").then((m) => m.CustomStyles),
    file: "en/toast/custom-styles.tsx",
  },

  // ToggleButton Demo
  "toggle-button-basic": {
    loader: () => import("./toggle-button/basic").then((m) => m.Basic),
    file: "en/toggle-button/basic.tsx",
  },
  "toggle-button-variants": {
    loader: () => import("./toggle-button/variants").then((m) => m.Variants),
    file: "en/toggle-button/variants.tsx",
  },
  "toggle-button-icon-only": {
    loader: () => import("./toggle-button/icon-only").then((m) => m.IconOnly),
    file: "en/toggle-button/icon-only.tsx",
  },
  "toggle-button-sizes": {
    loader: () => import("./toggle-button/sizes").then((m) => m.Sizes),
    file: "en/toggle-button/sizes.tsx",
  },
  "toggle-button-disabled": {
    loader: () => import("./toggle-button/disabled").then((m) => m.Disabled),
    file: "en/toggle-button/disabled.tsx",
  },
  "toggle-button-controlled": {
    loader: () => import("./toggle-button/controlled").then((m) => m.Controlled),
    file: "en/toggle-button/controlled.tsx",
  },
  "toggle-button-custom-styles": {
    loader: () => import("./toggle-button/custom-styles").then((m) => m.CustomStyles),
    file: "en/toggle-button/custom-styles.tsx",
  },

  // ToggleButtonGroup Demo
  "toggle-button-group-basic": {
    loader: () => import("./toggle-button-group/basic").then((m) => m.Basic),
    file: "en/toggle-button-group/basic.tsx",
  },
  "toggle-button-group-sizes": {
    loader: () => import("./toggle-button-group/sizes").then((m) => m.Sizes),
    file: "en/toggle-button-group/sizes.tsx",
  },
  "toggle-button-group-orientation": {
    loader: () => import("./toggle-button-group/orientation").then((m) => m.Orientation),
    file: "en/toggle-button-group/orientation.tsx",
  },
  "toggle-button-group-full-width": {
    loader: () => import("./toggle-button-group/full-width").then((m) => m.FullWidth),
    file: "en/toggle-button-group/full-width.tsx",
  },
  "toggle-button-group-disabled": {
    loader: () => import("./toggle-button-group/disabled").then((m) => m.Disabled),
    file: "en/toggle-button-group/disabled.tsx",
  },
  "toggle-button-group-without-separator": {
    loader: () => import("./toggle-button-group/without-separator").then((m) => m.WithoutSeparator),
    file: "en/toggle-button-group/without-separator.tsx",
  },
  "toggle-button-group-attached": {
    loader: () => import("./toggle-button-group/attached").then((m) => m.Attached),
    file: "en/toggle-button-group/attached.tsx",
  },
  "toggle-button-group-selection-mode": {
    loader: () => import("./toggle-button-group/selection-mode").then((m) => m.SelectionMode),
    file: "en/toggle-button-group/selection-mode.tsx",
  },
  "toggle-button-group-controlled": {
    loader: () => import("./toggle-button-group/controlled").then((m) => m.Controlled),
    file: "en/toggle-button-group/controlled.tsx",
  },
  "toggle-button-group-custom-styles": {
    loader: () => import("./toggle-button-group/custom-styles").then((m) => m.CustomStyles),
    file: "en/toggle-button-group/custom-styles.tsx",
  },

  // Toolbar Demo
  "toolbar-basic": {
    loader: () => import("./toolbar/basic").then((m) => m.Basic),
    file: "en/toolbar/basic.tsx",
  },
  "toolbar-vertical": {
    loader: () => import("./toolbar/vertical").then((m) => m.Vertical),
    file: "en/toolbar/vertical.tsx",
  },
  "toolbar-attached": {
    loader: () => import("./toolbar/attached").then((m) => m.Attached),
    file: "en/toolbar/attached.tsx",
  },
  "toolbar-with-button-group": {
    loader: () => import("./toolbar/with-button-group").then((m) => m.WithButtonGroup),
    file: "en/toolbar/with-button-group.tsx",
  },
  "toolbar-custom-styles": {
    loader: () => import("./toolbar/custom-styles").then((m) => m.CustomStyles),
    file: "en/toolbar/custom-styles.tsx",
  },

  // Tooltip Demo
  "tooltip-basic": {
    loader: () => import("./tooltip/basic").then((m) => m.TooltipBasic),
    file: "en/tooltip/basic.tsx",
  },
  "tooltip-placement": {
    loader: () => import("./tooltip/placement").then((m) => m.TooltipPlacement),
    file: "en/tooltip/placement.tsx",
  },
  "tooltip-with-arrow": {
    loader: () => import("./tooltip/with-arrow").then((m) => m.TooltipWithArrow),
    file: "en/tooltip/with-arrow.tsx",
  },
  "tooltip-custom-trigger": {
    loader: () => import("./tooltip/custom-trigger").then((m) => m.TooltipCustomTrigger),
    file: "en/tooltip/custom-trigger.tsx",
  },
  "tooltip-render-function": {
    loader: () => import("./tooltip/render-function").then((m) => m.RenderFunction),
    file: "en/tooltip/render-function.tsx",
  },
  "tooltip-custom-styles": {
    loader: () => import("./tooltip/custom-styles").then((m) => m.CustomStyles),
    file: "en/tooltip/custom-styles.tsx",
  },

  // Typography Demo
  "typography-default": {
    loader: () => import("./typography/default").then((m) => m.Default),
    file: "en/typography/default.tsx",
  },
  "typography-typography-scale": {
    loader: () => import("./typography/typography-scale").then((m) => m.TypographyScale),
    file: "en/typography/typography-scale.tsx",
  },
  "typography-primitives": {
    loader: () => import("./typography/primitives").then((m) => m.Primitives),
    file: "en/typography/primitives.tsx",
  },
  "typography-prose": {
    loader: () => import("./typography/prose").then((m) => m.Prose),
    file: "en/typography/prose.tsx",
  },
  "typography-render-props": {
    loader: () => import("./typography/render-props").then((m) => m.RenderProps),
    file: "en/typography/render-props.tsx",
  },
  "typography-custom-styles": {
    loader: () => import("./typography/custom-styles").then((m) => m.CustomStyles),
    file: "en/typography/custom-styles.tsx",
  },

  // Release Demos
  "release-button-outline-variant": {
    loader: () => import("./button/release-outline-variant").then((m) => m.OutlineVariant),
    file: "en/button/release-outline-variant.tsx",
  },
  "release-chip-vibrant-palette": {
    loader: () => import("./chip/release-vibrant-palette").then((m) => m.ChipVibrantPalette),
    file: "en/chip/release-vibrant-palette.tsx",
  },
  "release-date-range-picker-input-container": {
    loader: () =>
      import("./date-range-picker/release-input-container").then((m) => m.InputContainer),
    file: "en/date-range-picker/release-input-container.tsx",
  },
  "release-list-box-scrollbar-modes": {
    loader: () => import("./list-box/release-scrollbar-modes").then((m) => m.ScrollbarModes),
    file: "en/list-box/release-scrollbar-modes.tsx",
  },
};
