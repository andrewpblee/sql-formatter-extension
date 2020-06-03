const _pipe = (f, g) => (...args) => g(f(...args));
const pipe = (...fns) => fns.reduce(_pipe);

const indentWhen = (query) => {
  return query.map((x) => (/when/g.test(x) ? "\n\t" + x : x));
};

const indentNewLineSubQuery = (query) => {
  return query.map((x) => (/\(select/g.test(x) ? "\n\t" + x : x));
};

module.exports = { indentWhen, indentNewLineSubQuery };

console.log(
  indentNewLineSubQuery([
    "select",
    "*",
    "from",
    "(select",
    "*",
    "from",
    "table)",
  ])
);
