# Tutorial: Implementing a "Favorite" Todos Feature

This guide walks you through adding a "Favorite" feature to your Todo application. We will use a **hybrid filtering model**, similar to the approach in the "Voices of Truth" project, where primary filtering happens server-side, and a secondary client-side filter handles favorites.

---

## 1. Introduction
The "Favorite" feature allows users to mark and save their preferred or most important Todo items. This enhances user experience by providing quick access to critical tasks.

**The Architecture:**
1.  **Server-Side Filtering:** The server will continue to handle primary filtering (e.g., by status) based on URL parameters.
2.  **Client-Side Favorites:** The user's favorite Todo IDs will be stored in their browser's `localStorage`.
3.  **Hybrid Filtering:** When the user wants to see only their favorites, the client will perform a *second*, client-side filtering pass on the data it has already received from the server.

---

## 2. Create a `useFavorites` Custom Hook
This hook will manage the state and logic for favorites on the client side, interacting with `localStorage`.

**Create the file `src/hooks/useFavorites.ts`:**

```typescript
// src/hooks/useFavorites.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

// A custom hook to manage favorite Todo IDs in localStorage
export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // On initial load, get favorites from localStorage
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favoriteTodos');
      if (storedFavorites) {
        setFavoriteIds(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to parse favorites from localStorage", error);
    }
  }, []);

  // Function to add or remove a favorite
  const toggleFavorite = useCallback((todoId: string) => {
    setFavoriteIds(prevIds => {
      const isFavorite = prevIds.includes(todoId);
      const newIds = isFavorite
        ? prevIds.filter(id => id !== todoId) // Remove
        : [...prevIds, todoId]; // Add

      // Update localStorage
      localStorage.setItem('favoriteTodos', JSON.stringify(newIds));
      return newIds;
    });
  }, []);

  // Function to check if a Todo is a favorite
  const isFavorite = useCallback((todoId: string) => {
    return favoriteIds.includes(todoId);
  }, [favoriteIds]);

  return { favoriteIds, toggleFavorite, isFavorite };
};
```

**Explanation:**
*   This hook is self-contained, managing a list of Todo IDs in state.
*   It synchronizes this list with `localStorage` for persistence across sessions.
*   It provides `toggleFavorite` to add/remove a Todo from favorites and `isFavorite` to check a Todo's status.

---

## 3. Add a Favorite Button to `TodoItem`
We need a UI element for the user to mark a Todo as a favorite. We'll add a star or heart icon to each `TodoItem`.

**Modify `src/components/TodoItem.tsx` (Conceptual):**

```tsx
// src/components/TodoItem.tsx
'use client';

import React, { useState } from 'react';
import { Todo } from '@/types/todos';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, newText: string) => void;
  isFavorite: (id: string) => boolean; // New prop
  toggleFavorite: (id: string) => void; // New prop
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDeleteTodo,
  onEditTodo,
  isFavorite,
  toggleFavorite,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const isFav = isFavorite(todo.id);

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
        <button
          onClick={() => toggleFavorite(todo.id)}
          className={`text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-500 ${isFav ? 'fill-current' : ''}`}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {/* Star SVG Icon (example) */}
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>
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

## 4. Add a "Show Favorites" Toggle to `TodoFilter`
We need a UI control to toggle the favorites view. This will be added to the `TodoFilter` component.

**Modify `src/components/TodoFilter.tsx` (Conceptual):**

```tsx
// src/components/TodoFilter.tsx
'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

interface TodoFilterProps {
  filterOptions: Array<{ value: string; label: string }>;
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  showOnlyFavorites: boolean; // New prop
  onToggleFavorites: (show: boolean) => void; // New prop
}

const TodoFilter: React.FC<TodoFilterProps> = ({
  filterOptions,
  currentFilter,
  onFilterChange,
  showOnlyFavorites,
  onToggleFavorites,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`px-4 py-2 rounded-md mr-2 ${currentFilter === option.value ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          >
            {t(option.label)}
          </button>
        ))}
      </div>

      {/* Favorites Toggle Switch */}
      <div className="flex items-center">
        <label htmlFor="favorites-toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id="favorites-toggle"
              className="sr-only"
              checked={showOnlyFavorites}
              onChange={(e) => onToggleFavorites(e.target.checked)}
            />
            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${showOnlyFavorites ? "transform translate-x-full bg-yellow-400" : ""}`}></div>
          </div>
          <div className="ml-3 text-gray-700 dark:text-gray-300 font-medium">
            {t('favorites')}
          </div>
        </label>
      </div>
    </div>
  );
};

export default TodoFilter;
```

---

## 5. Implement the Hybrid Filtering Logic in `TodoListClient`
This is the most important step. We will update `TodoListClient.tsx` to manage the state for favorites and perform the final client-side filtering step.

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
import TodoItemSkeleton from '@/components/TodoItemSkeleton';
import { useFavorites } from '@/hooks/useFavorites'; // Import the new hook

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

  const [statusFilter, setStatusFilter] = useState(currentStatusFilter);
  const [localTodos, setLocalTodos] = useState<Todo[]>(todos);

  // 1. Manage favorites state
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();

  // 2. State for the "Show Favorites" toggle
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

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

  // ... (handleAddTodo, handleToggleComplete, handleDeleteTodo, handleEditTodo - remain the same)

  // 3. Perform the SECOND (client-side) filtering pass for favorites
  const displayedTodos = useMemo(() => {
    let currentFilteredTodos = localTodos;

    // Apply status filter (if not handled by server for local changes)
    if (statusFilter === 'completed') {
      currentFilteredTodos = currentFilteredTodos.filter(todo => todo.completed);
    } else if (statusFilter === 'active') {
      currentFilteredTodos = currentFilteredTodos.filter(todo => !todo.completed);
    }

    if (showOnlyFavorites) {
      return currentFilteredTodos.filter(todo => favoriteIds.includes(todo.id));
    }
    return currentFilteredTodos;
  }, [localTodos, statusFilter, showOnlyFavorites, favoriteIds]);

  // Simulate loading state (if not coming from a hook)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">My Todo List</h1>
      <TodoInput onAddTodo={handleAddTodo} />
      <TodoFilter
        filterOptions={filterOptions}
        currentFilter={statusFilter}
        onFilterChange={setStatusFilter}
        showOnlyFavorites={showOnlyFavorites} // Pass down new props
        onToggleFavorites={setShowOnlyFavorites} // Pass down new props
      />

      {isLoading ? (
        <ul className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <TodoItemSkeleton key={index} />
          ))}
        </ul>
      ) : (
        <TodoList
          todos={displayedTodos}
          onToggleComplete={handleToggleComplete}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
          isFavorite={isFavorite} // Pass down new props
          toggleFavorite={toggleFavorite} // Pass down new props
        />
      )}
    </div>
  );
};

export default TodoListClient;
```

---

## Conclusion
This hybrid approach for the "Favorite" Todos feature is powerful. It keeps the heavy lifting of primary filtering on the server for performance, while still allowing for dynamic, client-side-only features like `localStorage`-based favorites. The `useFavorites` hook manages the data, `TodoItem` provides the UI, `TodoFilter` adds the toggle, and `TodoListClient` orchestrates the client-side filtering.
