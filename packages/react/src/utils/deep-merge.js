export default function deepMerge(result) {
  var stack = Array.prototype.slice.call(arguments, 1);
  var item;
  var key;
  while (stack.length) {
    item = stack.shift();
    for (key in item) {
      // eslint-disable-next-line no-prototype-builtins
      if (item.hasOwnProperty(key)) {
        if (
          typeof result[key] === 'object' &&
          result[key] &&
          Object.prototype.toString.call(result[key]) !== '[object Array]'
        ) {
          if (typeof item[key] === 'object' && item[key] !== null) {
            result[key] = deepMerge({}, result[key], item[key]);
          } else {
            result[key] = item[key];
          }
        } else {
          result[key] = item[key];
        }
      }
    }
  }
  return result;
}
