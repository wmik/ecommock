var path = require('path');
var supertest = require('supertest');
var test = require('tape');
var app = require('./app');
var config = require('./config.test.json');
var data = require(path.resolve(config.data.filePath));

var request = supertest(app);

function randomResourceKey() {
  var keys, random;
  keys = Object.keys(data);
  random = Math.floor(Math.random() * keys.length);
  return keys[random];
}

test('random resource', function(t) {
  t.ok(randomResourceKey() in data);
  t.end();
});

test('undefined endpoints test', async function(t) {
  var response = await request.get('/api/unknown');
  t.ok(response.notFound);
  t.end();
});

test('get resource endpoints test', async function(t) {
  var response = await request.get('/api/' + randomResourceKey());
  t.ok(response.ok);
  t.equal(response.body.page, 1);
  t.equal(response.body.per_page, 3);
  t.end();
});

test('post resource endpoints test', async function(t) {
  var response = await request.post('/api/' + randomResourceKey());
  t.equal(response.status, 201);
  t.equal(new Date(response.body.created).getDate(), new Date().getDate());
  t.end();
});

test('put resource endpoints test', async function(t) {
  var response = await request.put('/api/' + randomResourceKey() + '/1');
  t.equal(response.status, 201);
  t.equal(new Date(response.body.updated).getDate(), new Date().getDate());
  t.end();
});

test('patch resource endpoints test', async function(t) {
  var response = await request.patch('/api/' + randomResourceKey() + '/1');
  t.ok(response.ok);
  t.equal(new Date(response.body.updated).getDate(), new Date().getDate());
  t.end();
});

test('delete resource endpoints test', async function(t) {
  var response = await request.delete('/api/' + randomResourceKey() + '/1');
  t.ok(response.noContent);
  t.end();
});
