const validate = require("./validateQuery");

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

const newLines = (query) => {
  const keywords = newLineForKeyword(query);
  const columnNames = newLineForColumnName(keywords);
  const lastColumnNames = newLineForLastColumnName(columnNames);
  return lastColumnNames;
};

module.exports = {
  newLineForKeyword,
  newLineForColumnName,
  newLineForLastColumnName,
  newLines,
};
