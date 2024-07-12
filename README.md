
# HealthConnect: An Integrated Health Management App

## Overview

HealthConnect is a web (mobile) application designed to empower individuals to manage their health effectively. The app focuses on providing a seamless appointment booking experience with optional dial-in translation services to ensure users can communicate effectively with healthcare professionals.

## Features

- **Appointment Booking**: Users can schedule appointments with healthcare professionals, including doctors, nutritionists, and fitness trainers. The platform provides an easy-to-use interface for selecting available time slots and booking appointments.
- **Dial-In Translation Services**: Users have the option to include translation services during their appointments. This ensures clear communication between the user and the healthcare professional, regardless of language barriers.
- **Future Feature - Telehealth Services**: Users can conduct virtual consultations via video with healthcare professionals and receive prescriptions or personalized treatment plans within the app.
- **Future Feature - Health Education Resources**: Offers a library of articles, videos, and interactive modules covering various health topics, empowering users to make informed decisions about their well-being.
- **Future Feature - Community Support**: A supportive community where users can share their experiences, tips, and encouragement with fellow members. This feature promotes accountability and motivation for achieving health goals.
- **Future Feature - Health Data Tracking**: Plans to enable users to input and track various health metrics such as physical activity, nutrition intake, sleep patterns, medication adherence, and vital signs (heart rate, blood pressure, blood sugar levels, etc.).
- **Future Feature - Personalized Health Insights**: Machine learning algorithms to analyze user data and provide personalized insights and recommendations such as lifestyle changes, reminders for medication intake, and alerts for potential health risks based on the user's health data.

## Target Market

HealthConnect targets individuals of all ages who proactively manage their health and well-being. The primary target demographics include health-conscious individuals, chronic disease patients, fitness enthusiasts, and individuals seeking convenient access to healthcare services.

## Tech Stack

This project leverages a powerful combination of React and Node.js, along with a suite of dependencies designed to enhance functionality, security, and user experience. This ensures that the app is not only scalable and efficient but also secure and easy to use for all users.

### Frontend

- **React**: Enables a dynamic and responsive experience with its component-based architecture.
- **TypeScript**: Adds static types to JavaScript, improving developer productivity and code quality.
- **Vite**: Provides a fast development environment with next-generation frontend tooling.
- **Tailwind CSS**: Utility-first CSS framework configured with custom screen sizes, font families, colors, and box shadows.
- **Bootstrap**: Another CSS framework used to style the application.

### Backend

- **Node.js**: Provides a scalable and efficient server-side solution with an event-driven architecture to handle numerous simultaneous connections.

#### Dependencies

- **Axios**: Utilized for making HTTP requests from the frontend to the backend services.
- **Bcryptjs**: Ensures the security of user data through hashing and salting of passwords.
- **Body-parser**: Middleware for parsing incoming request bodies.
- **Cors**: Enables Cross-Origin Resource Sharing (CORS).
- **Dotenv**: For loading environment variables.
- **Express**: A fast, unopinionated, minimalist web framework for building RESTful APIs.
- **Jsonwebtoken (JWT)**: Implements JSON Web Tokens for secure transmission of information.
- **MySQL2**: A MySQL client for Node.js focused on performance.
- **Nodemon**: Simplifies development by automatically restarting the server.
- **Sequelize**: A promise-based Node.js ORM for various databases including MySQL, providing features like transaction support, relations, eager and lazy loading.
- **React Hook Form**: Simplifies form handling and validation.
- **React Router**: Manages navigation and routing within the application.
- **Chart.js & React-Chartjs-2**: For data visualization and charting.
- **Date-fns & React Datepicker**: For date manipulation and date picking functionalities.

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/michelleschmidt/DPDProject
   ```

2. **Install dependencies for the backend:**

    ```bash
    cd backend
    npm install
    ```

3. **Install dependencies for the frontend:**

    ```bash
    cd ../frontend
    npm install
    npm install vite@latest --save-dev
    ```

    To open the frontend in developer mode do `npx vite` from the frontend directory and the page opens automatically. otherwise, run `npm start`

4. **Set up environment variables:**
   - The backend uses some APIs which cannot be disclosed and as such, cannot work properly without the required credentials.

5. **Run the backend server:**

   ```bash
   cd backend
   npm run dev (in development mode)
   ```

HealthConnect aims to revolutionize the way individuals manage their health by providing a comprehensive, user-friendly platform for appointment booking and telehealth services with optional translation support. Join us in making healthcare management accessible and efficient for everyone
