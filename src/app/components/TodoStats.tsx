import { Todo } from "../types/todos";

//interface: define the shape of props object
// Here, TodoStatsPorps has a single property todos which is an array of Todo objects 
interface TodoStatsPorps{
  todos: Todo[]
}

// TodoStats component: displays statistics about the todo list
export default function TodoStats({todos}:TodoStatsPorps){
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length
  const remaining = total - completed
  // Calculate total number of todos, number of completed todos, and number of remaining todos 
  // Use array methods: length to get total, filter to count completed
  // remaining is derived by subtracting completed from total

  // Render the statistics in a styled div
  // Tailwind CSS classes are used for styling
  // Display total, completed, and remaining counts 
  // Use flexbox to space out the stats evenly
  // End of TodoStats component

  return (
    // Container div with margin-top, padding, background color, rounded corners, small text size, and text color 
    // Inside the container, display the stats using spans
    // Use flexbox to arrange the spans with space between them
    // Each span shows one of the statistics: total, completed, remaining 
    // End of return statement
    <div
    className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600"
  >
    <div
    className="flex justify-between"  >
    <span >Total:{total} </span>
    <span >completed: {completed}</span>
    <span >Remaining: {remaining}</span>
    </div>

    </div>
  )

}
