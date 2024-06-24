type Args<T extends Function> = T extends (...args: infer R) => any ? R : never;

type AnyFunction<T = any> = (...args: T[]) => any;

type Extractable =
  | {
      [key: string]: any;
    }
  | undefined;

/**
 * Capitalizes the first letter of a string
 * @param {string} s
 * @returns {string}
 */
export const capitalize = (s: string) => {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
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

export function objectToDeps(obj: Extractable) {
  if (!obj || typeof obj !== "object") {
    return "";
  }

  try {
    return JSON.stringify(obj);
  } catch (e) {
    return "";
  }
}

export function isEmpty(obj: Extractable) {
  return (
    [Object, Array].includes(((obj || {}) as any).constructor) && !Object.entries(obj || {}).length
  );
}

export function clamp(number: number, boundOne: number, boundTwo: number) {
  if (!boundTwo) {
    return Math.max(number, boundOne) === boundOne ? number : boundOne;
  } else if (Math.min(number, boundOne) === number) {
    return boundOne;
  } else if (Math.max(number, boundTwo) === number) {
    return boundTwo;
  }

  return number;
}

export function debounce<F extends (...args: any[]) => void>(
  func: F,
  waitMilliseconds: number = 0,
) {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;

    const later = () => {
      timeout = undefined;
      func.apply(context, args);
    };

    if (timeout !== undefined) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, waitMilliseconds);
  };
}
