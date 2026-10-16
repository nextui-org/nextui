import type {ComponentProps} from "react";

import {act, render, screen, setupUser} from "@heroui/testing/helpers";
import {createRef} from "react";

import {Label} from "@/components/label";
import {Slider} from "@/components/slider";

import {SliderIndicatorsFixture} from "./fixtures";

const renderSlider = (props: Partial<ComponentProps<typeof Slider>> = {}) =>
  render(
    <Slider data-testid="slider" defaultValue={30} {...props}>
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>,
  );

const renderRangeSlider = (props: Partial<ComponentProps<typeof Slider>> = {}) =>
  render(
    <Slider
      data-testid="slider"
      defaultValue={[100, 500]}
      maxValue={1000}
      minValue={0}
      step={50}
      {...props}
    >
      <Label>Price Range</Label>
      <Slider.Output />
      <Slider.Track>
        {({state}) => (
          <>
            <Slider.Fill />
            {state.values.map((_, i) => (
              <Slider.Thumb key={i} index={i} />
            ))}
          </>
        )}
      </Slider.Track>
    </Slider>,
  );

describe("Slider", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders a slider thumb with accessible name from composed Label", () => {
    renderSlider();

    expect(screen.getByRole("slider", {name: "Volume"})).toBeInTheDocument();
  });

  it("exposes data-slots and BEM block", () => {
    renderSlider();

    const root = screen.getByTestId("slider");

    expect(root).toHaveAttribute("data-slot", "slider");
    expect(root.className).toEqual(expect.stringContaining("slider"));
    expect(document.querySelector('[data-slot="slider-track"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="slider-fill"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="slider-thumb"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="slider-output"]')).not.toBeNull();
  });

  it("exposes default value via range input and output text", () => {
    renderSlider({defaultValue: 30});

    const thumb = screen.getByRole("slider", {name: "Volume"});

    expect(thumb).toHaveValue("30");
    expect(document.querySelector('[data-slot="slider-output"]')).toHaveTextContent("30");
  });

  it("calls onChange when value is incremented or decremented", async () => {
    const onChange = vi.fn();

    renderSlider({defaultValue: 30, onChange});
    const thumb = screen.getByRole("slider", {name: "Volume"});

    await act(async () => {
      thumb.focus();
    });
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith(31);
    expect(thumb).toHaveValue("31");

    await user.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith(30);
    expect(thumb).toHaveValue("30");
  });

  it("supports Home / End keys to jump to min / max", async () => {
    const onChange = vi.fn();

    renderSlider({defaultValue: 30, onChange});
    const thumb = screen.getByRole("slider", {name: "Volume"});

    await act(async () => {
      thumb.focus();
    });
    await user.keyboard("{End}");
    expect(onChange).toHaveBeenLastCalledWith(100);

    await user.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it("calls onChangeEnd when the interaction completes", async () => {
    const onChangeEnd = vi.fn();

    renderSlider({defaultValue: 30, onChangeEnd});
    const thumb = screen.getByRole("slider", {name: "Volume"});

    await act(async () => {
      thumb.focus();
    });
    await user.keyboard("{ArrowRight}");

    expect(onChangeEnd).toHaveBeenCalledWith(31);
  });

  it("supports controlled value", () => {
    const onChange = vi.fn();

    const {rerender} = render(
      <Slider data-testid="slider" value={40} onChange={onChange}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>,
    );

    expect(screen.getByRole("slider", {name: "Volume"})).toHaveValue("40");

    rerender(
      <Slider data-testid="slider" value={60} onChange={onChange}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>,
    );

    expect(screen.getByRole("slider", {name: "Volume"})).toHaveValue("60");
  });

  it("supports disabled state and blocks keyboard interaction", async () => {
    const onChange = vi.fn();

    renderSlider({defaultValue: 30, isDisabled: true, onChange});
    const thumb = screen.getByRole("slider", {name: "Volume"});

    expect(document.querySelector('[data-slot="slider-track"]')).toHaveAttribute(
      "data-disabled",
      "true",
    );
    expect(document.querySelector('[data-slot="slider-fill"]')).toHaveAttribute(
      "data-disabled",
      "true",
    );

    await act(async () => {
      thumb.focus();
    });
    await user.keyboard("{ArrowRight}");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports vertical orientation via data-orientation", () => {
    renderSlider({orientation: "vertical"});

    expect(screen.getByTestId("slider")).toHaveAttribute("data-orientation", "vertical");
  });

  it("supports focus-visible via keyboard", async () => {
    renderSlider();

    await user.tab();
    expect(screen.getByRole("slider", {name: "Volume"})).toHaveFocus();

    const focusTarget = document.querySelector("[data-focus-visible='true']");

    expect(focusTarget).not.toBeNull();
  });

  describe("range slider", () => {
    it("renders two thumbs with independent accessible names", () => {
      renderRangeSlider();

      const thumbs = screen.getAllByRole("slider");

      expect(thumbs).toHaveLength(2);
      expect(thumbs[0]).toHaveValue("100");
      expect(thumbs[1]).toHaveValue("500");
    });

    it("supports moving the focused thumb via arrow keys", async () => {
      const onChange = vi.fn();

      renderRangeSlider({onChange});
      const thumbs = screen.getAllByRole("slider");

      await act(async () => {
        thumbs[0]!.focus();
      });
      await user.keyboard("{ArrowRight}");

      expect(onChange).toHaveBeenLastCalledWith([150, 500]);
      expect(thumbs[0]).toHaveValue("150");
      expect(thumbs[1]).toHaveValue("500");

      await act(async () => {
        thumbs[1]!.focus();
      });
      await user.keyboard("{ArrowLeft}");
      expect(onChange).toHaveBeenLastCalledWith([150, 450]);
    });

    it("exposes track fill-start and fill-end data attributes", () => {
      renderRangeSlider();

      const track = document.querySelector('[data-slot="slider-track"]');

      expect(track).not.toHaveAttribute("data-fill-start", "true");
      expect(track).not.toHaveAttribute("data-fill-end", "true");
    });
  });

  describe("steps and marks", () => {
    const indicators = (slot: "step" | "mark") =>
      Array.from(document.querySelectorAll(`[data-slot="slider-${slot}"]`));
    const filledValues = (slot: "step" | "mark") =>
      indicators(slot)
        .filter((element) => element.getAttribute("data-filled") === "true")
        .map((element) => Number(element.getAttribute("data-value")));

    it("renders decorative step dots without adding tab stops", async () => {
      render(<SliderIndicatorsFixture />);

      expect(indicators("step").map((element) => element.getAttribute("data-value"))).toEqual([
        "0",
        "25",
        "50",
        "75",
        "100",
      ]);
      expect(document.querySelector('[data-slot="slider-steps"]')).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(screen.getAllByRole("slider")).toHaveLength(1);
      await user.tab();
      expect(screen.getByRole("slider")).toHaveFocus();
      await user.tab();
      expect(document.body).toHaveFocus();
    });

    it.each([
      {expected: [-0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3], maxValue: 0.3, minValue: -0.3, step: 0.1},
      {expected: [10, 13, 16, 19], maxValue: 21, minValue: 10, step: 3},
      {expected: [0, 1e-7, 2e-7, 3e-7], maxValue: 3e-7, minValue: 0, step: 1e-7},
      {expected: [5], maxValue: 10, minValue: 5, step: 20},
      {expected: [5], maxValue: 5, minValue: 5, step: 1},
    ])("renders steps from $minValue to $maxValue by $step", ({expected, ...props}) => {
      render(<SliderIndicatorsFixture defaultValue={props.minValue} marks={[]} {...props} />);

      expect(
        indicators("step").map((element) => Number(element.getAttribute("data-value"))),
      ).toEqual(expected);
    });

    it("renders no automatic dots for excessively dense steps", () => {
      render(<SliderIndicatorsFixture maxValue={100} step={0.001} />);

      expect(indicators("step")).toHaveLength(0);
      expect(screen.getByRole("slider")).toBeInTheDocument();
    });

    it("supports keyboard updates to the filled step and mark states", async () => {
      const onChange = vi.fn();
      const onChangeEnd = vi.fn();

      render(<SliderIndicatorsFixture onChange={onChange} onChangeEnd={onChangeEnd} />);
      expect(filledValues("step")).toEqual([0, 25, 50]);
      expect(filledValues("mark")).toEqual([0, 25, 50]);
      await user.tab();
      await user.keyboard("{ArrowRight}");
      expect(onChange).toHaveBeenLastCalledWith(75);
      expect(onChangeEnd).toHaveBeenLastCalledWith(75);
      expect(filledValues("step")).toEqual([0, 25, 50, 75]);
      expect(filledValues("mark")).toEqual([0, 25, 50, 75]);
    });

    it("supports controlled range updates and recomputes dots when the step changes", () => {
      const {rerender} = render(<SliderIndicatorsFixture value={[25, 75]} />);

      expect(filledValues("step")).toEqual([25, 50, 75]);
      expect(filledValues("mark")).toEqual([25, 50, 75]);
      rerender(<SliderIndicatorsFixture step={50} value={[50, 100]} />);
      expect(indicators("step")).toHaveLength(3);
      expect(filledValues("step")).toEqual([50, 100]);
      expect(filledValues("mark")).toEqual([50, 75, 100]);
      rerender(
        <SliderIndicatorsFixture maxValue={50} minValue={-50} step={25} value={[-25, 25]} />,
      );
      expect(
        indicators("step").map((element) => Number(element.getAttribute("data-value"))),
      ).toEqual([-50, -25, 0, 25, 50]);
      expect(filledValues("step")).toEqual([-25, 0, 25]);
    });

    it("renders custom labels and locale-formatted defaults without changing the thumb name", () => {
      render(
        <Slider defaultValue={50} formatOptions={{currency: "USD", style: "currency"}}>
          <Label>Budget</Label>
          <Slider.Track>
            <Slider.Thumb />
          </Slider.Track>
          <Slider.Marks>
            <Slider.Mark value={0}>Free</Slider.Mark>
            <Slider.Mark value={25} />
            <Slider.Mark value={100}>
              <strong>Maximum</strong>
            </Slider.Mark>
          </Slider.Marks>
        </Slider>,
      );

      expect(screen.getByText("Free")).toHaveAttribute("data-value", "0");
      expect(screen.getByText("$25.00")).toHaveAttribute("data-value", "25");
      expect(screen.getByText("Maximum")).toBeInTheDocument();
      expect(screen.getByRole("slider", {name: "Budget"})).toHaveValue("50");
    });

    it("renders only finite marks within bounds without snapping arbitrary mark values", () => {
      render(<SliderIndicatorsFixture marks={[-1, 0, 33, 100, 101, NaN, Infinity]} />);

      expect(
        indicators("mark").map((element) => Number(element.getAttribute("data-value"))),
      ).toEqual([0, 33, 100]);
    });

    it("exposes disabled state and preserves values during keyboard interaction", async () => {
      const onChange = vi.fn();

      render(<SliderIndicatorsFixture isDisabled onChange={onChange} />);
      for (const element of [...indicators("step"), ...indicators("mark")]) {
        expect(element).toHaveAttribute("data-disabled", "true");
      }
      await user.tab();
      await user.keyboard("{ArrowRight}");
      expect(onChange).not.toHaveBeenCalled();
      expect(filledValues("step")).toEqual([0, 25, 50]);
    });

    it("supports refs, DOM props, classes, and custom mark rendering", () => {
      const stepsRef = createRef<HTMLDivElement>();
      const marksRef = createRef<HTMLDivElement>();
      const markRef = createRef<HTMLDivElement>();

      render(
        <Slider aria-label="Volume" defaultValue={50} step={25}>
          <Slider.Track>
            <Slider.Steps ref={stepsRef} className="custom-steps" data-testid="steps" />
            <Slider.Thumb />
          </Slider.Track>
          <Slider.Marks ref={marksRef} className="custom-marks" data-testid="marks">
            <Slider.Mark
              ref={markRef}
              className="custom-mark"
              data-testid="mark"
              render={(props) => <div {...props} data-custom="true" />}
              style={{opacity: 0.5}}
              value={25}
            >
              Quiet
            </Slider.Mark>
          </Slider.Marks>
        </Slider>,
      );

      expect(stepsRef.current).toBe(screen.getByTestId("steps"));
      expect(stepsRef.current).toHaveClass("slider__steps", "custom-steps");
      expect(marksRef.current).toBe(screen.getByTestId("marks"));
      expect(marksRef.current).toHaveClass("slider__marks", "custom-marks");
      expect(markRef.current).toBe(screen.getByTestId("mark"));
      expect(markRef.current).toHaveClass("slider__mark", "custom-mark");
      expect(markRef.current).toHaveAttribute("data-custom", "true");
      expect(markRef.current).toHaveStyle({opacity: "0.5"});
    });
  });
});
