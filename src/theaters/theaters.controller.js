const theatersService = require("./theaters.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// list of all theaters
async function list(req, res, next) {
  const data = await theatersService.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
