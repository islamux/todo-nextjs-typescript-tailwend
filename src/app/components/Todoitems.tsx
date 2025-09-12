'use clinet'
import Todo from "../types/todos"

interface TodoItemProps{
  todo : Todo;
  onToggle : (id:number)=> void;
  onDelete: (id:number)=> void;
}


export default function TodoItem({todo, onToggle, onDelete}:TodoItemProps){
  return (
    <div className="flex items-center justify-between p-3 border-b border-r-gray-200 hover:bg-gray-50">
    <div className="flex items-center space-x-3">
    <input
    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
    type="checkbox"
    checked={todo.completed}
    onChange={()=> onToggle(todo.id)}
    />
    <span className="{`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}">{todo.text}</span>
    </div>

    <button
    className="text-red-500 hover:text-red-700 font-bold text-xl px-2"
    aria-label="Delet todo"
    onClick={()=> onDelete(todo.id)}
  >x</button>


    </div>
  ) 
}
