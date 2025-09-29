# Tutorial: Core Structure & Configuration for a Todo App

Welcome! This document guides you through the foundational setup of our Todo application, focusing on project structure, configuration, and data modeling. This mirrors the approach taken in the "Voices of Truth" project, adapted for a task management context.

**Our Tech Stack:**
*   **Framework:** Next.js 15+ (with App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** React

---

## Step 1: Project Structure & Configuration
A clean and logical project structure is paramount for maintainability and scalability. Our Todo application will follow a similar structure to the "Voices of Truth" project.

```
/
├── public/             # Static assets (images, fonts)
├── src/                # Our main application source code
│   ├── app/            # Next.js App Router pages and layouts
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Main page
│   │   └── components/     # Components specific to app routes
│   ├── components/     # Reusable React components (e.g., TodoItem, TodoInput)
│   ├── hooks/          # Custom React hooks (e.g., useTodos)
│   ├── lib/            # Helper functions (e.g., for data persistence)
│   └── types/          # TypeScript type definitions
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

---

## Step 2: Defining Our Data (The "Model")
Before building any UI, we must define the shape of our core data: a `Todo` item. This definition will live in `src/types/todos.ts`.

```typescript
// src/types/todos.ts
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number; // Timestamp
  dueDate?: number; // Optional timestamp
  priority?: 'low' | 'medium' | 'high'; // Optional priority
}
```

**Why these fields?**
*   `id`: A unique identifier for each todo item.
*   `text`: The description of the todo item.
*   `completed`: A boolean indicating whether the task is finished.
*   `createdAt`: A timestamp to track when the todo was created.
*   `dueDate`: An optional timestamp for task deadlines.
*   `priority`: An optional field to categorize tasks by importance.

---

## Step 3: Initial Data Source (Placeholder)
For initial development, our Todo application will use a simple, in-memory array or `localStorage` for data persistence. This allows us to focus on the UI and logic before integrating with a more complex backend.

```typescript
// src/lib/todo-data.ts (Example placeholder for data source)
import { Todo } from '../types/todos';

export const initialTodos: Todo[] = [
  { id: '1', text: 'Learn Next.js', completed: false, createdAt: Date.now() },
  { id: '2', text: 'Build a Todo App', completed: true, createdAt: Date.now() - 86400000 },
  { id: '3', text: 'Write Documentation', completed: false, createdAt: Date.now() + 86400000, dueDate: Date.now() + 86400000, priority: 'high' },
];

// In a real application, this would involve fetching from an API or database.
// For now, we'll simulate data operations within a custom hook or utility functions.
```

---

## Conclusion
With the core structure, configuration, and data model defined, we have laid the groundwork for our Todo application. The next steps will involve implementing the core functionalities using Next.js Server and Client Components, following the patterns established in the "Voices of Truth" project.
