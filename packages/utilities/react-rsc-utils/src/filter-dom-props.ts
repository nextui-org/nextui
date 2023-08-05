import {AriaLabelingProps, DOMProps} from "@react-types/shared";

const DOMPropNames = new Set([
  "id",
  "type",
  "className",
  "style",
  "title",
  "role",
  "tabIndex",
  "htmlFor",
  "width",
  "height",
]);

interface Options {
  /**
   * If the filter should be enabled.
   */
  enabled?: boolean;
  /**
   * If labelling associated aria properties should be included in the filter.
   */
  labelable?: boolean;
  /**
   * A Set of other property names that should be included in the filter.
   */
  propNames?: Set<string>;
}

const propRe = /^(data-.*)$/;
const ariaRe = /^(aria-.*)$/;
const funcRe = /^(on[A-Z].*)$/;

/**
 * Filters out all props that aren't valid DOM props or defined via override prop obj.
 * @param props - The component props to be filtered.
 * @param opts - Props to override.
 */
export function filterDOMProps(
  props: DOMProps & AriaLabelingProps,
  opts: Options = {
    labelable: true,
    enabled: true,
  },
): DOMProps & AriaLabelingProps {
  let {labelable, propNames} = opts;
  let filteredProps = {};

  if (!opts.enabled) {
    return props;
  }

  for (const prop in props) {
    if (
      (Object.prototype.hasOwnProperty.call(props, prop) &&
        (DOMPropNames.has(prop) ||
          (labelable && ariaRe.test(prop)) ||
          propNames?.has(prop) ||
          propRe.test(prop))) ||
      funcRe.test(prop)
    ) {
      // @ts-ignore
      filteredProps[prop] = props[prop];
    }
  }

  return filteredProps;
}
