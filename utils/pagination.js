/**
 * @param {object} config
 * @param {(number|string)} [config.page]
 * @param {(number|string)} [config.per_page]
 * @param {(number|string)} [config.page_size]
 * @param {array} items
 */
function multi(config, items) {
  var page, pageSize, offset, data;
  page = parseInt(config.page, 10) || 1;
  pageSize = parseInt(config.per_page, 10) || config.page_size || 3;
  offset = (page - 1) * pageSize;
  data = items.slice(offset, offset + pageSize);
  return {
    page,
    data,
    per_page: pageSize,
    total: items.length,
    total_pages: Math.ceil(items.length / pageSize)
  };
}

/**
 * @param {array} items
 * @param {object} [args]
 */
function single(items, args) {
  var data;
  data = items.find(function predicate(item) {
    return item.id === args.id;
  });
  if (data) {
    return { data };
  }
  return { messsage: 'not found' };
}

module.exports = {
  multi,
  single
};
