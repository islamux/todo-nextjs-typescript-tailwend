import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:react/recommended", // Add React recommended rules
    "plugin:react-hooks/recommended", // Add React Hooks rules
    "plugin:jsx-a11y/recommended", // Add JSX accessibility rules
    "plugin:import/recommended" // Add import rules
  ),
  {
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Next.js doesn't require React to be in scope
    },
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
