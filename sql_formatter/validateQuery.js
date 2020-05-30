const queryContainsSelect = (query) => {
  return query.includes("select");
};

module.exports = { queryContainsSelect };
