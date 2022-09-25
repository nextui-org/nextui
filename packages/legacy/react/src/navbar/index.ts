import NavbarBrand from "./navbar-brand";
import NavbarContent from "./navbar-content";
import NavbarItem from "./navbar-item";
import NavbarLink from "./navbar-link";
import NavbarToggle from "./navbar-toggle";
import NavbarCollapse from "./navbar-collapse";
import NavbarCollapseItem from "./navbar-collapse-item";
import Navbar from "./navbar";

Navbar.Brand = NavbarBrand;
Navbar.Content = NavbarContent;
Navbar.Item = NavbarItem;
Navbar.Link = NavbarLink;
Navbar.Toggle = NavbarToggle;
Navbar.Collapse = NavbarCollapse;
Navbar.CollapseItem = NavbarCollapseItem;

// export styled components
export {
  StyledBaseNavbarItem,
  StyledBaseNavbarList,
  StyledNavbarCollapseItem,
  StyledNavbarCollapseWrapper,
  StyledNavbarCollapse,
  StyledNavbarToggleIconContainer,
  StyledNavbarToggle,
  StyledNavbarBrand,
  StyledNavbarItem,
  StyledNavbarContent,
  StyledNavbarContainer,
  StyledNavbar,
} from "./navbar.styles";

// export types
export type {NavbarProps} from "./navbar";
export type {NavbarContentProps} from "./navbar-content";
export type {NavbarBrandProps} from "./navbar-brand";
export type {NavbarItemProps} from "./navbar-item";
export type {NavbarLinkProps} from "./navbar-link";
export type {NavbarToggleProps} from "./navbar-toggle";
export type {NavbarCollapseProps} from "./navbar-collapse";
export type {NavbarCollapseItemProps} from "./navbar-collapse-item";

export {default as Navbar} from './navbar';
