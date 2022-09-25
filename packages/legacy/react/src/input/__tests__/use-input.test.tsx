import React, {useEffect} from "react";
import {mount} from "enzyme";

import {Input} from "../../index";
import useInput from "../../use-input";

describe("UseInput", () => {
  it("should follow change with use-input", () => {
    const MockInput: React.FC<{value?: string; resetValue?: boolean}> = ({value, resetValue}) => {
      const {reset, setValue, bindings} = useInput("");

      useEffect(() => {
        if (value) setValue(value);
      }, [value]);
      useEffect(() => {
        if (resetValue) reset();
      }, [resetValue]);

      return <Input {...bindings} />;
    };

    const wrapper = mount(<MockInput />);

    wrapper.setProps({value: "test"});
    let input = wrapper.find("input").at(0).getDOMNode() as HTMLInputElement;

    expect(input.value).toEqual("test");

    wrapper.setProps({resetValue: true});
    input = wrapper.find("input").at(0).getDOMNode() as HTMLInputElement;
    expect(input.value).toEqual("");
  });
});
