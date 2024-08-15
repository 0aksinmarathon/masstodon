# MassTodon (WIP)

## Introduction

MassTodon is a TODO-based social networking service.
Basic MassTodon functionalities includes following:

- Manage your TODOs like usual task management tools
  - Creating TODOs
  - Edit TODOs
  - Set progress rate
  - Set start date, end date and due date
  - Set Status
  - View TODOs in a kanban or a list
- Connect with other users through Follow system as in X (Twitter, previously):
  - Find Other users' TODOs with tags
  - Follow users with interesting TODOs
  - Support other users to achieve their TODOs through Like and Comments
  - View other users' TODOs as a guest account

## Technologies

- Frontend
  - React
  - tailwind CSS
  - scss
  - State Management
    - reduxjs-toolkit
  - Dependency Injection
    - tsyringe
- DB, API
  - supabase (https://supabase.com/)
    - Managed Backend Service (postgres-based)
- User Authentication, Authorization
  - Firebase Auth

## Architecture

- To minimize influence of the change of specific factors such as DB and DB-related logics implementation on more essential and abstract business logics, clean-architecture like repository architecture pattern is adopted.
  - Communication with API can be done only via repositories, which implement corresponding interfaces.
- As recommended in reduxjs-toolkit, stores are divided by a unit called slice, according to functionalities.

## Environment Setup

### Install fnm

[fnm github](https://github.com/Schniz/fnm)

```bash
fnm install 20.8.1
```

### Install pnpm

[pnpm website](https://pnpm.io)

```bash
corepack enable
corepack prepare pnpm@8.9.2 --activate
```

### Install npm packages

```bash
pnpm run ci
```

### Run Debugging

```bash
pnpm run dev
```
