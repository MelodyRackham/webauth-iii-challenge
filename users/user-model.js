const db = require('../database/config');

module.exports = {
  find,
  findBy,
  add,
};

function find() {
  return db('users');
}

function findBy(property) {
  return db('users')
    .select('id', 'username', 'department')
    .where(property)
    .first();
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findBy({ id });
    });
}
