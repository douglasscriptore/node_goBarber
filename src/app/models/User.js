const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL, // Campo que só existe no Model
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  // não estou usando arrowfunction pois como estou criando uma nova função dentro da instancia
  // do objeto no sequelize preciso receber por padrão o scopo do this que é a instancia do usuario
  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  return User
}
