module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'gobarber',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true, // ative o snakecase que é com _ e não com caixa alta,
    uderscoredAll: true // faz o mesmo só que no nome das tabelas tbm
  }
}
