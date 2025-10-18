// Step 2
const { Router } = require("express");
const { authenticateJWT } = require("../middlewares/authMiddleware.js");
const {
  listTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController.js");

const router = Router();

router.use(authenticateJWT);

router.post("/", createTodo);
router.get("/", listTodos);
router.patch("/:id", updateTodo); // Changed from PUT to PATCH
router.delete("/:id", deleteTodo);

module.exports = router;
