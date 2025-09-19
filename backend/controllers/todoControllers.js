const sendEmail = require("../utils/email");
const prisma = require("../config/db");

exports.getTodos = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { search } = req.query;

    const searchFilter = search
      ? {
          OR: [
            { title: { 
              contains: search, mode: "insensitive" 
            } },
            { description: { 
              contains: search, mode: "insensitive" 
            } },
          ],
        }
      : {};

    const todos = await prisma.todo.findMany({
      where: { 
        userId, ...searchFilter 
      },
      include: { 
        user: true 
      },
      orderBy: { 
        createdAt: "desc" 
      },
    });

    res.json({ total: todos.length, todos });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({
      where: { 
        id: parseInt(id) 
      },
      include: { 
        user: true 
      },
    });

    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.json(todo);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createTodo = async (req, res) => {
  const { title, description, todotype, priority, dueDate, userId, userEmail } = req.body;
  try {
    if (!title || !title.trim() || !todotype) {
      return res.status(400).json({ error: "Title and type are required" });
    }
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

    // Best-effort email notification; do not block response
    if (userEmail) {
      try {
        await sendEmail(
          userEmail,
          "New Todo Created",
          `Your task "${title}" has been created.`
        );
      } catch (emailErr) {
        // Log and continue without failing the request
        console.warn("Email send failed:", emailErr?.message || emailErr);
      }
    }

    res.status(201).json(todo);

  } catch (error) {
    res.status(500).json({ error: error.message || "Error creating todo" });
  }
};


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


exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({
      where: { 
        id: parseInt(id) 
      },
    });
    res.json({ message: "Todo deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
