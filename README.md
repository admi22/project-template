# Full-Stack Template Repo

This repository serves as a **template** for my full-stack development setup, featuring a **FastAPI** backend and a **Vue.js (TypeScript)** frontend.

## Getting Started

Follow these steps to set up and run the project:

### 🔹 Backend Setup (FastAPI)
1. Navigate to the backend folder:  
   ```sh
   cd backend
   ```
2. Create a virtual environment:  
   ```sh
   python3 -m venv venv
   ```
3. Activate the virtual environment:   
     ```sh
     source venv/bin/activate
     ```
4. Install dependencies:  
   ```sh
   pip install -r requirements.txt
   ```
5. Run the server:  
   ```sh
   fastapi dev main.py
   ```

### 🔹 Frontend Setup (Vue.js)
1. Navigate to the frontend folder:  
   ```sh
   cd frontend
   ```
2. Install dependencies:  
   ```sh
   npm install
   ```
3. Run the development server:  
   ```sh
   npm run dev
   ```

---

## Tech Stack Overview

### 🔹 Backend (Python + FastAPI)
- **FastAPI** – High-performance web framework for APIs  
- **SQLModel** – ORM for database interaction (built on SQLAlchemy & Pydantic)  
- **SQLite** – Default database (easily replaceable with other databases)  

### 🔹 Frontend (TypeScript + Vue3)
- **Vue 3 (Composition API)** – Modern UI framework  
- **Pinia** – State management  
- **TailwindCSS + DaisyUI** – Styling and UI components  
- **PixiJS** – WebGL-based rendering for custom visualizations  


## Details & Gotchas

### 🔹 Sample Data
For development purposes, the database resets every time the backend restarts. To automatically populate it with sample data, the script **sample_data.py** is used.
This behavior can be modified by adjusting the `lifespan` function in **main.py**.

### 🔹 Automatic TypeScript Types Generation
FastAPI automatically generates API documentation based on the OpenAPI specification, which can be accessed at [`localhost/docs`](http://localhost/docs).
To generate TypeScript types that match the backend models, run:
   ```sh
   npm run generate-types
   ```
This will create type definitions in:
   ```sh
   frontend/src/types/api-types.ts
   ```
For better organization, aliases for these types are maintained in:
   ```sh
   frontend/src/types/types.ts
   ```