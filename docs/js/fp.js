export const identity = x => x;
export const curry = (fn) => (...args) =>
  args.length >= fn.length ? fn(...args) : (...rest) => curry(fn)(...args, ...rest);

export const map = curry((fn, xs) => xs.map(fn));
export const filter = curry((pred, xs) => xs.filter(pred));
export const reduce = curry((reducer, init, xs) => xs.reduce(reducer, init));
export const find = curry((pred, xs) => xs.find(pred));

export const prop = curry((k, o) => o?.[k]);
export const toLower = s => String(s).toLowerCase();
export const includes = curry((q, s) => String(s).includes(q));

export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

export const between = curry((min, max, n) => n >= min && n <= max);

export const by = curry((selector, dir = 'asc') => (a, b) => {
  const av = selector(a);
  const bv = selector(b);
  if (av < bv) return dir === 'asc' ? -1 : 1;
  if (av > bv) return dir === 'asc' ? 1 : -1;
  return 0;
});

export const sortBy = curry((cmp, xs) => xs.slice().sort(cmp));
