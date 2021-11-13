export const isObject = (target: unknown) =>
  target && typeof target === 'object';

export interface MergeObject {
  [key: string]: any;
}

export const deepMergeObject = <T extends MergeObject>(
  source: T,
  target: T
): T => {
  if (!isObject(target) || !isObject(source)) return source;

  const sourceKeys = Object.keys(source) as Array<keyof T>;
  let result = {} as T;
  for (const key of sourceKeys) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
      result[key] = targetValue.concat(sourceValue);
    } else if (isObject(sourceValue) && isObject(targetValue)) {
      result[key] = deepMergeObject(sourceValue, { ...targetValue });
    } else if (targetValue) {
      result[key] = targetValue;
    } else {
      result[key] = sourceValue;
    }
  }
  return result;
};

export const renameProp = (
  oldProp: string,
  newProp: string,
  { [oldProp]: old, ...others }
) => ({
  [newProp]: old,
  ...others
});
