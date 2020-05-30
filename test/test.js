const assert = require("assert");
var expect = require("chai").expect;
const sqlQuery = require("../sql_formatter/exampleSQL");
const SQL = require("../sql_formatter/index");

describe("Keywords in queries", function () {
  it("should contain select in the query", function () {
    assert.ok(sqlQuery.includes("select"));
  });
});

describe("Tests for newLineForKeyword", function () {
  it("should return a string", function () {
    expect(SQL.newLineForKeyword(sqlQuery)).to.be.a("string");
  });
  it("all keywords should be on a newline", function () {
    const testExample = SQL.newLineForKeyword(sqlQuery).split(" ");
    const exampleList = testExample.filter((x) => SQL.keywordsRegex.test(x));
    const keywordsQuery = exampleList.map((x) => x.startsWith("\n"));
    const distinctKeywordArray = [...new Set(keywordsQuery)];
    expect(distinctKeywordArray).to.eql([true]);
  });
});
