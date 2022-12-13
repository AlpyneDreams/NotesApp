# Noteify

GitHub: https://github.com/AlpyneDreams/NotesApp

## Usage

You will need Node.js installed.

You may use npm but the project was developed with [yarn](https://yarnpkg.com/), so use that if you have any issues.

To run:
```
yarn install
yarn start
```
(or npm equivalent)

Notebooks are stored as subfolders of the `notes` folder in the pwd.

## Features

Implemented
- Organize markdown notes in notebooks linked to folders
- Apply all the core types of markdown formatting
- Paste images directly from your clipboard
- Search note contents for keywords or phrases
- Code blocks with syntax highlighting
- LaTeX math rendering
- Open multiple tabs

Planned
- Dark Mode - wip on `dark-theme` branch
- Note Categories
- Sticky Notes view
- Tables
- Autosave
- Notebook icons
- Encrypted notebooks
- Sorting notes

## Libraries Used

Detailed info is in `package.json`. Yarn will install all needed dependencies for you.

The main ones are:
- [Electron](https://www.electronjs.org/)
    - Electron Forge
        - makers: deb, rpm, squirrel, zip
        - plugin-webpack
    - electron-squirrel-startup
- [React.js](https://reactjs.org/)
    - react-dom
    - [react-reorder](https://www.npmjs.com/package/react-reorder)
- [markdown-it](https://github.com/sindresorhus/github-markdown-css)
    - markdown-it-front-matter
    - markdown-it-highlightjs
        - [Highlight.js](https://highlightjs.org/)
    - markdown-it-katex
        - [KaTeX](https://katex.org/)
- [turndown](https://github.com/mixmark-io/turndown)
- [Webpack](https://webpack.js.org/)
- [hotkeys.js](https://wangchujiang.com/hotkeys/)


<details>
<summary>Webpack plugins used: (mainly: sass, pug, babel)</summary>

- css-loader
- file-loader
- extract-loader
- node-loader
- pug-loader
    - [pug](https://pugjs.org/api/getting-started.html)
- react-refresh
    - @pmmmwh/react-refresh-webpack-plugin
- resolve-url-loader
- sass-loader
    - [sass](https://sass-lang.com/)
- babel-loader
    - [Babel](https://babeljs.io/)
    - bable-plugin-transform-react-pug
- @vercel/webpack-asset-relocator-loader
</details><br>

Bundled dependencies (not managed by yarn):
- [Photon](https://photonkit.com/)
- [Bootstrap](https://getbootstrap.com/)
- [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)
- [Font: Inter](https://fonts.google.com/specimen/Inter)
