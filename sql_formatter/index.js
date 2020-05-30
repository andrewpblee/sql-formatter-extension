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

const keywordsRegex = new RegExp("(" + keywords.join("|") + ")", "gi");

const newLineForKeyword = (query) => {
  const queryList = query.split(" ");
  const newLined = queryList.map((x) => (keywordsRegex.test(x) ? "\n" + x : x));
  return newLined.join(" ");
};
