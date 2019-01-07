/* eslint-disable no-unused-expressions */
/* eslint-disable func-names */
export const debounce = (fn, delay) => {
  let timer = null;
  return function (...args) {
    const context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
