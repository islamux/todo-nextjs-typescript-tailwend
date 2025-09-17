# دليل إضافة الدعم العربي في Next.js 15

## الخطوات المُحدثة لنظام الملفات الجديدة في Next.js 15

1. **إنشاء مجلد للغات**:
```bash
mkdir -p src/app/ar
mkdir -p src/app/en
```

2. ** cấu hình next.config.js**:
```javascript
/** @type {import('next').NextConfig} */
export default {
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
  },
}
```

3. **إنشاء ملفات الصفحة للغات**:
- `src/app/ar/page.tsx`
- `src/app/en/page.tsx`

```tsx
// src/app/ar/page.tsx
export const metadata = {
  title: 'قائمة المهام بالعربية',
};

export default function ArabicPage() {
  return <h1>مرحبا بالعربية</h1>;
}
```

4. **إضافة مكون التحويل بين اللغات**:
```tsx
// src/app/components/LanguageSwitcher.tsx
import Link from 'next/link';

export default function LanguageSwitcher() {
  return (
    <div>
      <Link href='/ar'>العربية</Link> | 
      <Link href='/en'>English</Link>
    </div>
  );
}
```

5. **تذييل جميع الملفات باستخدام `useRouter`**:
```tsx
// src/app/[locale]/page.tsx
import { useRouter } from 'next/router';

export default function Home() {
  const { locale } = useRouter();
  return (
    <div>
      <h1>{locale === 'ar' ? 'مرحبا' : 'Hello World'}</h1>
      <LanguageSwitcher />
    </div>
  );
}
```

6. **تعديل ملف next-intl لتسريع الترجمة**:
```bash
pnpm add next-intl
directory create src/locales/ar.json
```

7. **استخدام `useTranslations`**:
```tsx
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  return <h1>{t('welcome')}</h1>;
}
```

## ملاحظات مهمة
- لا تستخدم `react-i18next` مع Next.js 15
- استخدم نظام التوجيه المضمن في Next.js 15
- جميع الملفات يجب أن تنتهي ب `-page.tsx`