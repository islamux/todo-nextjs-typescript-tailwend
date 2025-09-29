# Tutorial: How Filtering Works in Your Todo Project

Welcome! This tutorial will guide you through the filtering mechanism used in your Todo project. We use a powerful pattern that leverages Next.js Server Components for data filtering and Client Components for user interaction, with the URL acting as the "single source of truth" for the filter state.

## High-Level Overview: Server-Side Filtering

Instead of loading all Todo items into the browser and filtering them there (which can be slow), we perform the filtering on the server. Here’s the basic flow:

1.  A user selects a filter option in their browser (e.g., "Show Completed", "Show Active").
2.  The browser updates the URL to include the filter (e.g., `.../?status=completed`).
3.  This URL change tells Next.js to re-render the page on the server.
4.  The server reads the filter from the URL, filters the list of Todo items, and sends the *already filtered* list to the browser to be displayed.

This approach is fast and efficient, especially as the number of Todo items grows.

---

## The Data Flow: A Step-by-Step Journey

Let's trace what happens when a user filters by "status".

### Step 1: The User Interaction (Client-Side)

The user interacts with filter buttons. This UI is built from the `TodoFilter` component.

-   **`TodoFilter.tsx`**: This component presents buttons for different filter options (e.g., "All", "Active", "Completed"). When a user clicks an option, its `onClick` event fires, calling the `onFilterChange` function that was passed from `TodoListClient.tsx`.

### Step 2: Updating the State and URL (Client-Side)

The main client-side logic lives in **`src/app/TodoListClient.tsx`**.

1.  **State Management**: It uses `useState` to keep track of the currently selected filter value.
    ```typescript
    // src/app/TodoListClient.tsx
    const [statusFilter, setStatusFilter] = useState(currentStatusFilter);
    ```

2.  **Event Handlers**: It defines functions like `setStatusFilter` that update this state. These are the functions passed down to the `TodoFilter` component.
    ```typescript
    // src/app/TodoListClient.tsx
    const handleFilterChange = (selectedFilter: string) => setStatusFilter(selectedFilter);
    ```

3.  **Syncing with URL**: A `useEffect` hook watches for changes in the `statusFilter` state variable. When a change is detected, it constructs a new URL query string and uses the Next.js `useRouter` to push this new URL.
    ```typescript
    // src/app/TodoListClient.tsx
    useEffect(() => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      if (statusFilter && statusFilter !== 'all') {
        newSearchParams.set('status', statusFilter);
      } else {
        newSearchParams.delete('status');
      }
      router.push(`?${newSearchParams.toString()}`);
    }, [statusFilter, router, searchParams]);
    ```
    This is the key step! Changing the URL triggers the server-side part of the process.

### Step 3: The Server Reacts (Server-Side)

The main page component, **`src/app/page.tsx`**, is a **Server Component**. It runs on the server every time the page is requested.

1.  **Reading the URL**: It receives `searchParams` as a prop, which contains the filter values from the URL.
    ```typescript
    // src/app/page.tsx
    export default async function HomePage({ searchParams }: HomePageProps) {
      const { status } = searchParams;
      // ...
    }
    ```

2.  **Filtering the Data**: It then uses this information to filter the `initialTodos` array directly on the server.
    ```typescript
    // src/app/page.tsx
    let filteredTodos: Todo[] = initialTodos; // Start with all todos

    if (status === 'completed') {
      filteredTodos = initialTodos.filter(todo => todo.completed);
    } else if (status === 'active') {
      filteredTodos = initialTodos.filter(todo => !todo.completed);
    }
    // Add more filtering logic here for due dates, priority, etc.
    ```

### Step 4: Rendering the Result

Finally, the server component passes the filtered data down to the client component for rendering.

```typescript
// src/app/page.tsx
export default async function HomePage(...) {
  // ... filtering happens above ...

  // Pass the *already filtered* data to the client component.
  return (
    <TodoListClient
      todos={filteredTodos}
      filterOptions={filterOptions}
      currentStatusFilter={status?.toString() || 'all'}
    />
  );
}
```

The `TodoListClient` receives the new, smaller list of Todo items and renders it using the `TodoList` component. The user sees an updated list of Todo items that matches their selection, and the URL in their address bar reflects the current filter state.

---

## Summary

This "URL as State" pattern combined with Server-Side Filtering is a modern and highly effective way to build data-driven applications in Next.js.

-   **Performance**: The server handles the heavy lifting of filtering, so the client-side remains fast and responsive.
-   **Shareable URLs**: Since the filter state is in the URL, users can bookmark or share links to specific filtered views.
-   **Clean Architecture**: It creates a clear separation of concerns:
    -   **Server (`page.tsx`)**: Data fetching and filtering.
    -   **Client (`TodoListClient.tsx`)**: UI state management and user interaction.
    -   **UI Components (`TodoFilter.tsx`, `TodoList.tsx`, `TodoItem.tsx`)**: Reusable and focused on presentation.