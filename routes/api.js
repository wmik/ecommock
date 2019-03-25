var env = process.env.NODE_ENV || 'test';
var paige = require('../utils/pagination');
var shallow = require('../utils/shallow');
var data = require('../data.json');
var config = require('../config.' + env + '.json');

function get(q, s, x) {
  var resource, args, items, response;
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
    response = paige.multi(
      shallow(config.api.pagination, {
        page: q.query.page,
        per_page: q.query.per_page
      }),
      data[resource]
    );
  } else if (items && args.id) {
    response = paige.single(data[resource]);
  }
  return s.json(response);
}

module.exports = {
  get
};
