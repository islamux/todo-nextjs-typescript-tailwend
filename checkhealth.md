
==============================================================================
lspconfig:                                                                  ✅

- `:checkhealth lspconfig` was removed. Use `:checkhealth vim.lsp` instead.

==============================================================================
luasnip:                                                                  1 ⚠️

luasnip ~
- ⚠️ WARNING For Variable/Placeholder-transformations, luasnip requires
      the jsregexp library. See `:help |luasnip-lsp-snippets-transformations`| for advice
  

==============================================================================
mason:                                                                    5 ⚠️

mason.nvim ~
- ✅ OK mason.nvim version v2.0.1
- ✅ OK PATH: prepend
- ✅ OK Providers: 
    mason.providers.registry-api
    mason.providers.client
- ✅ OK neovim version >= 0.10.0

mason.nvim [Registries] ~
- ✅ OK Registry `github.com/mason-org/mason-registry version: 2025-09-10-rear-talon` is installed.

mason.nvim [Core utils] ~
- ✅ OK unzip: `UnZip 6.00 of 20 April 2009, by Debian. Original by Info-ZIP.`
- ✅ OK wget: `GNU Wget 1.21.3, a non-interactive network retriever.`
- ✅ OK curl: `curl 7.88.1 (x86_64-pc-linux-gnu) libcurl/7.88.1 OpenSSL/3.0.17 zlib/1.2.13 brotli/1.0.9 zstd/1.5.4 libidn2/2.3.3 libpsl/0.21.2 (+libidn2/2.3.3) libssh2/1.10.0 nghttp2/1.52.0 librtmp/2.3 OpenLDAP/2.5.13`
- ✅ OK gzip: `gzip 1.12`
- ✅ OK tar: `tar (GNU tar) 1.34`
- ✅ OK bash: `GNU bash, version 5.2.15(1)-release (x86_64-pc-linux-gnu)`
- ✅ OK sh: `Ok`

mason.nvim [Languages] ~
- ⚠️ WARNING luarocks: not available
  - ADVICE:
    - spawn: luarocks failed with exit code - and signal -. Could not find executable "luarocks" in PATH.

- ⚠️ WARNING Ruby: not available
  - ADVICE:
    - spawn: ruby failed with exit code - and signal -. Could not find executable "ruby" in PATH.

- ⚠️ WARNING RubyGem: not available
  - ADVICE:
    - spawn: gem failed with exit code - and signal -. Could not find executable "gem" in PATH.

- ⚠️ WARNING Composer: not available
  - ADVICE:
    - spawn: composer failed with exit code - and signal -. Could not find executable "composer" in PATH.

- ✅ OK Go: `go version go1.19.8 linux/amd64`
- ✅ OK node: `v22.17.1`
- ✅ OK java: `openjdk version "17.0.16" 2025-07-15`
- ⚠️ WARNING julia: not available
  - ADVICE:
    - spawn: julia failed with exit code - and signal -. Could not find executable "julia" in PATH.

- ✅ OK PHP: `PHP 8.2.29 (cli) (built: Jul  3 2025 16:16:05) (NTS)`
- ✅ OK python: `Python 3.11.2`
- ✅ OK cargo: `cargo 1.88.0 (873a06493 2025-05-10)`
- ✅ OK npm: `11.5.2`
- ✅ OK javac: `javac 17.0.16`
- ✅ OK pip: `pip 23.0.1 from /usr/lib/python3/dist-packages/pip (python 3.11)`
- ✅ OK python venv: `Ok`

==============================================================================
mason-lspconfig:                                                            ✅

mason-lspconfig.nvim ~
- ✅ OK Neovim v0.11
- ✅ OK mason.nvim v2

==============================================================================
nvim-treesitter:                                                          1 ⚠️

Installation ~
- ⚠️ WARNING `tree-sitter` executable not found (parser generator, only needed for :TSInstallFromGrammar, not required for :TSInstall)
- ✅ OK `node` found v22.17.1 (only needed for :TSInstallFromGrammar)
- ✅ OK `git` executable found.
- ✅ OK `cc` executable found. Selected from { vim.NIL, "cc", "gcc", "clang", "cl", "zig" }
  Version: cc (Debian 12.2.0-14+deb12u1) 12.2.0
- ✅ OK Neovim was compiled with tree-sitter runtime ABI version 15 (required >=13). Parsers must be compatible with runtime ABI.

OS Info:
{
  machine = "x86_64",
  release = "6.1.0-38-amd64",
  sysname = "Linux",
  version = "#1 SMP PREEMPT_DYNAMIC Debian 6.1.147-1 (2025-08-02)"
} ~

Parser/Features         H L F I J
  - bash                ✓ ✓ ✓ . ✓
  - c                   ✓ ✓ ✓ ✓ ✓
  - css                 ✓ . ✓ ✓ ✓
  - dart                ✓ ✓ ✓ ✓ ✓
  - html                ✓ ✓ ✓ ✓ ✓
  - javascript          ✓ ✓ ✓ ✓ ✓
  - json                ✓ ✓ ✓ ✓ .
  - jsonc               ✓ ✓ ✓ ✓ ✓
  - lua                 ✓ ✓ ✓ ✓ ✓
  - markdown            ✓ . ✓ ✓ ✓
  - markdown_inline     ✓ . . . ✓
  - query               ✓ ✓ ✓ ✓ ✓
  - tsx                 ✓ ✓ ✓ ✓ ✓
  - typescript          ✓ ✓ ✓ ✓ ✓
  - vim                 ✓ ✓ ✓ . ✓
  - vimdoc              ✓ . . . ✓

  Legend: H[ighlight], L[ocals], F[olds], I[ndents], In[j]ections
         +) multiple parsers found, only one will be used
         x) errors found in the query, try to run :TSUpdate {lang} ~

==============================================================================
vim.deprecated:                                                             ✅

- ✅ OK No deprecated functions detected

==============================================================================
vim.health:                                                                 ✅

Configuration ~
- ✅ OK no issues found

Runtime ~
- ✅ OK $VIMRUNTIME: /tmp/.mount_nvimNFffAh/usr/share/nvim/runtime

Performance ~
- ✅ OK Build type: Release

Remote Plugins ~
- ✅ OK Up to date

terminal ~
- key_backspace (kbs) terminfo entry: `key_backspace=\177`
- key_dc (kdch1) terminfo entry: `key_dc=\E[3~`
- $VTE_VERSION="7006"
- $COLORTERM="truecolor"

External Tools ~
- ✅ OK ripgrep 13.0.0 (/usr/bin/rg)

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

==============================================================================
vim.provider:                                                             5 ⚠️

Clipboard (optional) ~
- ✅ OK Clipboard tool found: xclip

Node.js provider (optional) ~
- Node.js: v22.17.1

- ⚠️ WARNING Missing "neovim" npm (or yarn, pnpm) package.
  - ADVICE:
    - Run in shell: npm install -g neovim
    - Run in shell (if you use yarn): yarn global add neovim
    - Run in shell (if you use pnpm): pnpm install -g neovim
    - You may disable this provider (and warning) by adding `let g:loaded_node_provider = 0` to your init.vim

Perl provider (optional) ~
- ⚠️ WARNING "Neovim::Ext" cpan module is not installed
  - ADVICE:
    - See :help |provider-perl| for more information.
    - You can disable this provider (and warning) by adding `let g:loaded_perl_provider = 0` to your init.vim
- ⚠️ WARNING No usable perl executable found

Python 3 provider (optional) ~
- `g:python3_host_prog` is not set. Searching for python3 in the environment.
- Executable: /usr/bin/python3
- Python version: 3.11.2
- pynvim version: 0.4.2 (outdated; from /usr/lib/python3/dist-packages/neovim)
- ⚠️ WARNING Latest pynvim is NOT installed: 0.6.0

Python virtualenv ~
- ✅ OK no $VIRTUAL_ENV

Ruby provider (optional) ~
- ⚠️ WARNING `ruby` and `gem` must be in $PATH.
  - ADVICE:
    - Install Ruby and verify that `ruby` and `gem` commands work.

==============================================================================
vim.treesitter:                                                             ✅

Treesitter features ~
- Treesitter ABI support: min 13, max 15
- WASM parser support: false

Treesitter parsers ~
- ✅ OK Parser: bash                 ABI: 14, path: /home/islamux/.vim/plugged/nvim-treesitter/parser/bash.so
- ✅ OK Parser: c                    ABI: 15, path: /tmp/.mount_nvimNFffAh/usr/lib/nvim/parser/c.so
- ✅ OK Parser: css                  ABI: 14, path: /home/islamux/.vim/plugged/nvim-treesitter/parser/css.so
- ✅ OK Parser: dart                 ABI: 14, path: /home/islamux/.vim/plugged/nvim-treesitter/parser/dart.so
- ✅ OK Parser: html                 ABI: 14, path: /home/islamux/.vim/plugged/nvim-treesitter/parser/html.so
- ✅ OK Parser: javascript           ABI: 14, path: /home/islamux/.vim/plugged/nvim-treesitter/parser/javascript.so
- ✅ OK Parser: json                 ABI: 14, path: /home/islamux/.vim/plugged/nvim-treesitter/parser/json.so
- ✅ OK Parser: jsonc                ABI: 13, path: /home/islamux/.vim/plugged/nvim-treesitter/parser/jsonc.so
- ✅ OK Parser: lua                  ABI: 15, path: /tmp/.mount_nvimNFffAh/usr/lib/nvim/parser/lua.so
- ✅ OK Parser: markdown             ABI: 14, path: /home/islamux/.vim/plugged/nvim-treesitter/parser/markdown.so
- ✅ OK Parser: markdown             ABI: 14, path: /tmp/.mount_nvimNFffAh/usr/lib/nvim/parser/markdown.so
- ✅ OK Parser: markdown_inline      ABI: 15, path: /tmp/.mount_nvimNFffAh/usr/lib/nvim/parser/markdown_inline.so
- ✅ OK Parser: query                ABI: 15, path: /tmp/.mount_nvimNFffAh/usr/lib/nvim/parser/query.so
- ✅ OK Parser: tsx                  ABI: 14, path: /home/islamux/.vim/plugged/nvim-treesitter/parser/tsx.so
- ✅ OK Parser: typescript           ABI: 14, path: /home/islamux/.vim/plugged/nvim-treesitter/parser/typescript.so
- ✅ OK Parser: vim                  ABI: 14, path: /home/islamux/.vim/plugged/nvim-treesitter/parser/vim.so
- ✅ OK Parser: vim                  ABI: 14, path: /tmp/.mount_nvimNFffAh/usr/lib/nvim/parser/vim.so
- ✅ OK Parser: vimdoc               ABI: 14, path: /home/islamux/.vim/plugged/nvim-treesitter/parser/vimdoc.so
- ✅ OK Parser: vimdoc               ABI: 14, path: /tmp/.mount_nvimNFffAh/usr/lib/nvim/parser/vimdoc.so

