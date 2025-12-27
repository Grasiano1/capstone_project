🌍 Currency Converter Capstone Project
A high-performance, responsive Currency Converter built with React and Vanilla CSS. This application serves as a frontend capstone project, demonstrating API integration, state management, and modern UI/UX design principles.

📌 Project Overview
The goal of this project is to create a tool that allows users to convert between global currencies using real-time exchange rates. It features a modern "Glassmorphism" interface and provides a seamless user experience across mobile and desktop devices.

Key Functional Requirements:
Live Exchange Rates: Fetches data from the ExchangeRate-API.

Dynamic Conversion: Automatically calculates values based on user input.

Currency Swapping: Instant toggling between "From" and "To" currencies.

Responsive UI: A layout that adapts to any screen size.

🛠️ Technical Breakdown
1. The Tech Stack
Framework: React (Vite)

Data Fetching: Axios

Styling: Vanilla CSS (Internal Styles for zero-dependency issues)

API: ExchangeRate-API

2. Component Logic
The application uses a centralized state pattern to ensure data consistency:

amount: Tracks the user's input.

from / to: Tracks selected currency codes.

rates: Stores the conversion mapping fetched from the API.

🚀 Step-by-Step Installation
Initialize the Project:

Bash

npm create vite@latest my-converter -- --template react
cd my-converter
npm install axios
Implementation: Replace the contents of src/App.jsx with the provided "All-in-One" code block. This contains both the React logic and the CSS styles to ensure a smooth build without configuration errors.

Run the App:

Bash

npm run dev
🎨 Design Features
Glassmorphism: We used backdrop-filter: blur(12px) to create a premium, semi-transparent card effect.

CSS-in-JS: Styles are encapsulated within the file to prevent global scope conflicts and ensure the UI looks identical in every environment.

User Feedback: Includes hover states for buttons and disabled states for result fields to prevent accidental user error.

🔌 API Integration Details
The app communicates with the following endpoint: https://v6.exchangerate-api.com/v6/[API_KEY]/latest/[BASE_CURRENCY]

Error Handling Strategy:
Network Errors: Uses .catch() to log errors and alert the user if the service is unreachable.

Input Validation: Ensures only numeric values are processed to prevent app crashes.

🏆 Project Submission Checklist
[x] Fetch exchange rates from Public API.

[x] Implement "From" and "To" dropdowns.

[x] Create a responsive layout.

[x] Implement Swap functionality.

[x] Handle API errors gracefully.

Developer: [Grasiano Dery]

API Key: 852bee8379b697f07ae61374.

License: MIT