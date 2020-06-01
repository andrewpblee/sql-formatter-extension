const newLine = require("../sql_formatter/newLine.js");
const clean = require("../sql_formatter/cleanQuery.js");
const indent = require("../sql_formatter/indents.js");

const _pipe = (f, g) => (...args) => g(f(...args));
const pipe = (...fns) => fns.reduce(_pipe);

const formattedSQLQuery = (query) => {
  if (clean.queryContainsSelect) {
    queryFormatted = pipe(indent.indentCombined, newLine.newLines);
    return queryFormatted(query);
  }
};

module.exports = { formattedSQLQuery };
