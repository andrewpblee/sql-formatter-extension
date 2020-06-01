const _pipe = (f, g) => (...args) => g(f(...args));
const pipe = (...fns) => fns.reduce(_pipe);

const keywords = /(\n|\t)?select|from|group|having|where|left|right|inner|outer|join|limit|case|else|end/;

const newLineForKeyword = (query) => {
  const queryList = query.split(" ");
  const newLined = queryList.map((x) => (keywords.test(x) ? "\n" + x : x));
  return newLined.join(" ");
};

const newLineForColumnName = (query) => {
  const queryList = query.split(" ");
  const newColumnNames = queryList.map((x) =>
    x.substr(-1) === "," ? "\n" + x : x
  );
  return newColumnNames.join(" ");
};

const newLineForLastColumnName = (query) => {
  const queryList = query.split(" ");
  const indexOfFrom = queryList
    .map((x, i) => (/from|\\nfrom/.test(x) ? i - 1 : null))
    .filter((x) => x);
  return queryList
    .map((x, i) =>
      indexOfFrom.includes(i) && !keywords.test(x) ? "\n" + x : x
    )
    .join(" ");
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
