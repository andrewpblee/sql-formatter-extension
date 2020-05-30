const assert = require("assert");
const newLine = require("../sql_formatter/newLine.js");
const validate = require("../sql_formatter/validateQuery.js");

describe("Test Query Validation", function () {
  it('should ensure the query contains "select"', function () {
    assert.equal(validate.queryContainsSelect("select * from table"), true);
  });
});

describe("Test Keywords and Columns are on new lines", function () {
  it("keywords should have a preceding new line character", function () {
    assert.equal(
      newLine.newLineForKeyword(
        "select * from table where date = '2020-01-01' group by 1 limit 100 having count(*) > 1"
      ),
      "\nselect * \nfrom table \nwhere date = '2020-01-01' \ngroup by 1 \nlimit 100 \nhaving count(*) > 1"
    );
  });
  it("column names with trailing comma should have a preceding newline character", function () {
    assert.equal(
      newLine.newLineForColumnName("select date, sessions, users from table"),
      "select \ndate, \nsessions, users from table"
    );
  });
  it("The last column name without a comma should be on a new line", function () {
    assert.equal(
      newLine.newLineForLastColumnName("select column from table"),
      "select \ncolumn from table"
    );
  });
  it("all sql that needs a new line, should have a new line", function () {
    assert.equal(
      newLine.newLines(
        "select date, users, sessions from table where date = '2020-01-01'"
      ),
      "\nselect \ndate, \nusers, \nsessions \nfrom table \nwhere date = '2020-01-01'"
    );
  });
});
