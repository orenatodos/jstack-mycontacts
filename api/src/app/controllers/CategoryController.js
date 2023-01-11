const CategoriesRepository = require('../repositories/CategoriesRepository')

class CategoryController {
  async index (req, res) {
    const { orderBy } = req.query

    const categories = await CategoriesRepository.findAll(orderBy)

    return res.json(categories)
  }

  async show (req, res) {
    const { id } = req.params

    const category = await CategoriesRepository.findById(id)

    if (!category) {
      return res.status(404).json({
        error: 'Category not found'
      })
    }

    return res.json(category)
  }

  async store (req, res) {
    const { name } = req.body

    if (!name.trim()) {
      return res.status(400).json({
        error: 'Name is required'
      })
    }

    const category = await CategoriesRepository.create({
      name
    })

    return res.status(201).json(category)
  }

  async update (req, res) {
    const { id } = req.params
    const { name } = req.body

    const category = await CategoriesRepository.findById(id)

    if (!category) {
      return res.status(404).json({
        error: 'Category not found'
      })
    }

    if (!name.trim()) {
      return res.status(400).json({
        error: 'Name is required'
      })
    }

    const updatedCategory = await CategoriesRepository.update(id, {
      name
    })

    return res.json(updatedCategory)
  }

  async delete (req, res) {
    const { id } = req.params

    await CategoriesRepository.delete(id)

    return res.sendStatus(204)
  }
}

module.exports = new CategoryController()
