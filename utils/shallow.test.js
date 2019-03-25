var test = require('tape');
var shallow = require('./shallow');

test('shallow util test', function(t) {
  var target = { a: 1, b: 2 };
  t.deepEqual(shallow(target, { a: undefined }), target);
  t.deepEqual(shallow(target, { a: null }), Object.assign(target, { a: null }));
  t.end();
});
