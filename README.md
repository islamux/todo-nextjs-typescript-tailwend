# Next.js 14 Todo App

A simple and beautiful todo application built with Next.js 14, TypeScript, and Tailwind CSS. This project follows a tutorial to demonstrate modern web development practices.

## Features

- ✅ Add new todos with a simple input field
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Responsive design with Tailwind CSS
- ✅ Type-safe code with TypeScript
- ✅ Modern React patterns with Next.js 14
- ✅ Statistics for completed and remaining todos

## Tutorials

This project includes two detailed tutorials:

- **[TUTORIAL-BASE.md](TUTORIAL-BASE.md):** A step-by-step guide to building the todo application from scratch.
- **[TAILWIND_TUTORIAL.md](TAILWIND_TUTORIAL.md):** A comprehensive breakdown of the Tailwind CSS classes used in the project.

## GitHub Repository

[https://github.com/islamux/todo-nextjs-typescript-tailwend](https://github.com/islamux/todo-nextjs-typescript-tailwend)

## Prerequisites

- **Node.js** (version 18 or higher)
- **pnpm** (or another package manager like npm or yarn)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone 'https://github.com/islamux/todo-nextjs-typescript-tailwend'
    ```
    Navigate into the project directory.

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The main application code is located in the `src/` directory.

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

-   **`src/app/`**: Contains the core application logic and UI components.
-   **`src/app/page.tsx`**: The main component that renders the todo application.
-   **`src/app/components/`**: Contains all the React components.
-   **`src/app/types/`**: Contains all the TypeScript types.
-   **`public/`**: For static assets like images and icons.

## Technologies Used

-   [Next.js](https://nextjs.org/) - The React Framework for Production
-   [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale
-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
-   [React](https://react.dev/) - The library for web and native user interfaces

## Author

- **Fathi** - [fathi733@gmail.com](mailto:fathi733@gmail.com)

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details.

## Next Steps

This is a foundational project that can be extended with more features:

-   **Local Storage:** Persist todos in the browser after a page refresh.
-   **API Integration:** Connect the app to a backend database to store todos.
-   **Edit Functionality:** Allow users to edit existing todos.
-   **Authentication:** Add user accounts.
-   **Testing:** Implement unit and integration tests using Jest and React Testing Library.