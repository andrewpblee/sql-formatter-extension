const newLine = require("../sql_formatter/newLine.js");
const clean = require("../sql_formatter/cleanQuery.js");
const indent = require("../sql_formatter/indents.js");
const exampleQuery = require("../sql_formatter/exampleSQL");

const _pipe = (f, g) => (...args) => g(f(...args));
const pipe = (...fns) => fns.reduce(_pipe);

const formattedSQLQuery = (query) => {
  if (clean.cleanQuery) {
    queryFormatted = pipe(
      clean.cleanQuery,
      indent.indentWhen,
      indent.indentNewLineSubQuery,
      newLine.newLineForKeyword,
      newLine.newLineForColumnName,
      newLine.newLineForLastColumnName
    );
    return queryFormatted(query).join(" ");
  }
};

module.exports = { formattedSQLQuery };

console.log(
  formattedSQLQuery(
    "select case when date = '2020-01-01' then date else null end from table"
  )
);
