import {Checkbox, Radio, RadioGroup, Spinner, Switch} from "@heroui/react";
import React from "react";

export function UIComponentsDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-8">
      {/* Checkbox - Selected State */}
      <Checkbox defaultSelected aria-label="Checkbox Indicator Example">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
        </Checkbox.Content>
      </Checkbox>

      {/* Switch - On State */}
      <Switch defaultSelected aria-label="Switch On State Example">
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Content>
      </Switch>

      {/* Radio Buttons - Unselected and Selected */}
      <RadioGroup
        aria-label="Radio Buttons Example"
        className="gap-8"
        defaultValue="option2"
        name="demo"
        orientation="horizontal"
      >
        <Radio value="option1">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
          </Radio.Content>
        </Radio>
        <Radio value="option2">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      {/* Spinner */}
      <Spinner />
    </div>
  );
}
