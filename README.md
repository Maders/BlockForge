This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

Before you start, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

## Getting Started

first clone the repo and navigate to the project directory.
Install the project dependencies.

```bash
pnpm  install
```

run the development server:

```bash
pnpm  run  dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

# Tasks

### Requested features:

- [x] Editor mode (`/editor`)
- [x] Viewer mode (`/view`)
- [x] Ability to add two type of Presentation blocks (Image and Text)
- [x] Ability to add one Input blocks (Text input)
- [x] Navbar for navigation through blocks
- [x] Ability to Remove, Reorder blocks in Editor mode

### Extra features:

- [x] Ability to edit each block in Editor mode
- [x] Shareable link for each created wall (`/share/:hash`)
- [x] Theme based design +(Light/Dark mode)
