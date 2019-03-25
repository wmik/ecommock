function shallow(target, source) {
  var key;
  for (key in source) {
    if (source[key] !== undefined) {
      target[key] = source[key];
    }
  }
  return target;
}

module.exports = shallow;
