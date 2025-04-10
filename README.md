# Todo List

## Description

This is a simple task management app that allows users to organise their tasks into different projects. It provides the ability to:

- Create and view multiple projects
- View all tasks within each project
- Expand a task to see and edit its details
- Delete tasks and projects
- Filter and view tasks based on:
  - Due today
  - Due within the next 7 days
  - Marked as completed

The app uses the Web Storage API to persist data across page reloads, ensuring that your tasks and projects are saved even after closing and reopening the app.

![A screenshot of the layout of the task management app](app-screenshot.png "App Layout (1920x1080)")

## Technologies/Tools

- HTML: Structure of the app
- CSS: Styling and layout
- JavaScript: Core functionality and interactions
- date-fns: Library for formatting and manipulating dates

## Installation

To get started with the project:

1. Clone the repo:

```bash
git clone https://github.com/ZohairGandhi/todo-list.git
```

2. Navigate to the project directory:

```bash
cd todo-list
```

3. Install the required dependencies:

```bash
npm install
```

## Usage

To launch the app locally, run the following command:

```bash
npm run start
```

This will start a local server and open the app in your browser.

Alternatively, the app is also deployed on GitHub Pages, and you can use it directly without any installation. Simply visit the [live link](https://zohairgandhi.github.io/todo-list/) here.
