const prisma = require("../config/db");

// Get all todos (with user info)
exports.getTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      include: { user: true }, // associated user bhi milega
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single todo by ID
exports.getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: parseInt(id) },
      include: { user: true },
    });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new todo
exports.createTodo = async (req, res) => {
  const { title, description, todotype, priority, dueDate, userId } = req.body;
  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        todotype,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId,
      },
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, todotype, priority, dueDate, completed } = req.body;
  try {
    const todo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        todotype,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        completed,
      },
    });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
