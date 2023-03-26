"use client";

import type {HTMLNextUIProps} from "@nextui-org/system";
import type {DripInstance} from "./use-drip";

import {drip} from "@nextui-org/theme";

export interface DripProps extends HTMLNextUIProps<"span"> {
  drips?: DripInstance[];
}

const Drip = (props: DripProps) => {
  const {drips, ...otherProps} = props;

  const styles = drip();

  if (!drips || !Array.isArray(drips) || drips.length < 1) {
    return null;
  }

  return (
    <>
      {drips.map(({key, ...dripProps}) => (
        <span key={key} className={styles} {...otherProps} {...dripProps} />
      ))}
    </>
  );
};

Drip.displayName = "NextUI.Drip";

export default Drip;
