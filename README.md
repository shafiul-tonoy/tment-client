# Task Management Application

## Overview
This Task Management Application allows users to efficiently manage their tasks by adding, editing, deleting, and reordering them using a drag-and-drop interface. The tasks are categorized into three sections: **To-Do, In Progress, and Done**. All changes are saved instantly to the database to ensure persistence.

The application features authentication using Firebase, real-time synchronization, and a responsive, modern UI built with React and Vite.js.

## Features
### 1. Authentication
- Only authenticated users can access the app.
- Uses **Firebase Authentication** (Google Sign-in).
- Upon first login, the user details (User ID, email, and display name) are stored in the database.

### 2. Task Management System
- Users can **add, edit, delete, and reorder tasks**.
- Tasks belong to one of the three categories:
  - **To-Do**
  - **In Progress**
  - **Done**
- Tasks can be dragged and dropped between categories.
- Users can reorder tasks within a category.
- **Instant syncing** ensures all changes persist in real-time.
- Each task consists of:
  - **Title** (Required, max 50 characters)
  - **Description** (Optional, max 200 characters)
  - **Timestamp** (Auto-generated upon creation)
  - **Category** (To-Do, In Progress, Done)

### 3. Database & Persistence
- Uses **MongoDB** (via an Express.js server) to store tasks.
- Ensures real-time updates, maintaining task order on refresh.
- When a task is deleted, it is **permanently removed** from the database.

#### Real-Time Synchronization Approaches:
- **MongoDB Change Streams**: Listens for real-time database changes.
- **WebSockets**: Pushes real-time updates to the frontend.
- **Optimistic UI Updates**: Instantly updates the UI before syncing with the backend.
- **Polling**: Periodic fetching as a fallback.

### 4. Frontend UI
- Built using **Vite.js + React**.
- Uses a **drag-and-drop** library (**react-beautiful-dnd** or an alternative).
- Modern, clean, and responsive design.
- UI limited to a **maximum of four colors** for a minimalistic appearance.

### 5. Responsiveness
- The application works smoothly on both **desktop and mobile**.
- Optimized for a mobile-friendly **drag-and-drop** experience.

### 6. Backend API
Built using **Express.js** with MongoDB for data storage.
#### Endpoints:
- `POST /tasks` – **Add a new task**
- `GET /tasks` – **Retrieve all tasks for the logged-in user**
- `PUT /tasks/:id` – **Update task details** (title, description, category)
- `DELETE /tasks/:id` – **Delete a task**

## Installation & Setup
### Prerequisites:
Ensure you have the following installed:
- **Node.js** (v16+ recommended)
- **MongoDB**
- **Firebase Project** (for authentication)

### Backend Setup:
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd task-management-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   FIREBASE_API_KEY=<your-firebase-api-key>
   ```
4. Start the backend server:
   ```sh
   npm run server
   ```

### Frontend Setup:
1. Navigate to the frontend folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up Firebase authentication:
   - Add Firebase config in `src/firebase.js`.
4. Start the development server:
   ```sh
   npm run dev
   ```

## Technologies Used
- **Frontend:** Vite.js, React, react-beautiful-dnd
- **Backend:** Express.js, MongoDB
- **Authentication:** Firebase (Google Sign-In)
- **Real-Time Sync:** MongoDB Change Streams, WebSockets, Optimistic UI
- **Styling:** CSS, Tailwind (optional)

## Future Improvements
- Add **task due dates and priority levels**.
- Implement **collaborative task management** (multiple users per task).
- Introduce **notifications** for task updates.

## License
This project is licensed under the MIT License.

## Contributing
Contributions are welcome! Feel free to submit issues and pull requests.

---
**Developed with ❤️ using React, Express, and MongoDB**

