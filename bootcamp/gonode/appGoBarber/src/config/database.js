module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'goBarber',
  operatorAliases: false,
  define: {
    timestamps: true, // add columns created_at and updated_at
    underscored: true, // no camelcase pattern
    underscoredAll: true // use underscore pattern not only on the table but with the column names
  }
}
