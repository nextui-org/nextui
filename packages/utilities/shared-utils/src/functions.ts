type Args<T extends Function> = T extends (...args: infer R) => any ? R : never;

type AnyFunction<T = any> = (...args: T[]) => any;

type Extractable =
  | {
      [key: string]: any;
    }
  | undefined;

/**
 * Capitalizes the first letter of a string
 * @param {string} text
 * @returns {string}
 */
export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export function callAllHandlers<T extends (event: any) => void>(...fns: (T | undefined)[]) {
  return function func(event: Args<T>[0]) {
    fns.some((fn) => {
      fn?.(event);

      return event?.defaultPrevented;
    });
  };
}

export function callAll<T extends AnyFunction>(...fns: (T | undefined)[]) {
  return function mergedFn(arg: Args<T>[0]) {
    fns.forEach((fn) => {
      fn?.(arg);
    });
  };
}

export function extractProperty<K extends keyof Extractable, D extends keyof Extractable>(
  key: K | string,
  defaultValue: D | string | boolean,
  ...objs: Extractable[]
) {
  let result = defaultValue;

  for (const obj of objs) {
    if (obj && key in obj && !!obj[key]) {
      result = obj[key];
    }
  }

  return result as Extractable[K] | D | string | boolean;
}

export function getUniqueID(prefix: string) {
  return `${prefix}-${Math.floor(Math.random() * 1000000)}`;
}

/**
 * This function removes all event handlers from an object.
 */
export function removeEvents(input: {[key: string]: any}) {
  for (const key in input) {
    if (key.startsWith("on")) {
      delete input[key];
    }
  }

  return input;
}
