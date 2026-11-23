# DevTrack – Developer Project Management Dashboard

A responsive project management dashboard built with React, TypeScript, and Tailwind CSS. DevTrack helps developers organize projects, manage tasks, track progress, and manage team members through a clean and interactive interface.

## Features

### Dashboard
- Overview of total projects and tasks
- Task completion statistics
- Recent projects and activity

### Project Management
- Create, edit, and delete projects
- Search and filter projects
- Sort projects
- Persistent data using localStorage

### Task Management
- Create, edit, and delete tasks
- Search and filter tasks
- Sort tasks by due date
- Manage task priorities and statuses

### Kanban Board
- Four task columns: Todo, In Progress, Review, and Done
- Drag-and-drop task management
- Automatic task status updates

### Team Management
- Add, edit, and delete team members
- Search, filter, and sort members
- Individual member profile pages

### Settings
- Edit profile information
- Application preferences
- Light and dark mode
- Password form validation (demo only)

### Additional Features
- Responsive layout for desktop and mobile
- Profile dropdown
- Toast notifications
- Custom delete confirmation dialogs
- Data persistence using localStorage

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Context API
- Lucide React
- dnd-kit
- localStorage

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shambhavipandey1612/devtrack.git
```

### 2. Navigate to the project folder

```bash
cd devtrack
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### 5. Create a production build

```bash
npm run build
```

## Data Storage

DevTrack currently uses browser localStorage to persist projects, tasks, team members, profile details, and application preferences.

This is a frontend project and does not currently use a backend authentication system or database.

## Future Improvements

- Backend and database integration
- User authentication
- Real notification system
- Team collaboration features
- Cloud data synchronization

## Author

**Shambhavi Pandey**

GitHub: [@shambhavipandey1612](https://github.com/shambhavipandey1612)

---

Built as a hands-on frontend development project.