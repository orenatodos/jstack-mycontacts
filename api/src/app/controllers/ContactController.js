const ContactsRepository = require('../repositories/ContactsRepository')

class ContactController {
  async index (req, res) {
    const { orderBy } = req.query

    const contacts = await ContactsRepository.findAll(orderBy)

    return res.json(contacts)
  }

  async show (req, res) {
    const { id } = req.params

    const contact = await ContactsRepository.findById(id)

    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found'
      })
    }

    return res.json(contact)
  }

  async store (req, res) {
    const { name, email, phone, category_id } = req.body

    if (!name.trim()) {
      return res.status(400).json({
        error: 'Name is required'
      })
    }

    const contactExists = await ContactsRepository.findByEmail(email)

    if (contactExists) {
      return res.status(400).json({
        error: 'This e-mail is already exists'
      })
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id
    })

    return res.status(201).json(contact)
  }

  async update (req, res) {
    const { id } = req.params
    const { name, email, phone, category_id } = req.body

    const contact = await ContactsRepository.findById(id)

    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found'
      })
    }

    if (!name.trim()) {
      return res.status(400).json({
        error: 'Name is required'
      })
    }

    const contactExists = await ContactsRepository.findByEmail(email)

    if (contactExists && contactExists.id !== id) {
      return res.status(400).json({
        error: 'This e-mail is already exists'
      })
    }

    const updatedContact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id
    })

    return res.json(updatedContact)
  }

  async delete (req, res) {
    const { id } = req.params

    await ContactsRepository.delete(id)

    return res.sendStatus(204)
  }
}

module.exports = new ContactController()
