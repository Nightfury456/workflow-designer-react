<img width="1902" height="970" alt="image" src="https://github.com/user-attachments/assets/8c3bf1a5-57d0-4cda-af7a-97b4883edb29" />
# 🚀 HR Workflow Designer (React + React Flow)

## 📌 Overview

This project is a visual workflow designer that allows users to create, configure, and simulate HR workflows such as onboarding, approvals, and automated processes.

It is built as a prototype to demonstrate modular frontend architecture, dynamic UI handling, and workflow simulation using a node-based system.

---

## ✨ Features

### 🧩 Workflow Canvas

* Interactive node-based canvas using React Flow
* Create and connect workflow steps visually
* Pan, zoom, and manage graph structure

### 🔘 Node Types

* Start Node (entry point)
* Task Node (manual task handling)
* Approval Node (role-based approval)
* Automated Node (system actions)
* End Node (workflow completion)

### ⚙️ Node Configuration Panel

* Click a node to edit its properties
* Dynamic forms based on node type
* Real-time updates reflected on canvas

### 🔄 Workflow Simulation

* Execute workflow using "Run Workflow"
* Generates step-by-step execution logs
* Simulates real workflow behavior in a sandbox

---

## 🧠 Architecture

The application follows a modular and scalable frontend structure:

* **React Flow** handles graph rendering and interactions
* **State management** using React hooks (`useState`)
* **Dynamic forms** rendered conditionally based on node type
* **Separation of concerns** between UI, logic, and simulation

---

## ⚙️ Tech Stack

* React (Vite)
* React Flow
* JavaScript (ES6+)
* CSS (basic styling)

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/Nightfury456/hr-workflow-designer.git
cd hr-workflow-designer
npm install
npm run dev
```

Then open:

```
http://localhost:5173/
```

---

## 📌 Key Design Decisions

* Used React Flow for scalable and flexible graph-based UI
* Kept node data structure extensible for future enhancements
* Implemented controlled inputs for predictable state updates
* Simulation logic designed to be lightweight and extendable

---

## 🐞 Challenges & Learnings

* Faced a React Flow compatibility issue ("Invalid hook call")
* Debugged using browser console and resolved version mismatch (React 18 + React Flow v11)
* Gained deeper understanding of dependency management and React internals

---

## 🚧 Future Improvements

* Drag-and-drop nodes from sidebar
* Workflow validation (cycle detection, missing links)
* Export/Import workflows as JSON
* Backend integration for persistence
* Improved UI using Tailwind or design system

---

## 👨‍💻 Author

Aditya

---

## ⭐ If you like this project

Feel free to star the repository and share feedback!
