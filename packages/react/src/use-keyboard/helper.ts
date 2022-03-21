import { getKeyValue } from '../utils/object';
import { isMac } from '../utils/collections';
import { KeyMod } from './codes';

/* istanbul ignore next */
export const getCtrlKeysByPlatform = (): Record<
  string,
  'metaKey' | 'ctrlKey'
> => {
  return {
    CtrlCmd: isMac() ? 'metaKey' : 'ctrlKey',
    WinCtrl: isMac() ? 'ctrlKey' : 'metaKey'
  };
};

export const getActiveModMap = (
  bindings: number[]
): Record<keyof typeof KeyMod, boolean> => {
  const modBindings = bindings.filter(
    (item: number) => !!getKeyValue(KeyMod, item)
  );
  const activeModMap: Record<keyof typeof KeyMod, boolean> = {
    CtrlCmd: false,
    Shift: false,
    Alt: false,
    WinCtrl: false
  };
  modBindings.forEach((code) => {
    const modKey = getKeyValue(KeyMod, code) as keyof typeof KeyMod;
    activeModMap[modKey] = true;
  });
  return activeModMap;
};
