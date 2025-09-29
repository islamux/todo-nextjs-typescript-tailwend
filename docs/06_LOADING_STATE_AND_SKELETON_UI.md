# Tutorial: Implementing a Loading State and Skeleton UI for Your Todo App

This guide explains how to add a loading indicator and skeleton UI to your Todo application. This significantly improves user experience by providing visual feedback while data is being processed or fetched, especially when dealing with asynchronous operations or slower network conditions.

---

## 1. Introduction
In modern web applications, showing a blank screen while content loads can be frustrating for users. A loading state, often accompanied by a skeleton UI, provides a better experience by indicating that content is on its way and giving a preview of the layout.

---

## 2. Introduce a Loading State in `useTodos` Hook
We'll add a new state variable to our custom `useTodos` hook (or similar data fetching logic) to track whether the initial data processing is complete. For our current static data setup, this will be a simulated delay.

**Modify `src/hooks/useTodos.ts` (Conceptual):**

```typescript
// src/hooks/useTodos.ts
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Todo } from '@/types/todos';
import { initialTodos } from '@/lib/todo-data';

export const useTodos = () => {
  const [isLoading, setIsLoading] = useState(true); // 1. Add isLoading state
  const [todos, setTodos] = useState<Todo[]>([]);
  // ... (other state for filters, etc.)

  useEffect(() => {
    // Simulate data fetching/processing delay
    const timer = setTimeout(() => {
      setTodos(initialTodos); // Load initial data
      setIsLoading(false); // Set loading to false after data is ready
    }, 1000); // Simulate a 1-second delay

    return () => clearTimeout(timer);
  }, []);

  // ... (rest of the hook logic for filtering, adding, etc.)

  const filteredTodos = useMemo(() => {
    // Apply filtering logic here based on other state variables
    return todos; // Placeholder
  }, [todos /*, other filter dependencies */]);

  return {
    isLoading, // 2. Return the loading state
    todos: filteredTodos,
    // ... (other return values)
  };
};
```

**Explanation:**
*   We introduce an `isLoading` state, initialized to `true`.
*   A `useEffect` hook simulates an asynchronous data load (e.g., from an API) using `setTimeout`.
*   Once the simulated data is loaded, `setIsLoading(false)` is called.
*   The `isLoading` state is returned from the hook, allowing consuming components to react to the loading status.

---

## 3. Create a Skeleton Loader for `TodoItem`
A skeleton loader mimics the layout of the content that is about to appear, providing a smoother transition than a simple spinner.

**Create the file `src/components/TodoItemSkeleton.tsx`:**

```tsx
// src/components/TodoItemSkeleton.tsx
import React from 'react';

const TodoItemSkeleton = () => {
  return (
    <li className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm animate-pulse mb-2">
      <div className="flex items-center flex-grow">
        <div className="mr-3 h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </li>
  );
};

export default TodoItemSkeleton;
```

**Explanation:**
*   This component uses Tailwind CSS utility classes (e.g., `animate-pulse`, `bg-gray-300`) to create a visual representation of a `TodoItem` that is still loading.
*   It matches the general shape and size of a real `TodoItem` to provide a good user experience.

---

## 4. Conditionally Render in `TodoListClient`
Now, we'll use the `isLoading` state in our `TodoListClient.tsx` to conditionally render either the skeleton loaders or the actual `TodoList`.

**Modify `src/app/TodoListClient.tsx` (Conceptual):**

```tsx
// src/app/TodoListClient.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Todo } from '@/types/todos';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFilter from '@/components/TodoFilter';
import TodoItemSkeleton from '@/components/TodoItemSkeleton'; // 1. Import skeleton
// import { useTodos } from '@/hooks/useTodos'; // If you refactor to use a hook for all logic

interface TodoListClientProps {
  todos: Todo[];
  filterOptions: Array<{ value: string; label: string }>;
  currentStatusFilter: string;
  // isLoading: boolean; // If isLoading comes from a parent Server Component or a hook
}

const TodoListClient: React.FC<TodoListClientProps> = ({
  todos,
  filterOptions,
  currentStatusFilter,
  // isLoading, // If passed as prop
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // For demonstration, let's assume isLoading is managed internally or passed down.
  // If using useTodos hook, you'd get it from there.
  const [isLoading, setIsLoading] = useState(true); // Simulate internal loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  // ... (rest of the state and handlers)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">My Todo List</h1>
      <TodoInput onAddTodo={handleAddTodo} />
      <TodoFilter
        filterOptions={filterOptions}
        currentFilter={currentStatusFilter}
        onFilterChange={setStatusFilter}
      />

      {/* 2. Conditional rendering based on isLoading */}
      {isLoading ? (
        <ul className="space-y-2">
          {/* Render a few skeleton items to fill the screen */}
          {Array.from({ length: 5 }).map((_, index) => (
            <TodoItemSkeleton key={index} />
          ))}
        </ul>
      ) : (
        <TodoList
          todos={todos} // Use the todos passed from the server (or from useTodos hook)
          onToggleComplete={handleToggleComplete}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
        />
      )}
    </div>
  );
};

export default TodoListClient;
```

**Explanation:**
*   The `isLoading` flag (either from a custom hook or passed as a prop) controls the rendering.
*   If `isLoading` is `true`, a list of `TodoItemSkeleton` components is rendered.
*   If `isLoading` is `false`, the actual `TodoList` component with the fetched data is rendered.

This approach provides a much smoother and more professional-looking loading experience for the user, making the application feel more responsive.