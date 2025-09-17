# Plan to Add Arabic Language Support
Here are the steps to add Arabic language support to the project:

1.  **Create a new git branch:**
    ```bash
    git checkout -b feat/arabic-support
    ```

2.  **Install i18next and react-i18next:**
    ```bash
    pnpm add i18next react-i18next i18next-browser-languagedetector
    ```

3.  **Configure i18next:**
    Create a new file `src/app/i18n.ts` with the following content:
    ```typescript
    import i18n from 'i18next';
    import { initReactI18next } from 'react-i18next';
    import LanguageDetector from 'i18next-browser-languagedetector';

    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
        resources: {
          en: {
            translation: {
              // here we will add our translations
            }
          },
          ar: {
            translation: {
              // here we will add our translations
            }
          }
        }
      });

    export default i18n;
    ```

4.  **Create translation files:**
    Create two new files:
    - `src/app/locales/en/translation.json`
    - `src/app/locales/ar/translation.json`

    Add the following content to `src/app/locales/en/translation.json`:
    ```json
    {
      "Todo List": "Todo List",
      "Add a new todo": "Add a new todo",
      "Add": "Add",
      "Tasks": "Tasks",
      "Completed": "Completed",
      "Remaining": "Remaining"
    }
    ```

    Add the following content to `src/app/locales/ar/translation.json`:
    ```json
    {
      "Todo List": "قائمة المهام",
      "Add a new todo": "أضف مهمة جديدة",
      "Add": "أضف",
      "Tasks": "المهام",
      "Completed": "مكتمل",
      "Remaining": "متبقي"
    }
    ```

5.  **Modify `i18n.ts` to use the translation files:**
    Update `src/app/i18n.ts` to import the translation files:
    ```typescript
    import i18n from 'i18next';
    import { initReactI18next } from 'react-i18next';
    import LanguageDetector from 'i18next-browser-languagedetector';
    import enTranslation from './locales/en/translation.json';
    import arTranslation from './locales/ar/translation.json';

    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false,
        },
        resources: {
          en: {
            translation: enTranslation
          },
          ar: {
            translation: arTranslation
          }
        }
      });

    export default i18n;
    ```

6.  **Modify the components to use the translations:**
    In your components (e.g., `TodoApp.tsx`, `TodoInput.tsx`, etc.), use the `useTranslation` hook to translate the text.

    First, import the `i18n` configuration in `src/app/layout.tsx` and wrap the children with the `I18nextProvider`.

    ```typescript
    // src/app/layout.tsx
    'use client';
    import './globals.css';
    import { I18nextProvider } from 'react-i18next';
    import i18n from './i18n';

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en">
          <body>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
          </body>
        </html>
      );
    }
    ```

    Then, in your components, use the `useTranslation` hook:
    ```typescript
    // Example in TodoApp.tsx
    import { useTranslation } from 'react-i18next';

    const TodoApp = () => {
      const { t } = useTranslation();
      // ...
      return (
        <div>
          <h1>{t('Todo List')}</h1>
          {/* ... */}
        </div>
      );
    };
    ```

7.  **Add a language switcher:**
    Create a new component `LanguageSwitcher.tsx` to allow the user to switch between languages.
    ```typescript
    // src/app/components/LanguageSwitcher.tsx
    import { useTranslation } from 'react-i18next';

    const LanguageSwitcher = () => {
      const { i18n } = useTranslation();

      const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
      };

      return (
        <div>
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('ar')}>العربية</button>
        </div>
      );
    };

    export default LanguageSwitcher;
    ```

    Then, add the `LanguageSwitcher` component to your `TodoApp.tsx` or `layout.tsx`.
