const router = require('express').Router();
const authorize = require('../middleware/authorize');

const { user, todo } = require('../models');

// all todos and name
router.get('/', authorize, async (req, res) => {
  try {
    await user.findAll({ where: { id: req.user.id }, include: [{ model: todo }] })
      .then((user1) => {
        res.json(user1[0].todos);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// create a todo, using authorize middleware
router.post('/todos', authorize, async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await todo.create({ description, done: false, user_id: req.user.id });
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
router.put('/todos/:id', authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await todo.update({ description }, { where: { id, user_id: req.user.id } });

    if (updateTodo === 0) {
      return res.json('This todo is not yours');
    }

    res.json('Todo was updated');
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
router.delete('/todos/:id', authorize, async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTodo = await todo.destroy({ where: { id, user_id: req.user.id } });

    if (deleteTodo === 0) {
      return res.json('This todo is not yours');
    }

    res.json('Todo was deleted');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
