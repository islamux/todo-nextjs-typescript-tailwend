'use client'

import { useEffect, useState } from "react"
import { Todo } from "../types/todos"
import TodoInput from "./TodoInput"
import TodoItem from "./Todoitems"
import TodoStats from "./TodoStats"


export default function TodoApp(){
  const [todos, setTodos] = useState<Todo[]>([])

  // Load todos from localstorage on mount
  useEffect( ()=> {
    const savedTodos = localStorage.getItem('todos')
    if(savedTodos){
      setTodos(JSON.parse(savedTodos))
    }
  },[])

  // Save todos to localStorage whenever they change
  useEffect( ()=> {
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos])

  // Add
  const addTodo = (text:string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  // Togglee
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id
      ? {...todo, completed: !todo.completed}
      : todo
    ))
  }

  // Delete
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
    My Todo App
    </h1>

    <TodoInput onAdd={addTodo}/>

    <div className="mb-6">
    {todos.length === 0 ? (
      <div className="text-center py-8 text-gray-500">
      <p className="text-lg"> No todos yet . Add one above</p>
      </div>
    ) : (
      <div className="border rounded-lg overflow-hidden">
      {todos.map(todo =>(
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

