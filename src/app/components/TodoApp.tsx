'use client'
import TodoInput from "./TodoInput"
import TodoItem from "./TodoItem"
import TodoStats from "./TodoStats"
import { useTodos } from "../hooks/useTodos"

export default function TodoApp(){
  // All the logic is now neatly contained in this single hook
  const { todos, addTodo, toggleTodo, deleteTodo, isLoading } = useTodos();


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
    Todo Application
    </h1>

    <TodoInput onAdd={addTodo}  />

    <div className="mb-6">
    {isLoading ? (
      <div className="text-center py-8 text-gray-500">
      <p className="text-lg">Loading...</p>
      </div>
    ) : todos.length === 0 ? (
      <div className="text-center py-8 text-gray-500">
      <p className="text-lg">No todos </p>
      </div>
    ) : (
      <div className="border rounded-lg overflow-hidden">
      {todos.map(todo => (
        <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        />
      ))}
      </div>
    )}
    </div>


    {todos.length > 0 && <TodoStats todos={todos}/>}
    </div>

  )
}

