// Carries over incomplete tasks to today if they are overdue
export default function CarryOverLogic(todos) {
  const today = new Date().toDateString();

  return todos.map(todo => {
    if (!todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date(today)) {
      // Carry over to today
      return { ...todo, dueDate: today };
    }
    return todo;
  });
}
