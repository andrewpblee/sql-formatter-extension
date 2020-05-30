const sqlQuery = require("./exampleSQL");

const keywords = [
  "select",
  "from",
  "group",
  "having",
  "where",
  "left",
  "right",
  "inner",
  "outer",
  "join",
  "limit",
];

const newLineForKeyword = (query) => {
  const queryList = query.split(" ");
  const newLined = queryList.map((x) => (keywords.includes(x) ? "\n" + x : x));
  return newLined.join(" ");
};

const newLineForColumnName = (query) => {
  const queryList = query.split(" ");
  const newColumnNames = queryList.map((x) =>
    x.substr(-1) === "," ? "\n" + x : x
  );
  return newColumnNames.join(" ");
};

const validateQuery = (query) => {
  return query.includes("select");
};

const newLineForLastColumnName = (query) => {
  const queryList = query.split(" ");
  const indexOfFrom = queryList
    .map((x, i) => (x === "from" ? i - 1 : null))
    .filter((x) => x);
  return queryList
    .map((x, i) =>
      indexOfFrom.includes(i) && !keywords.includes(x) ? "\n" + x : x
    )
    .join(" ");
};

module.exports = {
  validateQuery,
  newLineForKeyword,
  newLineForColumnName,
  newLineForLastColumnName,
};

console.log(newLineForLastColumnName("select date from table"));
