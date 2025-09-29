# Tutorial: Adding Internationalization (i18n) to Your Todo App

This tutorial outlines how to integrate a robust translation feature into your Next.js Todo application using `i18next` and `react-i18next`. We will follow the established patterns from the "Voices of Truth" project, leveraging the Next.js App Router for both server-side and client-side internationalization.

---

## 1. Introduction
The translation feature allows your application to support multiple languages, providing a localized experience for users. This project will utilize:

*   `i18next`: The core internationalization library.
*   `react-i18next`: React bindings for `i18next`.
*   `i18next-resources-to-backend`: A plugin to load translation files dynamically.

---

## 2. Middleware for Locale Detection (`src/middleware.ts`)
The middleware is crucial for detecting the user's preferred locale and redirecting them to the correct localized path (e.g., `/en` or `/ar`).

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of supported locales
const locales = ['en', 'ar'];
const defaultLocale = 'en';

// Get the preferred locale from the request
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const detectedLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => locales.includes(lang.substring(0, 2)));
    
    if (detectedLocale) {
      return detectedLocale.substring(0, 2);
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!api|_next/static|_next/image|favicon.ico|locales).*)',
  ],
};
```

*   **`getLocale`**: Parses the `accept-language` header to find a supported locale.
*   **`middleware`**: Checks if the URL path contains a locale; if not, it redirects the user to a localized path.
*   **`config.matcher`**: Ensures the middleware doesn't run on static assets or API routes.

---

## 3. Core i18n Configuration (`src/lib/i18n.ts`)
This file configures `i18next` to load translations for Server Components, dynamically importing JSON files from `/public/locales`.

```typescript
// src/lib/i18n.ts
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';

export const fallbackLng = 'en';
export const supportedLngs = [fallbackLng, 'ar'];
export const defaultNS = 'common';

async function initI18next(lng: string, ns: string | string[]) {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../public/locales/${language}/${namespace}.json`)
      )
    )
    .init({
      supportedLngs,
      fallbackLng,
      lng,
      ns,
      defaultNS,
      fallbackNS: defaultNS,
    });
  return i18nInstance;
}

export async function getTranslation(lng: string, ns: string | string[] = defaultNS) {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nextInstance,
    resources: i18nextInstance.services.resourceStore.data,
  };
}
```

*   **`initI18next`**: Creates and configures an `i18next` instance.
*   **`getTranslation`**: An async function for Server Components to retrieve the translation function (`t`) and resources.

---

## 4. Client-side i18n Provider (`src/components/I18nProviderClient.tsx`)
For Client Components, a provider is needed to make the `i18next` instance available via React's context. This provider is initialized with resources fetched on the server.

```typescript
// src/components/I18nProviderClient.tsx
'use client';

import { I18nextProvider } from 'react-i18next';
import { createInstance, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { fallbackLng, supportedLngs, defaultNS } from '../lib/i18n';

export default function I18nProviderClient({
  children,
  locale,
  resources
}: {
  children: React.ReactNode;
  locale: string;
  resources: Resource;
}) {
  const i18n = createInstance();

  i18n
    .use(initReactI18next)
    .init({
      supportedLngs,
      fallbackLng,
      lng: locale,
      ns: defaultNS,
      defaultNS,
      resources,
    });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

*   **`'use client'`**: Marks this as a Client Component.
*   **`init`**: Initializes the instance with server-provided `resources` to prevent re-fetching.
*   **`I18nextProvider`**: Wraps the application, making `i18n` accessible to child components.

---

## 5. Integrating the Provider in the Root Layout (`src/app/[locale]/layout.tsx`)
The root layout (`/app/[locale]/layout.tsx`) is a Server Component that fetches translations and passes them to `I18nProviderClient`.

```tsx
// src/app/[locale]/layout.tsx
import { getTranslation } from '../../lib/i18n';
import I18nProviderClient from '../../components/I18nProviderClient';
// import ThemeProvider from '@/components/ThemeProvider'; // If you have one
// import Layout from '@/components/Layout'; // If you have one

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  const { resources } = await getTranslation(locale);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <I18nProviderClient
          locale={locale}
          resources={resources}
        >
          {/* <ThemeProvider> */}
            {/* <Layout> */}
              {children}
            {/* </Layout> */}
          {/* </ThemeProvider> */}
        </I18nProviderClient>
      </body>
    </html>
  );
}

// Statically generate routes for supported locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}
```

*   **`getTranslation(locale)`**: Fetches translation JSON server-side.
*   **Provider Nesting**: `I18nProviderClient` wraps the application.
*   **`<html>` tag**: `lang` and `dir` attributes are set for accessibility and text direction.

---

## 6. Using Translations in Client Components
In any Client Component, use the `useTranslation` hook from `react-i18next` to access the translation function `t`.

```tsx
// src/components/TodoFilter.tsx (Example)
'use client'

import React from "react"
import { useTranslation } from "react-i18next"

// ...

const TodoFilter: React.FC<TodoFilterProps> = ({
  filterOptions,
  currentFilter,
  onFilterChange,
}) => {

  const { t } = useTranslation('common');

  return (
    <div className="mb-4">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          className={`px-4 py-2 rounded-md mr-2 ${currentFilter === option.value ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
        >
          {t(option.label)} {/* Translate the label */}
        </button>
      ))}
    </div>
  );
};
export default TodoFilter;
```

*   **`useTranslation('common')`**: Provides the `t` function, using the `common` namespace.
*   **`t('key')`**: Uses a key from your JSON file to render the translated string.

---

## 7. Translation Files (`public/locales/{locale}/common.json`)
Translation messages are stored in JSON files, organized by locale and namespace.

**Example: `public/locales/en/common.json`**
```json
{
  "appTitle": "My Todo List",
  "all": "All",
  "active": "Active",
  "completed": "Completed",
  "addTodoPlaceholder": "Add a new todo...",
  "addTodoButton": "Add Todo",
  "editTodo": "Edit todo",
  "deleteTodo": "Delete todo"
}
```

**Example: `public/locales/ar/common.json`**
```json
{
  "appTitle": "قائمة مهامي",
  "all": "الكل",
  "active": "نشط",
  "completed": "مكتمل",
  "addTodoPlaceholder": "أضف مهمة جديدة...",
  "addTodoButton": "أضف مهمة",
  "editTodo": "تعديل المهمة",
  "deleteTodo": "حذف المهمة"
}
```

---

## Conclusion
By following this structure, you can implement a robust and scalable translation feature for your Todo application. This approach is efficient and works seamlessly with the Next.js App Router, providing a localized experience for your users.
