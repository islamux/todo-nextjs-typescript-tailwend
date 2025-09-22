import { useEffect, useState } from "react";
import { Todo } from "../types/todos"


const isServer = typeof window === 'undefined';


export function useTodos(){

  const [todos, setTodos] = useState<Todo[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  // Load todos from localStorage on initial client-side render
  useEffect(() => {
    if (isServer) return; //Dont run on server
    try {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error("Failed to load todos from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []); // This runs only once on client-side mount

  // Add 
  const addTodo = (text: string)=> {
    const newTodo :Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos(prevTodos=>[...prevTodos, newTodo]);
  }

  // Toggle
  const toggleTodo = (id:number)=>{
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} :todo
      )
    );
  };

  // Delete
  const deleteTodo = (id:number)=>{
    setTodos(prevTodos => prevTodos.filter(todo=>
      todo.id !== id));             
  };

  return { todos, addTodo, toggleTodo, deleteTodo, isLoading };
}





