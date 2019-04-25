const { User, Appointment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    const date = moment(new Date())
    console.log(date)
    const providers = await User.findAll({ where: { provider: true } })

    if (req.session.user.provider === true) {
      const appointments = await Appointment.findAll({
        where: {
          provider_id: req.session.user.id,
          date: {
            [Op.gte]: date.startOf('day').format()
          }
        },
        include: [{ model: User, as: 'user' }]
      })
      return res.render('dashboard', { appointments })
    }

    return res.render('dashboard', { providers })
  }
}

module.exports = new DashboardController()
