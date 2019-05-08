const { User, Appointment } = require('../models')
const moment = require('moment')

class DashboardController {
  async index (req, res) {
    //* If a user is not a provider
    if (req.session.user.provider == false) {
      const providers = await User.findAll({ where: { provider: true } })
      return res.render('dashboard', { providers })
    }

    //* If a user is a provider
    const providerId = req.session.user.id

    const appointmentsTable = await Appointment.findAll({
      where: { provider_id: providerId }
    })

    for (const apt of appointmentsTable) {
      apt['dateFormated'] = moment(apt.date).format('MMMM Do YYYY, hh:mm a')
      apt['dateRelative'] = moment(apt.date).fromNow()
    }

    var appointmentsClients = []
    for (const ap of appointmentsTable) {
      const user = await User.findOne({ where: { id: ap.user_id } })
      appointmentsClients.push({ ap, user })
    }

    console.log(appointmentsClients[0].ap)
    return res.render('providers/dashboard', { appointmentsClients })
  }
}

module.exports = new DashboardController()
