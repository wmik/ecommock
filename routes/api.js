var env = process.env.NODE_ENV || 'test';
var path = require('path');
var paige = require('../utils/pagination');
var shallow = require('../utils/shallow');
var config = require('../config.' + env + '.json');
var data = require(path.resolve(config.data.filePath));

function get(q, s, x) {
  var resource, args, items, response, opts;
  resource = q.params.resource;
  args = {
    id: q.params[0] || q.query.id || null
  };
  items = data[resource];
  if (!items) {
    response = { message: 'not found' };
    return s.status(404).json(response);
  }
  if (items && !args.id) {
    opts = shallow(config.api.pagination, {
      page: q.query.page,
      per_page: q.query.per_page
    });
    response = paige.multi(opts, data[resource]);
  } else if (items && args.id) {
    response = paige.single(data[resource]);
  }
  return s.status(response.data ? 200 : 404).json(response);
}

function post(q, s, x) {}

module.exports = {
  get,
  post
};
