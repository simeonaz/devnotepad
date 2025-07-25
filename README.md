# DevTools Notepad

> **Author**: Siméon Azogbonon ([simeonaz.netlify.app](https://simeonaz.netlify.app/))  
> **GitHub Repo**: [https://github.com/simeonaz/devtools-notepad](https://github.com/simeonaz/devtools-notepad)

---

## 🎯 Objective

Build a simple, fast, and local web application that allows a developer to:

- jot down ideas, code snippets, or TODOs while working,
- smartly categorize these notes,
- quickly find them via a filtering system,
- and copy or delete them with a single click.

**Real goal**: Demonstrate my ability to design a useful, UX-friendly, well-structured, and high-performance tool, without a backend.

---

## 📌 Features

1. **Add notes**
   - A form at the top lets you add a note with: title, free content (text or code), category (HTML, CSS, JavaScript, TODO, Others)
   - Each note is instantly stored in `localStorage`

2. **Display and manage notes**
   - List of notes as cards or accordion
   - Shows title, content, and category
   - Buttons: 🗑️ Delete, Edit, 📋 Copy (Clipboard API)
   - Filter by category

<!-- 3. **Light/Dark theme**
   - ☀️🌙 toggle button to switch appearance
   - Choice is saved in `localStorage` -->

3. **Persistence**
   - Data is stored client-side (`localStorage`)
   - No backend required, fast to deploy, offline ready

---

## 🧠 Why is it smart?

- Mimics a real developer need: capture an idea or code snippet without leaving the keyboard
- Minimalist and efficient UX
- Thoughtful features: one-click copy, instant filtering, local save

---

## 💡 Possible improvements

- Export/import notes (JSON)
- Edit existing notes
- Markdown support
- GitHub sync
- Keyboard shortcuts (e.g., Ctrl+Enter to submit)

---

## 🚀 Quick Start

### Installation

```bash
# pnpm
pnpm install

# npm
npm install

# yarn
yarn install
```

### Development

```bash
# pnpm
pnpm dev

# npm
npm run dev

# yarn
yarn dev
```

### Production

```bash
# pnpm
pnpm build
pnpm preview

# npm
npm run build
npm run preview

# yarn
yarn build
yarn preview
```

---

## 📚 Documentation

- [Nuxt Documentation](https://nuxt.com/docs/getting-started/introduction)
- [Nuxt Deployment](https://nuxt.com/docs/getting-started/deployment)

---

**