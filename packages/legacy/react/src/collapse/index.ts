import Collapse from "./collapse";
import CollapseGroup from "./collapse-group";

export type {CollapseProps} from "./collapse";
export type {CollapseGroupProps} from "./collapse-group";

Collapse.Group = CollapseGroup;

// export styled components
export {
  StyledCollapse,
  StyledCollapseView,
  StyledCollapseContent,
  StyledCollapseIcon,
  StyledCollapseGroup,
} from "./collapse.styles";
export type {
  CollapseVariantsProps,
  CollapseViewVariantsProps,
  CollapseContentVariantsProps,
  CollapseIconVariantsProps,
  CollapseGroupVariantsProps,
} from "./collapse.styles";

export default Collapse;
