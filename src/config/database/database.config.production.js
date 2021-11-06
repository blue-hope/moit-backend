const SnakeNamingStrategy = require('typeorm-naming-strategies')
  .SnakeNamingStrategy;

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password:
    process.env.DB_PASSWORD ?? '55101f4fe07a8913f845268a5aa45f6f7adf5e2e',
  database: 'moit',
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};
