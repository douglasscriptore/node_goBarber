const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    'Appointment',
    {
      date: DataTypes.DATE,
      date_formated: DataTypes.VIRTUAL
    },
    {
      hooks: {
        afterFind: appointment => {
          if (appointment.constructor === Array) {
            appointment.map(ap => {
              ap.date_formated = moment(ap.date).format('D/M/Y HH:mm')
            })
          }
        }
      }
    }
  )

  Appointment.associate = models => {
    Appointment.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
    Appointment.belongsTo(models.User, {
      as: 'provider',
      foreignKey: 'provider_id'
    })
  }

  return Appointment
}
