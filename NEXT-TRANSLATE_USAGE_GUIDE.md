# دليل استخدام next-translate في Next.js 15

## 1. التثبيت
أولاً، تأكد من تثبيت المكتبة:
```bash
pnpm add next-translate
```

## 2. إعداد التكوين
أضف التكوين إلى `next.config.js`:
```javascript
const withTranslate = require('next-translate');

module.exports = withTranslate({
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
});
```

## 3. بناء هيكل الملفات
قم بإنشاء المجلدات التالية:
```
public/locales
├── en
│   └── common.json
└── ar
    └── common.json
```

## 4. إضافة الترجمات
### `public/locales/en/common.json`:
```json
{
  "welcome": "Welcome",
  "todo": "Todo List"
}
```

### `public/locales/ar/common.json`:
```json
{
  "welcome": "مرحبا",
  "todo": "قائمة المهام"
}
```

## 5. استخدام الترجمات في المكونات
### مثال:
```tsx
import { useTranslations } from 'next-translate';

export default function Home() {
  const t = useTranslations('common');
  
  return (
    <main>
      <h1>{t('welcome')}</h1>
      <p>{t('todo')}</p>
    </main>
  );
}
```

## 6. مفتاح التحويل بين اللغات
### إنشاء مكون للتبديل:
```tsx
import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const { locale, locales, asPath } = useRouter();

  return (
    <div>
      {locales.map((lng) => (
        <Link
          key={lng}
          href={asPath}
          locale={lng}
          style={{ fontWeight: lng === locale ? 'bold' : 'normal' }}
        >
          {lng.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
```

## 7. إضافة التكوين المخصص
إذا كنت تستخدم تكوينًا مخصصًا، قم بإنشاء ملف `types/i18n.d.ts`:
```typescript
type TranslateProps = {
  lang: 'en' | 'ar';
  ns: { common: Record<string, string> };
};
```

## 8. اختبار الترجمة
تشغيل الخادم:
```bash
pnpm dev
```

ثم تحقق من http://localhost:3000/ar للعربية أو http://localhost:3000/en للمحتوى بالإنجليزية.

## ملاحظات هامة:
- تأكد من وجود الترجمة لكل مفتاح في جميع اللغات
- في الإصدار 15، يتم دعم الترجمة دون التزود المسبق (CSR فقط)
- استخدم المكون `LanguageSwitcher` بشكل ديناميكي لتغيير اللغات
- قم بتجريبي جميع سيناريوهات اللغة (التحويل التلقائي، التحويل اليدوي، الخلفية المطلقة)