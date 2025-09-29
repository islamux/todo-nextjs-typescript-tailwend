# 📚 Todo App - Next.js & Tailwind CSS

![Next.js](https://img.shields.io/badge/Next.js-15.x-blue?logo=next.js&style=flat-square)
![Platform](https://img.shields.io/badge/Platform-Web-blueviolet?style=flat-square)
![License](https://img.shields.io/badge/License-GNU%20GPL-red?logo=gnu&style=flat-square)

> **Todo App** is a modern task management application built with Next.js, React, and Tailwind CSS, featuring server-side filtering, internationalization, and a clean, responsive user interface.
> Built with ❤️ by [islamux](mailto:fathi733@gmail.coom)

---

## 🚀 Features

- 🎨 Clean, user-friendly interface
- 🌙 Dark & Light mode support
- 🌍 Internationalization with instant language switching (Arabic RTL & English LTR)
- 📱 Fully responsive for all devices
- 🔍 Filter todos by status (All, Active, Completed)
- ⭐ Mark todos as favorites and filter by them
- ✨ Smooth loading state with skeleton UI
- 📝 Local data persistence using `localStorage` for favorites

---

## 📦 Requirements

- Node.js 18+
- pnpm (preferred package manager)

If you don't have pnpm installed, you can install it globally:
```bash
npm install -g pnpm
```

---

## 🧪 How to Use

First, clone the repository and navigate into the project directory:

```bash
git clone https://github.com/your-username/todo-nextjs-typescript-tailwind.git
cd todo-nextjs-typescript-tailwind
```

Then, install the dependencies using pnpm:

```bash
pnpm install
```

Finally, you can run the following scripts:

*   **`pnpm dev`**: Runs the development server. Open [http://localhost:3000/en](http://localhost:3000/en) or [http://localhost:3000/ar](http://localhost:3000/ar) in your browser.
*   **`pnpm build`**: Builds the application for production.
*   **`pnpm start`**: Starts the production server.
*   **`pnpm lint`**: Runs ESLint to check for code quality issues.


---

## 📂 File Structure

```
todo-nextjs-typescript-tailwind/
├── public/
│   └── locales/        # Translation files (en, ar)
├── src/
│   ├── app/
│   │   ├── [locale]/     # Dynamic routes for i18n
│   │   │   ├── page.tsx      # Server component for data fetching/filtering
│   │   │   └── layout.tsx    # Layout including i18n provider
│   │   ├── components/   # Reusable React components
│   │   ├── hooks/        # Custom hooks (useTodos, useFavorites)
│   │   └── types/        # TypeScript type definitions
│   ├── lib/              # Helper libraries (i18n config)
│   └── middleware.ts     # Middleware for locale detection
├── docs/
│   └── ...             # Project documentation
├── package.json
└── ...
```

---

## 🧠 How It Works

- **Hybrid Filtering Model:** The app uses a powerful hybrid model. Primary filtering (by status like 'active' or 'completed') is done **server-side** based on URL parameters for maximum performance. Secondary filtering (by "favorites") is done **client-side**, using data stored in `localStorage`.
- **Separation of Concerns:** Logic is cleanly separated. Server Components (`page.tsx`) handle data fetching and primary filtering, while stateful Client Components (`TodoListClient.tsx`) manage user interaction and UI state.
- **Internationalization:** Powered by `react-i18next` with language detection via middleware and local JSON translation files.
- **Styling:** A responsive and modern UI is built with Tailwind CSS, supporting both light and dark modes.

---

## 📚 Detailed Guides

- [01: Project Setup](./01-Project-Setup/)
- [02: Server-Side Filtering](./02-Server-Side-Filtering/)
- [03: Client-Side Interaction](./03-Client-Side-Interaction/)
- [04: Styling](./04-Styling/)
- [05: Translations](./05-Translations/)
- [06: Loading States](./06-Loading-States/)
- [07: Favorites Feature](./07-Favorites-Feature/)
- [08: Code Organization](./08-Code-Organization/)

---

## 📜 License

This project is licensed under the **GNU GPL**.
Feel free to use and modify.
Read more: [https://www.gnu.org/licenses/gpl-3.0.en.html](https://www.gnu.org/licenses/gpl-3.0.en.html)

---

## ✨ Author

**[@islamux](https://github.com/islamux)**
💻 Muslim Developer • Linux Terminal Lover • Open Source Enthusiast
🕊️ "وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ" – الأنبياء 107
*Using technology to spread peace and benefit all of humanity.*

---

## ☁️ Future Ideas

- Add a real backend for data persistence and user accounts
- User authentication for private todo lists
- Integration with calendar services to sync due dates
- Advanced filters (by priority, due date) and search functionality