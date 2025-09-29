# Tutorial: Server-Side Task Management & Filtering

This tutorial outlines how to implement server-side logic for managing and filtering Todo items in your Next.js application. Following the architectural patterns of the "Voices of Truth" project, we leverage Next.js Server Components to handle data processing efficiently, ensuring a performant user experience.

---

## High-Level Overview: Server-Side Filtering for Todos
Similar to how scholars were filtered on the server, our Todo application will perform primary filtering on the server. This approach is beneficial for performance, especially as the number of Todo items grows.

1.  A user interacts with filter options (e.g., "Show Completed", "Show Active") in their browser.
2.  The client-side component updates the URL to include the filter parameters (e.g., `.../?status=completed`).
3.  Next.js detects the URL change and re-renders the Server Component.
4.  The Server Component reads the filter from the URL, processes the list of Todos, and sends the *already filtered* list to the browser.

---

## Step 1: The Server Component (`src/app/page.tsx`)
The main page component, `src/app/page.tsx`, will be a Server Component. It will be responsible for reading URL `searchParams`, filtering the Todo data, and passing the filtered data to a Client Component for rendering.

```tsx
// src/app/page.tsx
import TodoListClient from './TodoListClient'; // We'll create this next
import { initialTodos } from '@/lib/todo-data'; // Our placeholder data
import { Todo } from '@/types/todos';

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // 1. Get filter values from the URL's search parameters.
  const { status } = searchParams;

  let filteredTodos: Todo[] = initialTodos; // Start with all todos

  // 2. Filter the todos on the server based on 'status'
  if (status === 'completed') {
    filteredTodos = initialTodos.filter(todo => todo.completed);
  } else if (status === 'active') {
    filteredTodos = initialTodos.filter(todo => !todo.completed);
  }
  // Add more filtering logic here for due dates, priority, etc.

  // 3. Prepare any additional data needed by the client (e.g., filter options)
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  // 4. Pass the filtered data and options to the client component.
  return (
    <TodoListClient
      todos={filteredTodos}
      filterOptions={filterOptions}
      currentStatusFilter={status?.toString() || 'all'}
    />
  );
}
```

### Important Note: `searchParams` in Next.js 15
As highlighted in the "Voices of Truth" documentation, the `searchParams` object in Server Components is **asynchronous** in Next.js 15. You **must `await` it** before accessing its properties if you were to destructure it directly. In the example above, we access `searchParams.status` directly, which is fine, but be mindful of this if you were to use `const { status } = await searchParams;`.

---

## Step 2: Data Source and Type Definitions
Ensure your `Todo` type is correctly defined and your initial data source is accessible.

```typescript
// src/types/todos.ts (from previous module)
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  dueDate?: number;
  priority?: 'low' | 'medium' | 'high';
}

// src/lib/todo-data.ts (from previous module)
export const initialTodos: Todo[] = [
  { id: '1', text: 'Learn Next.js', completed: false, createdAt: Date.now() },
  { id: '2', text: 'Build a Todo App', completed: true, createdAt: Date.now() - 86400000 },
  { id: '3', text: 'Write Documentation', completed: false, createdAt: Date.now() + 86400000, dueDate: Date.now() + 86400000, priority: 'high' },
];
```

---

## Conclusion
By implementing server-side task management and filtering, we ensure that our Todo application is performant and scalable. The Server Component (`src/app/page.tsx`) acts as the data orchestrator, preparing and delivering the correct subset of data to the client based on URL parameters. The next step will involve creating the `TodoListClient` component to handle user interactions and render the filtered data.
