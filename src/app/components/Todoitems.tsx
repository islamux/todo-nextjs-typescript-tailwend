'use client'
import Todo from "../types/todos"

interface TodoItemProps{
  todo : Todo;
  onToggle : (id:number)=> void;
  onDelete: (id:number)=> void;
  // Destructuring props: extract todo, onToggle, onDelete from props object
  // onToggle and onDelete are functions that take an id and return void (no return value)
}

// TodoItem component: represents a single todo item with checkbox and delete button  
// Props destructuring in the function parameter list
export default function TodoItem({todo, onToggle, onDelete}:TodoItemProps){
  return (
    // Each todo item is a flex container with space between items, padding, border, and hover effect
    // Contains:
    // 1. A checkbox to toggle completion status, styled with Tailwind CSS classes
    // 2. A span to display the todo text, with conditional styling based on completion status (line-through and gray text if completed)
    // 3. A delete button styled with Tailwind CSS classes, which calls onDelete when clicked
    // The entire item is wrapped in a div for layout and styling
    <div className="flex items-center justify-between p-3 border-b border-r-gray-200 hover:bg-gray-50">
    <div className="flex items-center space-x-3">
    <input
    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
    type="checkbox"
    checked={todo.completed}
    onChange={()=> onToggle(todo.id)}
    />
    {/* Conditional class names based on todo.completed status */}
    <span className= {`todo-text ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`} >{todo.text}</span>
    </div>

    <button
    className="text-red-500 hover:text-red-700 font-bold text-xl px-2"
    aria-label="Delet todo"
    onClick={()=> onDelete(todo.id)}
  >x</button>


    </div>
  ) 
}
