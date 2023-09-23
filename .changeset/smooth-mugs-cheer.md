---
"@nextui-org/navbar": major
---
fix:Ensure Navbar Icons Update Correctly #1648

When a function is provided to the Navbar to replace the icons, only the initial icon is applied. It seems the use of useMemo(...) prevents the function from getting executed again, since isMenuOpen is not included in the dependency array.

This commit includes changes to address these problems and ensure that Navbar icons and slot classes update as expected.

Issue resolved.
