// Sorts todos by priority and optionally by grouping
export default function PrioritySorter(todos, groupBy) {
  const priorityOrder = { high: 1, medium: 2, low: 3 };

  // Sort by priority first
  const sorted = [...todos].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // Grouping logic
  if (groupBy === "priority") {
    return sorted; // already priority-sorted
  } else if (groupBy === "date") {
    return sorted.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }

  return sorted;
}
