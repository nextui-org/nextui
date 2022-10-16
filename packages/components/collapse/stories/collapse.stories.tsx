import React from "react";
import {Meta} from "@storybook/react";

import {Collapse} from "../src";

export default {
  title: "Surfaces/Collapse",
  component: Collapse,
} as Meta;

export const Default = () => (
  <Collapse selectionMode="single">
    <Collapse.Item key="1" title="Your files">
      file
    </Collapse.Item>
    <Collapse.Item key="2" title="Shared with you">
      shared
    </Collapse.Item>
    <Collapse.Item key="3" title="Last item">
      last
    </Collapse.Item>
    <Collapse.Item key="4" title="Four item">
      four
    </Collapse.Item>
  </Collapse>
);

export const Controlled = () => {
  const [expandedKeys, setExpandedKeys] = React.useState<Set<React.Key>>(new Set([]));

  return (
    <Collapse
      defaultExpandedKeys={["1"]}
      disabledKeys={["3"]}
      expandedKeys={expandedKeys}
      selectionMode="single"
      onExpandedChange={setExpandedKeys}
    >
      <Collapse.Item key="1" title="Your files">
        file
      </Collapse.Item>
      <Collapse.Item key="2" title="Shared with you">
        shared
      </Collapse.Item>
      <Collapse.Item key="3" title="Last item">
        last
      </Collapse.Item>
      <Collapse.Item key="4" title="Four item">
        four
      </Collapse.Item>
    </Collapse>
  );
};
