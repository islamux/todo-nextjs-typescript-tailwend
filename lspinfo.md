
==============================================================================
vim.lsp:                                                                    ✅

- LSP log level : WARN
- Log path: /home/islamux/.local/state/nvim/lsp.log
- Log size: 58 KB

vim.lsp: Active Clients ~
- No active clients

vim.lsp: Enabled Configurations ~
- cssls:
  - cmd: { "vscode-css-language-server", "--stdio" }
  - filetypes: css, scss, less
  - init_options: {
      provideFormatter = true
    }
  - root_markers: package.json, .git
  - settings: {
      css = {
        validate = true
      },
      less = {
        validate = true
      },
      scss = {
        validate = true
      }
    }

- eslint:
  - before_init: <function @/home/islamux/.vim/plugged/nvim-lspconfig/lsp/eslint.lua:157>
  - cmd: { "vscode-eslint-language-server", "--stdio" }
  - filetypes: javascript, javascriptreact, javascript.jsx, typescript, typescriptreact, typescript.tsx, vue, svelte, astro, htmlangular
  - handlers: {
      ["eslint/confirmESLintExecution"] = <function 1>,
      ["eslint/noLibrary"] = <function 2>,
      ["eslint/openDoc"] = <function 3>,
      ["eslint/probeFailed"] = <function 4>
    }
  - on_attach: <function @/home/islamux/.vim/plugged/nvim-lspconfig/lsp/eslint.lua:76>
  - root_dir: <function @/home/islamux/.vim/plugged/nvim-lspconfig/lsp/eslint.lua:89>
  - settings: {
      codeAction = {
        disableRuleComment = {
          enable = true,
          location = "separateLine"
        },
        showDocumentation = {
          enable = true
        }
      },
      codeActionOnSave = {
        enable = false,
        mode = "all"
      },
      experimental = {
        useFlatConfig = false
      },
      format = true,
      nodePath = "",
      onIgnoredFiles = "off",
      problems = {
        shortenToSingleLine = false
      },
      quiet = false,
      rulesCustomizations = {},
      run = "onType",
      useESLintClass = false,
      validate = "on",
      workingDirectory = {
        mode = "auto"
      }
    }
  - workspace_required: true

- html:
  - cmd: { "vscode-html-language-server", "--stdio" }
  - filetypes: html, templ
  - init_options: {
      configurationSection = { "html", "css", "javascript" },
      embeddedLanguages = {
        css = true,
        javascript = true
      },
      provideFormatter = true
    }
  - root_markers: package.json, .git
  - settings: {}

- jsonls:
  - cmd: { "vscode-json-language-server", "--stdio" }
  - filetypes: json, jsonc
  - init_options: {
      provideFormatter = true
    }
  - root_markers: .git

- tailwindcss:
  - before_init: <function @/home/islamux/.vim/plugged/nvim-lspconfig/lsp/tailwindcss.lua:98>
  - cmd: { "tailwindcss-language-server", "--stdio" }
  - filetypes: aspnetcorerazor, astro, astro-markdown, blade, clojure, django-html, htmldjango, edge, eelixir, elixir, ejs, erb, eruby, gohtml, gohtmltmpl, haml, handlebars, hbs, html, htmlangular, html-eex, heex, jade, leaf, liquid, markdown, mdx, mustache, njk, nunjucks, php, razor, slim, twig, css, less, postcss, sass, scss, stylus, sugarss, javascript, javascriptreact, reason, rescript, typescript, typescriptreact, vue, svelte, templ
  - root_dir: <function @/home/islamux/.vim/plugged/nvim-lspconfig/lsp/tailwindcss.lua:110>
  - settings: {
      tailwindCSS = {
        classAttributes = { "class", "className", "class:list", "classList", "ngClass" },
        includeLanguages = {
          eelixir = "html-eex",
          elixir = "phoenix-heex",
          eruby = "erb",
          heex = "phoenix-heex",
          htmlangular = "html",
          templ = "html"
        },
        lint = {
          cssConflict = "warning",
          invalidApply = "error",
          invalidConfigPath = "error",
          invalidScreen = "error",
          invalidTailwindDirective = "error",
          invalidVariant = "error",
          recommendedVariantOrder = "warning"
        },
        validate = true
      }
    }
  - workspace_required: true

- ts_ls:
  - cmd: { "typescript-language-server", "--stdio" }
  - commands: {
      ["editor.action.showReferences"] = <function 1>
    }
  - filetypes: javascript, javascriptreact, javascript.jsx, typescript, typescriptreact, typescript.tsx
  - handlers: {
      ["_typescript.rename"] = <function 1>
    }
  - init_options: {
      hostInfo = "neovim"
    }
  - on_attach: <function @/home/islamux/.vim/plugged/nvim-lspconfig/lsp/ts_ls.lua:111>
  - root_dir: <function @/home/islamux/.vim/plugged/nvim-lspconfig/lsp/ts_ls.lua:56>


vim.lsp: File Watcher ~
- file watching "(workspace/didChangeWatchedFiles)" disabled on all clients

vim.lsp: Position Encodings ~
- No active clients

