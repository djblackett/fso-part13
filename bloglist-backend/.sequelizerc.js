// .sequelizerc

const path = require('path');

module.exports = {
  // 'config': path.resolve('config', 'database.json'),
  'models-path': path.resolve('./', 'models-sql'),
  // 'seeders-path': path.resolve('db', 'seeders'),
  // 'migrations-path': path.resolve('db', 'migrations')
};