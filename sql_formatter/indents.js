const _pipe = (f, g) => (...args) => g(f(...args));
const pipe = (...fns) => fns.reduce(_pipe);

const indentWhen = (query) => {
  const queryListed = query.split(" ");
  return queryListed.map((x) => (/when/g.test(x) ? "\n\t" + x : x)).join(" ");
};

const indentNewLineSubQuery = (query) => {
  const queryListed = query.split(" ");
  return queryListed
    .map((x) => (/\(select/g.test(x) ? "\n\t" + x : x))
    .join(" ");
};

const indentCombined = pipe(indentWhen, indentNewLineSubQuery);

module.exports = { indentWhen, indentNewLineSubQuery, indentCombined };

console.log(indentNewLineSubQuery("select * from (select * from table)"));
