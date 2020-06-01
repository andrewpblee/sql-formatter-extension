const assert = require("assert");
const newLine = require("../sql_formatter/newLine.js");
const indent = require("../sql_formatter/indents.js");
const combined = require("../sql_formatter/index");
const clean = require("../sql_formatter/cleanQuery");

describe("Test Query Cleaning", function () {
  it("should remove all formatting characters", function () {
    assert.equal(
      clean.removeFormattingChars("select \n\t* from \ttable"),
      "select * from table"
    );
  });
});

describe("Test Query Validation", function () {
  it('should ensure the query contains "select"', function () {
    assert.equal(clean.queryContainsSelect("select * from table"), true);
  });
  it("query should be an array", function () {
    assert.deepEqual(clean.cleanQuery("select * from table"), [
      "select",
      "*",
      "from",
      "table",
    ]);
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

describe("Test subqueries and inner keywords are indented", function () {
  it("when statements in a case when should be indented", function () {
    assert.equal(
      indent.indentWhen("select case when column then column end as column"),
      "select case \n\twhen column then column end as column"
    );
  });
  it("should indent and new line when statements", function () {
    assert.equal(
      combined.formattedSQLQuery(
        "select case when date = '2020-01-01' then date else null end from table"
      ),
      "\nselect \ncase \n\twhen date = '2020-01-01' then date \nelse null \nend \nfrom table"
    );
  });
});
