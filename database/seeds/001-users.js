const bcrypt = require('bcryptjs');
exports.seed = function(knex) {
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        {
          username: 'melbell94',
          password: bcrypt.hashSync('melody', 12),
          department: 'Marketing ',
        },
        {
          username: 'Joshua24',
          password: bcrypt.hashSync('joshua', 12),
          department: 'sales',
        },
      ]);
    });
};
