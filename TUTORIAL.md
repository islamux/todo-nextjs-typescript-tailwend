# Complete Next.js 14 + TypeScript + Tailwind CSS Todo App Tutorial

> **Assalamu Alaikum, Akhi! 🌟**
> Welcome to this comprehensive tutorial! As your senior developer guide, I'll walk you through building a beautiful todo app step by step. By the end of this tutorial, you'll have a solid understanding of modern web development with Next.js, TypeScript, and Tailwind CSS!

## Table of Contents
1.  Prerequisites & What You'll Learn
2.  Project Setup & Installation
3.  Understanding the Project Structure
4.  Creating the Todo Interface
5.  Building the Components
6.  Implementing Todo Functionality
7.  Styling with Tailwind CSS
8.  Persisting Todos with Local Storage
9.  Testing Your App
10. Next Steps & Best Practices

## 1. Prerequisites & What You'll Learn

### What You Need Before Starting:
-   **Node.js** (version 18 or higher) - Download from nodejs.org
-   **pnpm** - Installation guide at pnpm.io
-   **Basic HTML/CSS knowledge**
-   **Basic JavaScript knowledge**
-   **A code editor** (e.g., VS Code)

### What We'll Build Together:
-   ✅ Add new todos with a simple input field
-   ✅ Mark todos as complete/incomplete
-   ✅ Delete todos we no longer need
-   ✅ Persist todos in the browser using Local Storage
-   ✅ Beautiful, responsive design with Tailwind CSS
-   ✅ Type-safe code with TypeScript
-   ✅ Modern React patterns with Next.js 14, including a component-based architecture

> **💡 Pro Tip:** Don't rush through this tutorial. Take your time to understand each concept. If something doesn't make sense, read it again or research it further. That's how we grow as developers!

## 2. Project Setup & Installation

### Create a New Next.js Project
Open your terminal and run this command to create a new Next.js project:

```bash
npx create-next-app@latest todo-nextjs-typescript-tailwend --typescript --eslint --tailwind --src-dir --app --import-alias "@/*"
```

After the project is created, move the contents to the root directory as we did before.

### Start the Development Server
```bash
pnpm run dev
```
Open your browser and go to `http://localhost:3000`. You should see the default Next.js welcome page!

🎉 **Alhamdulillah!** Your setup is working perfectly!

## 3. Understanding the Project Structure
Here's the folder structure of our application:

```
.
├── src/
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
│       ├── page.tsx
│       ├── components/
│       │   ├── TodoApp.tsx
│       │   ├── TodoInput.tsx
│       │   ├── Todoitems.tsx
│       │   └── TodoStats.tsx
│       └── types/
│           └── todos.ts
├── public/
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

> **Key Concepts:**
> • **src/app/components/**: We will create our React components here.
> • **src/app/types/**: This will hold our TypeScript type definitions.
> • **page.tsx**: The entry point for our application's UI.
> • **layout.tsx**: Wraps all pages, like a template.

## 4. Creating the Todo Interface

First, let's define the shape of a `Todo` object. Create a new directory `src/app/types` and a file `todos.ts` inside it.

**`src/app/types/todos.ts`**
```typescript
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
```
> **Why TypeScript?** TypeScript helps us catch bugs early. By defining the `Todo` interface, we ensure that every todo object in our app has a consistent structure.

## 5. Building the Components

Our application is split into several components for better organization and reusability.

### TodoInput Component
This component will be responsible for the input field and the "Add" button.

**`src/app/components/TodoInput.tsx`**
```tsx
'use client'
import { useState } from "react"

interface TodoInputProps{
  onAdd:(text:string)=> void;
}

export default function TodoInput({onAdd}:TodoInputProps){
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = ()=> {
    if(inputValue.trim() ){
      onAdd(inputValue.trim())
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent)=>{
    if(e.key === 'Enter'){
      handleSubmit()
    }
  }

  return (
    <div className="flex gap-2 mb-6">
      <input
        value={inputValue}
        onChange={(e)=> setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="What needs to be done?"
        className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus-within:outline-none focus:ring-2 focus:border-transparent"
      />
      <button
        onClick={handleSubmit}
        className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      > 
        Add
      </button>
    </div>
  )
}
```

### TodoItem Component
This component will display a single todo item with a checkbox to toggle its completion status and a button to delete it.

**`src/app/components/Todoitems.tsx`**
```tsx
'use client'
import { Todo } from "../types/todos"

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
        <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{todo.text}</span>
      </div>
      <button
        className="text-red-500 hover:text-red-700 font-bold text-xl px-2"
        aria-label="Delete todo"
        onClick={()=> onDelete(todo.id)}
      >x</button>
    </div>
  ) 
}
```

### TodoStats Component
This component will display the total number of todos, how many are completed, and how many are remaining.

**`src/app/components/TodoStats.tsx`**
```tsx
import { Todo } from "../types/todos";

interface TodoStatsPorps{
  todos: Todo[]
}

export default function TodoStats({todos}:TodoStatsPorps){
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length
  const remaining = total - completed

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
      <div className="flex justify-between"> 
        <span>Total:{total} </span>
        <span>completed: {completed}</span>
        <span>Remaining: {remaining}</span>
      </div>
    </div>
  )
}
```

### TodoApp Component
This is the main component that brings all the other components together and manages the state of the application.

**`src/app/components/TodoApp.tsx`**
```tsx
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
```

### Home Page
Finally, let's update the main `page.tsx` to render our `TodoApp` component.

**`src/app/page.tsx`**
```tsx
import TodoApp from './components/TodoApp'

export default function Home(){
  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12'>
      <TodoApp/>
    </main>
  )
}
```

🎊 **Barakallahu feek!** Save all the files and check your browser. You should now see a beautiful, fully functional todo app!

## 6. Implementing Todo Functionality

The core logic for adding, toggling, and deleting todos is handled in the `TodoApp.tsx` component using `useState` and passed down to the child components as props.

> **React Hooks:**
> • **useState**: Manages the `todos` array and the `inputValue` string.
> • **useEffect**: Used to load and save todos to the browser's `localStorage`.

## 7. Styling with Tailwind CSS

We use utility classes from Tailwind CSS directly in our JSX for styling. This makes it easy to build a responsive and modern-looking UI without writing custom CSS.

## 8. Persisting Todos with Local Storage

In `TodoApp.tsx`, we use two `useEffect` hooks:
1.  The first one runs once when the component mounts to load any saved todos from `localStorage`.
2.  The second one runs every time the `todos` state changes, saving the updated array to `localStorage`.

This ensures that your todos are not lost when you refresh the page.

## 9. Testing Your App
Make sure to test these scenarios:
1.  ✅ Add a new todo.
2.  ✅ Mark a todo as complete.
3.  ✅ Unmark a completed todo.
4.  ✅ Delete a todo.
5.  ✅ Refresh the page and see if your todos are still there.

**Congratulations! 🎉** You've built a complete todo app with modern web technologies!

## 10. Next Steps & Learning Path

### What You've Learned:
-   ✅ Next.js 14 project setup and structure
-   ✅ TypeScript interfaces and type safety
-   ✅ React hooks (`useState`, `useEffect`)
-   ✅ Component-based architecture in React
-   ✅ Persisting data with `localStorage`
-   ✅ Tailwind CSS utility classes

### Suggested Next Learning Steps:
-   **API Integration:** Connect to a backend database (e.g., Firebase, Supabase) to store todos.
-   **React Context:** Share state across multiple components without prop drilling.
-   **Custom Hooks:** Extract reusable logic into your own hooks.
-   **Testing:** Learn Jest and React Testing Library for automated testing.
-   **Deployment:** Deploy your app to Vercel or Netlify.

> **💪 Keep Growing:** Practice is key to becoming a great developer. Try modifying this app, break things, fix them, and learn from the process. Every error is a learning opportunity!

### Useful Resources for Continued Learning:
-   **Next.js Documentation:** nextjs.org/docs
-   **TypeScript Handbook:** typescriptlang.org/docs
-   **Tailwind CSS Docs:** tailwindcss.com/docs
-   **React Documentation:** react.dev

> **May Allah bless your learning journey! 🤲**
> Remember, every expert was once a beginner. Keep coding, keep learning, and don't be afraid to make mistakes. You're doing great, and I'm proud of how far you've come in this tutorial.
>
> **Barakallahu feek for following along!**
>
> *Happy coding, akhi! 🚀*
