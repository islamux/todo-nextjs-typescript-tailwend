# Tutorial: Styling Your Todo App with Tailwind CSS

This tutorial guides you through integrating and utilizing Tailwind CSS for styling your Next.js Todo application. We will follow the established patterns from the "Voices of Truth" project to ensure a consistent and efficient styling workflow.

---

## 1. Introduction to Tailwind CSS
**Tailwind CSS** is a utility-first CSS framework that enables you to build designs directly in your markup using pre-defined classes. It's highly customizable and promotes rapid UI development.

**PostCSS** is used to process Tailwind CSS and automatically add vendor prefixes with Autoprefixer.

---

## 2. Key Technologies and Installation
The project relies on the following packages for styling:

*   `tailwindcss`: The core Tailwind CSS framework.
*   `postcss`: The PostCSS processor.
*   `autoprefixer`: A PostCSS plugin for vendor prefixes.

These dependencies are typically listed in `devDependencies` in `package.json`:

```json
"devDependencies": {
  "autoprefixer": "^10.4.21",
  "postcss": "^8.4.31",
  "tailwindcss": "^3.3.0",
  "typescript": "^5.2.2"
}
```

To install these (if not already present), you would use `pnpm`:

```bash
pnpm install -D tailwindcss postcss autoprefixer
```

---

## 3. PostCSS Configuration (`postcss.config.mjs`)
PostCSS is configured to process your CSS files, integrating Tailwind CSS as a plugin.

```javascript
// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

*   The `plugins` object specifies `tailwindcss` to integrate it into the PostCSS build process.
*   `autoprefixer` is included to automatically add vendor prefixes for cross-browser compatibility.

---

## 4. Tailwind CSS Configuration (`tailwind.config.ts`)
The `tailwind.config.ts` file is where you customize Tailwind's default settings and specify which files to scan for utility classes.

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable dark mode based on a 'dark' class
  theme: {
    extend: {
      colors: {
        // Define custom colors or extend existing ones
        primary: '#3B82F6', // Example primary color
        secondary: '#6B7280', // Example secondary color
      },
    },
  },
  plugins: [],
};
export default config;
```

*   **`content`**: This crucial array tells Tailwind which files to scan for utility classes. This ensures only the necessary CSS is generated, optimizing bundle size. For our Todo app, it should scan `src/app` and `src/components`.
*   **`darkMode: 'class'`**: Configures Tailwind to enable dark mode when a `dark` class is present higher in the HTML tree.
*   **`theme.extend.colors`**: Allows extending Tailwind's default color palette with custom colors, if desired.

---

## 5. Integrating Tailwind into Your CSS (`src/app/globals.css`)
To inject Tailwind's base styles, components, and utilities, include its directives in your main CSS file, typically `src/app/globals.css`.

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* You can add your custom global styles here */
body {
  @apply bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100;
}
```

*   **`@tailwind base;`**: Injects Tailwind's base styles for normalization.
*   **`@tailwind components;`**: Injects Tailwind's component classes.
*   **`@tailwind utilities;`**: Injects all of Tailwind's utility classes.
*   The example `body` styling demonstrates how to apply Tailwind classes directly in CSS using `@apply` for global styles, and how to handle dark mode.

---

## 6. Usage in Components
Once configured, you can apply Tailwind classes directly to the `className` attribute of your HTML elements within your React components.

```typescript jsx
// Example usage in src/components/TodoItem.tsx
import React, { useState } from 'react';
import { Todo } from '@/types/todos';

interface TodoItemProps { /* ... */ }

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDeleteTodo,
  onEditTodo,
}) => {
  // ... (state and handlers)

  return (
    <li className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm mb-2">
      <div className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          className="mr-3 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        {/* ... (editing logic) ... */}
        <span
          className={`flex-grow text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        {/* ... (buttons) ... */}
      </div>
    </li>
  );
};

export default TodoItem;
```

*   Apply Tailwind utility classes directly to the `className` attribute.
*   Use `dark:` prefix for styles that should apply only in dark mode.

---

## Conclusion
This setup provides a powerful and efficient way to style your Todo application. Tailwind CSS facilitates rapid UI development, while PostCSS ensures optimized and compatible CSS. By following these guidelines, your Todo app will have a modern, responsive, and easily maintainable visual design.