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

export function debounce<F extends (...args: any[]) => void>(
  func: F,
  waitMilliseconds: number = 0,
) {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const later = () => {
      timeout = undefined;
      func.apply(this, args);
    };

    if (timeout !== undefined) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, waitMilliseconds);
  };
}

export function uniqBy<T>(arr: T[], iteratee: any) {
  if (typeof iteratee === "string") {
    iteratee = (item: T) => item[iteratee as keyof T];
  }

  return arr.filter((x, i, self) => i === self.findIndex((y) => iteratee(x) === iteratee(y)));
}

export const omit = <Obj, Keys extends keyof Obj>(obj: Obj, keys: Keys[]): Omit<Obj, Keys> => {
  const res = Object.assign({}, obj);

  keys.forEach((key) => {
    delete res[key];
  });

  return res;
};

export const kebabCase = (s: string) => {
  return s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export const mapKeys = (
  obj: Record<string, any>,
  iteratee: (value: any, key: string) => any,
): Record<string, any> => {
  const res: Record<string, any> = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = iteratee(obj[key], key);

      res[newKey] = obj[key];
    }
  }

  return res;
};
