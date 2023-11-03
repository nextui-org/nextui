import {PressEvent as IPressEvent, PointerType} from "@react-types/shared";

import {EventBase} from "./types";

export class PressEvent implements IPressEvent {
  type: IPressEvent["type"];
  pointerType: PointerType;
  target: Element;
  shiftKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  #shouldStopPropagation = true;

  constructor(type: IPressEvent["type"], pointerType: PointerType, originalEvent: EventBase) {
    this.type = type;
    this.pointerType = pointerType;
    this.target = originalEvent.currentTarget as Element;
    this.shiftKey = originalEvent.shiftKey;
    this.metaKey = originalEvent.metaKey;
    this.ctrlKey = originalEvent.ctrlKey;
    this.altKey = originalEvent.altKey;
  }

  continuePropagation() {
    this.#shouldStopPropagation = false;
  }

  get shouldStopPropagation() {
    return this.#shouldStopPropagation;
  }
}
