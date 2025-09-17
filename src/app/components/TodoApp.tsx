'use client'
import { useEffect, useState } from "react"
import { Todo } from "../types/todos"
import TodoInput from "./TodoInput"
import TodoItem from "./Todoitems"
import TodoStats from "./TodoStats"

// What is this file about?
// This is the main TodoApp component that manages the state of the todo list.
// It handles adding, toggling, and deleting todos, as well as persisting them to localStorage.

// It also renders the TodoInput, TodoItem, and TodoStats components.

// Styling is done using Tailwind CSS for a clean and modern look.   
export default function TodoApp(){
  // State for todos list 
  // todos is an array of Todo objects, setTodos is the function to update import it 
  // initially an empty array

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
  // The above useEffect hook runs whenever the todos state changes
  // It saves the current todos array to localStorage as a JSON string
  // This ensures that the todos persist across page reloads  
  // End of useEffect hook

  // Add
  const addTodo = (text:string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
      // Create a new todo object with a unique id, the provided text, and completed set to false  
      // Date.now() is used to generate a unique id based on the current timestamp
      // End of newTodo object
    }
    setTodos([...todos, newTodo])
    // Update the todos state by creating a new array that includes all existing todos and the new todo
    // Using the spread operator (...) to copy existing todos into the new array 
    // This ensures immutability, which is important for React state management
    // When the todos state is updated, the component will re-render to reflect the changes
    // Also, the useEffect hook will save the updated todos to localstorage
    // This keeps the todos persistent across page reloads
    // End of addTodo function
  }

  // Togglee
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id
      ? {...todo, completed: !todo.completed}
      : todo
      // If the todo id matches the id passed in, create a new todo object with the completed property toggled
      // Otherwise, return the todo unchanged 
    ))
  }

  // Delete
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
    // Filter out the todo with the matching id 
    // This creates a new array without the deleted todo 
    // Update the todos state with the new array
    // End of deleteTodo function
  }

  return (
    // Main container for the Todo App
    // Centered with max width, padding, background color, rounded corners, shadow, and margin at the TodoApp top
    // Using Tailwind CSS classes for Styling 
    // Inside the container:
    // 1. Title of the app, centered with large font size, bold weight, margin at the bottom, and text color
    // 2. TodoInput component for adding new todos, passing the addTodo function as a prop
    // 3. Conditional rendering for the todo list or a message if there are no todos
    //    - If there are no todos, display a centered message with padding and text color
    //    - If there are todos, display them in a bordered, rounded container with overflow handling
    //      - Map over the todos array to render a TodoItem component for each todo, passing the todo object and the toggleTodo and deleteTodo functions as props
    // 4. TodoStats component to display statistics about the todos, only rendered if there are any todos
    // End of main container
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

