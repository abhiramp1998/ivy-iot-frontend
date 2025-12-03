# IoT Platform Frontend (React + Tailwind)

The dashboard visualization for the IVY Tech IoT Platform. It provides a real-time interface for operators to monitor fleet health, visualize telemetry data, and configure alert thresholds dynamically.

## 🛠️ Tech Stack
* **Framework:** React 18
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios
* **Hosting:** Azure Static Web Apps

---

## Getting Started

### Prerequisites
* Node.js (v18+) installed

1. Installation
Navigate to the frontend directory and install dependencies:
```bash
cd iot-platform-frontend
npm install

2. Configuration (Connecting to Backend)
The frontend needs to know where the API is running. Open src/api/deviceApi.js and check the API_URL constant.

For Local Development:

JavaScript

// src/api/deviceApi.js
const API_URL = 'http://localhost:3000/api'; 
For Azure Production: Update this URL to point to your deployed Azure App Service before building:

JavaScript

const API_URL = '[https://your-app-service-name.azurewebsites.net/api](https://your-app-service-name.azurewebsites.net/api)';
3. Running the App
Start the development server:

Bash

npm run dev
The dashboard will launch at http://localhost:5173.

Project Structure
src/api/: Centralized API calls (fetchDevices, fetchTelemetry, updateDevice).

src/pages/:

DeviceListPage.jsx: Main dashboard with fleet summary widgets and the "Add Device" form.

DeviceDetailPage.jsx: Deep-dive analysis view showing telemetry history tables and the configuration form.

src/components/: Reusable UI elements (Card, Button, Table, Badge) built with Tailwind CSS.