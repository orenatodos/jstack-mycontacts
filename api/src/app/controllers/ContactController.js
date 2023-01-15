const ContactsRepository = require('../repositories/ContactsRepository')
const isValidUUID = require('../utils/isValidUUID')

class ContactController {
  async index (req, res) {
    const { orderBy } = req.query

    const contacts = await ContactsRepository.findAll(orderBy)

    return res.json(contacts)
  }

  async show (req, res) {
    const { id } = req.params

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid contact id' })
    }

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

    if (category_id && !isValidUUID(category_id)) {
      return res.status(400).json({ error: 'Invalid category' })
    }

    if (email) {
      const contactExists = await ContactsRepository.findByEmail(email)

      if (contactExists) {
        return res.status(400).json({
          error: 'This e-mail is already exists'
        })
      }
    }

    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null
    })

    return res.status(201).json(contact)
  }

  async update (req, res) {
    const { id } = req.params
    const { name, email, phone, category_id } = req.body

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid contact id' })
    }

    if (category_id && !isValidUUID(category_id)) {
      return res.status(400).json({ error: 'Invalid category' })
    }

    if (!name.trim()) {
      return res.status(400).json({
        error: 'Name is required'
      })
    }

    const contact = await ContactsRepository.findById(id)

    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found'
      })
    }

    if (email) {
      const contactExists = await ContactsRepository.findByEmail(email)

      if (contactExists && contactExists.id !== id) {
        return res.status(400).json({
          error: 'This e-mail is already exists'
        })
      }
    }

    const updatedContact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null
    })

    return res.json(updatedContact)
  }

  async delete (req, res) {
    const { id } = req.params

    if (!isValidUUID(id)) {
      return res.status(400).json({ error: 'Invalid contact id' })
    }

    await ContactsRepository.delete(id)

    return res.sendStatus(204)
  }
}

module.exports = new ContactController()
