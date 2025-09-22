'use client'
import { Todo } from "../types/todos";

interface TodoStatsPorps{
  todos: Todo[]
}

export default function TodoStats({todos}:TodoStatsPorps){
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length
  const remaining = total - completed

  return (
    <div
    className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600"
  >
    <div
    className="flex justify-between"  >
    <span >Total:{total} </span>
    <span >Completed: {completed}</span>
    <span >Remaining: {remaining}</span>
    </div>

    </div>
  )

}