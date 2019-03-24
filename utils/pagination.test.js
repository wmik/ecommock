var test = require('tape');
var paige = require('./pagination');
var data = Array.from({ length: 10 }, (_, id) => ({ id: ++id }));

test('multi pagination test', function(t) {
  var paginatedItems = paige.multi({}, data);

  t.equal(paginatedItems.page, 1);
  t.equal(paginatedItems.per_page, 3);
  t.equal(paginatedItems.data.length, paginatedItems.per_page);
  t.equal(paginatedItems.total, data.length);
  t.equal(
    paginatedItems.total_pages,
    Math.ceil(data.length / paginatedItems.per_page)
  );
  t.end();
});

test('single pagination test', function(t) {
  var item, args;
  args = { id: 2 };
  item = paige.single(data, args);

  t.equal(item.data.id, args.id);
  t.end();
});
