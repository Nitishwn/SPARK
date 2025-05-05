# Spark 🅿️⚡

Welcome to SPARK ( Smart Parking and Autonomous Real-time Kinetics)! This project is a full-stack application designed to provide real-time parking spot availability information with a clean user interface and a scalable backend.

![Spark1](https://github.com/user-attachments/assets/2a98190d-8f61-4861-b750-1527568484b4)


## 📌 Features

* 🔐 **Secure Authentication** User login and registration system.
* 📍 **Real-time Availability** See live updates on parking spot status.
* 🌍 **SPARK utilizes** IoT, AI, and ADAS to enable:  
* 🌐 **Real-time** spot detection using smart sensors.  
* ✨ **Mobile-based** guidance for non-ADAS vehicles.  
* 📊 **Clean Dashboard UI:** Intuitive interface built with React and Tailwind CSS.
* 📦 **Type-safe Database Operations:** Leveraging Drizzle ORM for reliable data handling.

![Spark2](https://github.com/user-attachments/assets/58e4c81f-e2a7-45d9-9dc0-d964d9e0367d)
![WhatsApp Image 2025-03-25 at 23 47 29_8e06541d](https://github.com/user-attachments/assets/47d3786a-2939-44d5-9d78-7de201f9d763)


## ✨ Tech Stack

* **Frontend:** React, Vite, TypeScript, Tailwind CSS
* **Backend:** Node.js, Express.js, TypeScript
* **Database:** Drizzle ORM (with a compatible database like PostgreSQL, MySQL, SQLite)
* **Shared:** TypeScript for shared types/interfaces



## 🚀 Getting Started

### Prerequisites

* Node.js (LTS version recommended)
* npm or yarn
* A database compatible with your Drizzle setup (e.g., PostgreSQL) running.
* Environment variables configured (see `.env.example` if available - *you might need to create this*).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/SmartSparkParking.git](https://github.com/your-username/SmartSparkParking.git)
    cd SmartSparkParking
    ```
    *(Replace `your-username` with the actual username/organization)*

2.  **Install Root Dependencies (if any):**
    * If your root `package.json` manages workspaces or has shared dev dependencies:
        ```bash
        npm install
        ```

3.  **Install Server Dependencies:**
    ```bash
    cd server
    npm install
    ```

4.  **Install Client Dependencies:**
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

You'll typically need to run the backend server and the frontend development server separately.

1.  **Run the Backend Server:**
    * Navigate to the server directory: `cd ../server` (if you are in `client`) or `cd server` (if you are in the root).
    * Start the server (check your `server/package.json` for the exact script name, `dev` is common):
        ```bash
        npm run dev
        ```
    * The backend API should now be running (typically on `http://localhost:3000` or another port specified in your server code).

2.  **Run the Frontend Development Server:**
    * Navigate to the client directory: `cd ../client` (if you are in `server`) or `cd client` (if you are in the root).
    * Start the Vite dev server:
        ```bash
        npm run dev
        ```
    * The frontend UI should now be accessible in your browser (typically at `http://localhost:5173` as specified by Vite's default).

## 🌐 Usage

* Access the frontend UI by navigating to `http://localhost:5173` (or the port shown in the terminal when running `npm run dev` in the `client` directory).
* The backend API endpoints are available at `http://localhost:3000` (or the port configured in your `server` code).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

