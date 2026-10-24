import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Breadcrumbs} from "@/components/breadcrumbs";

const renderBreadcrumbs = (
  props: Partial<{isDisabled: boolean; separator: React.ReactNode}> = {},
) =>
  render(
    <Breadcrumbs
      data-testid="breadcrumbs"
      isDisabled={props.isDisabled}
      separator={props.separator}
    >
      <Breadcrumbs.Item href="#home">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#products">Products</Breadcrumbs.Item>
      <Breadcrumbs.Item>Laptop</Breadcrumbs.Item>
    </Breadcrumbs>,
  );

describe("Breadcrumbs", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("exposes data-slot, BEM block, and a labelled list role", () => {
    renderBreadcrumbs();

    const root = screen.getByTestId("breadcrumbs");

    expect(root).toHaveAttribute("data-slot", "breadcrumbs");
    expect(root.className).toEqual(expect.stringContaining("breadcrumbs"));
    expect(screen.getByRole("list")).toBe(root);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders each item as a link with data-slot", () => {
    renderBreadcrumbs();

    expect(document.querySelectorAll('[data-slot="breadcrumbs-item"]')).toHaveLength(3);
    expect(screen.getByRole("link", {name: "Home"})).toHaveAttribute("href", "#home");
    expect(screen.getByRole("link", {name: "Products"})).toHaveAttribute("href", "#products");
  });

  it("exposes current page on the last item without separator", () => {
    renderBreadcrumbs();

    const current = screen.getByText("Laptop");

    expect(current.closest("li")).toHaveAttribute("data-current", "true");
    expect(screen.getByRole("link", {name: "Laptop"})).toHaveAttribute("aria-current", "page");
  });

  it("renders a default chevron separator between non-final items", () => {
    renderBreadcrumbs();

    expect(document.querySelectorAll('[data-slot="breadcrumbs-separator"]')).toHaveLength(2);
  });

  it("supports a custom separator", () => {
    renderBreadcrumbs({separator: <span data-testid="custom-separator">/</span>});

    const separators = document.querySelectorAll('[data-slot="breadcrumbs-separator"]');

    expect(separators).toHaveLength(2);
    expect(screen.getAllByTestId("custom-separator")).toHaveLength(2);
  });

  it("exposes aria-disabled on links when isDisabled", () => {
    renderBreadcrumbs({isDisabled: true});

    expect(screen.getByRole("link", {name: "Home"})).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("link", {name: "Products"})).toHaveAttribute("aria-disabled", "true");
  });

  it("calls onPress when a non-current item is activated", async () => {
    const onPress = vi.fn();

    render(
      <Breadcrumbs>
        <Breadcrumbs.Item href="#home" onPress={onPress}>
          Home
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Current</Breadcrumbs.Item>
      </Breadcrumbs>,
    );

    await user.click(screen.getByRole("link", {name: "Home"}));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("supports item children as a render function that owns the item content", () => {
    render(
      <Breadcrumbs>
        <Breadcrumbs.Item href="#home">
          {() => <span data-testid="custom-item">Home</span>}
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Current</Breadcrumbs.Item>
      </Breadcrumbs>,
    );

    expect(screen.getByTestId("custom-item")).toHaveTextContent("Home");
    // The render function replaces the whole item, so no Link or separator is added for it.
    expect(screen.queryByRole("link", {name: "Home"})).toBeNull();
  });
});
