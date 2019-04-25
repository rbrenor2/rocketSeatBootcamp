const mongoose = require('mongoose')

const Product = mongoose.model('Product')

module.exports = {
  async index(req, res) {
    // const products = await Product.find() // it can have parameters like {where: }
    const { page = 1 } = req.query // if req.query is null, page = 1
    const products = await Product.paginate({}, { page, limit: 10 }) // it can have parameters like {where: } in the first object

    return res.json(products)
  },

  async show(req, res) {
    const product = await Product.findById(req.params.id)

    return res.json(product)
  },

  async store(req, res) {
    const product = await Product.create(req.body)
    
    return res.json(product)
  },

  async update(req, res) {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }) // new:true means that mongoose should return to the variable the object updated, and not the old one

    return res.json(product)
  },

  async destroy(req, res) {
    await Product.findByIdAndRemove(req.params.id)

    return res.send()
  }
}