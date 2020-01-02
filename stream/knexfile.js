module.exports = {
  development: {
    debug: false,
    client: 'sqlite3',
    connection: {
      filename: '../server/dev.sqlite3'
    },
    migrations: {
      tableName: 'migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
