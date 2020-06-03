const _pipe = (f, g) => (...args) => g(f(...args));
const pipe = (...fns) => fns.reduce(_pipe);

const keywords = /(\n|\t)?select|from|group|having|where|left|right|inner|outer|join|limit|case|else|end/;

const newLineForKeyword = (query) => {
  return (newLined = query.map((x) => (keywords.test(x) ? "\n" + x : x)));
};

const newLineForColumnName = (query) => {
  return query.map((x) => (x.substr(-1) === "," ? "\n" + x : x));
};

const newLineForLastColumnName = (query) => {
  const indexOfFrom = query
    .map((x, i) => (/from|\\nfrom/.test(x) ? i - 1 : null))
    .filter((x) => x);
  return query.map((x, i) =>
    indexOfFrom.includes(i) && !keywords.test(x) ? "\n" + x : x
  );
};

const newLines = pipe(
  newLineForKeyword,
  newLineForColumnName,
  newLineForLastColumnName
);

module.exports = {
  newLineForKeyword,
  newLineForColumnName,
  newLineForLastColumnName,
  newLines,
};
