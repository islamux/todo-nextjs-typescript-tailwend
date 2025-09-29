# Tutorial: Client-Side Interaction & State Management

This tutorial focuses on building the interactive client-side components for our Todo application. We will create a stateful Client Component, `TodoListClient.tsx`, which will manage user interactions (adding, editing, deleting, and toggling completion of todos) and synchronize filter selections with the URL. This follows the pattern established by `HomePageClient.tsx` in the "Voices of Truth" project.

---

## Step 1: Create the `TodoListClient` Component
This component will be marked with `'use client'` and will contain the logic for managing the UI state and interacting with the Next.js router to update URL search parameters.

**Create the file `src/app/TodoListClient.tsx`:**

```tsx
// src/app/TodoListClient.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Todo } from '@/types/todos';
import TodoInput from '@/components/TodoInput'; // To be created
import TodoList from '@/components/TodoList';   // To be created
import TodoFilter from '@/components/TodoFilter'; // To be created

interface TodoListClientProps {
  todos: Todo[]; // These are the pre-filtered todos from the Server Component
  filterOptions: Array<{ value: string; label: string }>;
  currentStatusFilter: string;
}

const TodoListClient: React.FC<TodoListClientProps> = ({
  todos,
  filterOptions,
  currentStatusFilter,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for managing the filter selected by the user
  const [statusFilter, setStatusFilter] = useState(currentStatusFilter);

  // State for managing the list of todos (for client-side operations like add/edit/delete)
  // In a real app, these operations would likely trigger server actions or API calls.
  // For this client-side example, we'll manage a local copy.
  const [localTodos, setLocalTodos] = useState<Todo[]>(todos);

  // Effect to update localTodos when the server-provided todos change
  useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);

  // Syncing filter state with URL
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (statusFilter && statusFilter !== 'all') {
      newSearchParams.set('status', statusFilter);
    } else {
      newSearchParams.delete('status');
    }
    router.push(`?${newSearchParams.toString()}`);
  }, [statusFilter, router, searchParams]);

  // Handlers for Todo operations
  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(), // Simple unique ID
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setLocalTodos((prev) => [...prev, newTodo]);
    // In a real app, this would be a Server Action or API call
  };

  const handleToggleComplete = (id: string) => {
    setLocalTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    // In a real app, this would be a Server Action or API call
  };

  const handleDeleteTodo = (id: string) => {
    setLocalTodos((prev) => prev.filter((todo) => todo.id !== id));
    // In a real app, this would be a Server Action or API call
  };

  const handleEditTodo = (id: string, newText: string) => {
    setLocalTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    // In a real app, this would be a Server Action or API call
  };

  // Memoized filtered todos for display (client-side filtering for local changes)
  const displayedTodos = useMemo(() => {
    if (statusFilter === 'completed') {
      return localTodos.filter(todo => todo.completed);
    } else if (statusFilter === 'active') {
      return localTodos.filter(todo => !todo.completed);
    }
    return localTodos;
  }, [localTodos, statusFilter]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">My Todo List</h1>
      <TodoInput onAddTodo={handleAddTodo} />
      <TodoFilter
        filterOptions={filterOptions}
        currentFilter={statusFilter}
        onFilterChange={setStatusFilter}
      />
      <TodoList
        todos={displayedTodos}
        onToggleComplete={handleToggleComplete}
        onDeleteTodo={handleDeleteTodo}
        onEditTodo={handleEditTodo}
      />
    </div>
  );
};

export default TodoListClient;
```

---

## Step 2: The Client-Server Interaction Loop
This component demonstrates the core client-server interaction loop:

1.  **User Action:** The user selects a filter option in `TodoFilter` or performs an action on a `TodoItem`.
2.  **State Update:** The corresponding handler (`setStatusFilter`, `handleAddTodo`, etc.) updates the component's internal state (`statusFilter`, `localTodos`).
3.  **Effect Triggered:** The `useEffect` hook detects a change in `statusFilter`.
4.  **URL Update:** `router.push()` changes the URL (e.g., to `/?status=active`).
5.  **Server Reruns:** Next.js detects the URL change and re-renders the Server Component (`src/app/page.tsx`) with the new `searchParams`.
6.  **New Data:** The server filters the data and passes the new, smaller list down to `TodoListClient` via the `todos` prop.
7.  **UI Update:** The `useEffect` that watches `todos` updates `localTodos`, and the component re-renders with the new list.

---

## Step 3: Placeholder UI Components
To make `TodoListClient` functional, we need to define the basic interfaces for `TodoInput`, `TodoList`, and `TodoFilter`.

```tsx
// src/components/TodoInput.tsx
'use client';
import React, { useState } from 'react';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onAddTodo(inputText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Todo
      </button>
    </form>
  );
);

export default TodoInput;

// src/components/TodoFilter.tsx
'use client';
import React from 'react';

interface TodoFilterProps {
  filterOptions: Array<{ value: string; label: string }>;
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({
  filterOptions,
  currentFilter,
  onFilterChange,
}) => {
  return (
    <div className="mb-4">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          className={`px-4 py-2 rounded-md mr-2 ${currentFilter === option.value ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;

// src/components/TodoList.tsx
'use client';
import React from 'react';
import { Todo } from '@/types/todos';
import TodoItem from './TodoItem'; // To be created

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, newText: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onDeleteTodo,
  onEditTodo,
}) => {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;

// src/components/TodoItem.tsx
'use client';
import React, { useState } from 'react';
import { Todo } from '@/types/todos';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDeleteTodo,
  onEditTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEditSubmit = () => {
    onEditTodo(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm">
      <div className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          className="mr-3 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleEditSubmit();
            }}
            className="flex-grow p-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            autoFocus
          />
        ) : (
          <span
            className={`flex-grow text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
            aria-label="Edit todo"
          >
            ✏️
          </button>
        )}
        <button
          onClick={() => onDeleteTodo(todo.id)}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
          aria-label="Delete todo"
        >
          🗑️
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
```

---

## Conclusion
With `TodoListClient` and its child components, we have established the interactive core of our Todo application. This client-side logic handles user input, manages local state, and communicates with the server (via URL changes) to trigger data re-fetching and filtering. The next module will focus on styling these components using Tailwind CSS.
