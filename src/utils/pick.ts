/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
export default function pick(object: any, keys: any) {
  return keys.reduce((obj: any, key: any) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
}
