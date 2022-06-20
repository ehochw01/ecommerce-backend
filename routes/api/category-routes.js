const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// GET /api/categories
router.get('/', async (req, res) => {
  // find all categories
  try {
    const catogoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model:Product }]
    });
    res.status(200).json(catogoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /api/categories/:id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model:Product }]
    });

    if(!categoryData) {
      res.status(404).json({ message: "No category with this ID"});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// POST /api/categories/
router.post('/', async (req, res) => {
  // create a new category
  try {
    const catogoryData = await Category.create(req.body);
    res.status(200).json(catogoryData);
  } catch (err) {
      res.status(500).json(err);
      console.log(err);
  }
});
// PUT /api/categories/:id
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const catogoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!catogoryData[0]) {
      res.status(404).json({ message: 'No Category with this id!'});
      return;
    }
    res.status(200).json(catogoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// DELETE /api/categories/:id
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catogoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!catogoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(catogoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
