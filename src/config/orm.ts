const path = require('path');

const config = {
  type: 'sqlite',
  database: 'data/database.db',
  logging: true,
  entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
  migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')]
};

module.exports = config;
