const _pipe = (f, g) => (...args) => g(f(...args));
const pipe = (...fns) => fns.reduce(_pipe);

const indentWhen = (query) => {
  const queryListed = query.split(" ");
  return queryListed.map((x) => (/when/.test(x) ? "\n\t" + x : x)).join(" ");
};

const indentSubQuery = (query) => {};

const indentCombined = pipe(indentWhen);

module.exports = { indentWhen, indentCombined };
