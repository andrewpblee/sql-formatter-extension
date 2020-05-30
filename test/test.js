const assert = require("assert");
var expect = require("chai").expect;
const sqlQuery = require("../sql_formatter/exampleSQL");
const SQL = require("../sql_formatter/index");

// describe("Keywords in queries", function () {
//   it("should contain select in the query", function () {
//     assert.ok(sqlQuery.includes("select"));
//   });
// });

describe("Test Query Validation", function () {
  it('should ensure the query contains "select"', function () {
    assert.equal(SQL.validateQuery("select * from table"), true);
  });
});

describe("Test keywords are on new lines", function () {
  it("keywords should have a preceding new line character", function () {
    assert.equal(
      SQL.newLineForKeyword(
        "select * from table where date = '2020-01-01' group by 1 limit 100 having count(*) > 1"
      ),
      "\nselect * \nfrom table \nwhere date = '2020-01-01' \ngroup by 1 \nlimit 100 \nhaving count(*) > 1"
    );
  });
});
describe("Test Column names are on new lines", function () {
  it("column names should have a trailing newline character after comma", function () {
    assert.equal(
      SQL.newLineForColumnName("select date, sessions, users from table"),
      "select \ndate, \nsessions, users from table"
    );
  });
  it("The last column name without a comma should be on a new line", function () {
    assert.equal(
      SQL.newLineForLastColumnName("select column from table"),
      "select \ncolumn from table"
    );
  });
});
// describe("Tests for new line after columns", function () {
//   it("column names should be on a new line", function () {
//     const testExample = SQL.newLineForKeyword(sqlQuery).split(" ");
//     const commaColumns = testExample.filter((x) => /\,/.test(x));
//     expect([...new Set(commaColumns.map((x) => x.endsWith("\n")))]).to.eql([
//       true,
//     ]);
//   });
// });
