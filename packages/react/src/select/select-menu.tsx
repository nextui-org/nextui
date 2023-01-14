import React, {useRef} from "react";
import {useListBox} from "react-aria";

const SelectMenu = (props: any) => {
  let ref = useRef();
  const {listBoxRef = ref, state} = props;
  let {listBoxProps} = useListBox(props, state, listBoxRef);

  return (
    <ul {...listBoxProps} ref={listBoxRef}>
      {[...state.collection].map((item) => {
        return <li key={item.key}>{item.rendered}</li>;
      })}
    </ul>
  );
};

export default SelectMenu;
