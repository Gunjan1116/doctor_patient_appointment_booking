
# Doctor Patient Appointment Booking System

The Doctor Patient Appointment Booking System is a web application that allows users to register as doctors or patients, view doctors based on location or specialty, make appointments with doctors, and manage their bookings. The system is built using Node.js, Express.js, and MongoDB.

## Table of Contents
- [Video presentation of Booking System](#video-presentation)
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [API Endpoints](#api-endpoints)
- [Login Credentials](#login-credentials)
- [Dependencies](#dependencies)
- [Deployment Link](#deployment-link)

## Video Presentation
- [Video Presentation Link](https://www.youtube.com/watch?v=luw6D1K9f_c)

## Installation
Video call functionality will not work on deployed link to experience video calling functionality set up project locally.
To set up the Doctor Patient Appointment Booking System, follow these steps:

1. Clone the repository or download the source code files.
2.  Go to the backend folder using command `cd backend`
3. Install the required dependencies by running the following command:command:
   ```
   npm install
   ```
3. Create a `.env` file in the project's root directory and provide the necessary environment variables. The required variables include:
   - `mongoDbUrl`: The URL for connecting to your MongoDB database.
   - `Key`: A secret key used for JWT token generation.
   - `emailPassword`: Password for the email account used to send confirmation emails.

## Usage
To start the Doctor Patient Appointment Booking System, run the following command:
```
  1. npm run server - To run node.js server
  2. peerjs --port 3001 - To Start Peer server
```
Both should be run on two different terminals.

The server will start running at the specified port, and the MongoDB connection will be established. You can then access the different endpoints using a REST client or a web browser.

## Code Structure
The code for the Doctor Patient Appointment Booking System is organized into different files and directories. Here's an overview of the code structure:

- `index.js`: The entry point of the application that sets up the Express.js server and establishes the database connection.
- `config/db.js`: Contains the MongoDB connection configuration.
- `middlewares/authenticationMiddleware.js`: Defines the authentication middleware used to verify JWT tokens and authenticate users.
- `middlewares/authorizationMiddleware.js`: Defines the authorization middleware used to check user roles and restrict access to certain routes.
- `models/bookingModel.js`: Defines the Mongoose schema and model for bookings.
- `models/userModel.js`: Defines the Mongoose schema and model for users (doctors and patients).
- `routes/bookingRoute.js`: Defines the Express.js router for booking-related endpoints.
- `routes/userRoute.js`: Defines the Express.js router for user-related endpoints.

## API Endpoints

## User Endpoints

### Register User
- **Endpoint**: `POST /user/register`
- **Description**: Registers a new user (doctor or patient) in the system.
- **Request Body**:
  - `name` (string): name of the user.
  - `email` (string): Email address of the user.
  - `password` (string): Password for the user's account.
  - `role` (string): Role of the user (`doctor` or `patient`).
  - `specialty` (string, required for doctors): Specialty of the doctor (if the user is a doctor).
  - `location` (string, required for doctors/patient): Location of the user.

### User Login
- **Endpoint**: `POST /user/login`
- **Description**: Authenticates a user and generates a JWT token for subsequent requests.
- **Request Body**:
  - `email` (string): Email address of the user.
  - `password` (string): Password for the user's account.
- **Response**:
  - `token` (string): JWT token for authenticating subsequent requests.

### User Logout
- **Endpoint**: `GET /user/logout`
- **Description**: Logs out a user and blacklists their JWT token.
- **Authorization**: Bearer token (JWT token obtained from user login).
- **Response**: No content.

### Retrieve Doctors
- **Endpoint**: `GET /user/doctors`
- **Description**: Retrieves the details of all doctors in the system.
- **Response**:
  - `doctors` (array): Array of doctor objects with their details.

### Retrieve Doctors by Location
- **Endpoint**: `GET /user/doctors/:location`
- **Description**: Retrieves the details of doctors based on a specific location.
- **Parameters**:
  - `location` (string): Location to filter doctors by.
- **Response**:
  - `doctors` (array): Array of doctor objects in the specified location.

### Retrieve Doctors by Specialty
- **Endpoint**: `GET /user/doctors/specialty/:value`
- **Description**: Retrieves the details of doctors based on a specific specialty.
- **Parameters**:
  - `value` (string): Specialty to filter doctors by.
- **Response**:
  - `doctors` (array): Array of doctor objects with the specified specialty.

## Booking Endpoints

### Create Booking
- **Endpoint**: `POST /booking/create`
- **Description**: Creates a new booking for a patient with a specific doctor.
- **Authorization**: Bearer token (JWT token obtained from user login).
- **Request Body**:
 

 - `doctorId` (string): ID of the doctor for the booking.
  - `bookingDate` (string): Date of the appointment (format: "YYYY-MM-DD").
  - `bookingSlot`(string): TimeSlot of the appointment
- **Response**:
  - `booking` (object): Object containing the details of the created booking.

### Retrieve User Bookings
- **Endpoint**: `GET /booking/user`
- **Description**: Retrieves all bookings made by the authenticated user (patient).
- **Authorization**: Bearer token (JWT token obtained from user login).
- **Response**:
  - `bookings` (array): Array of booking objects made by the user.

### Delete Booking
- **Endpoint**: `DELETE /booking/:id`
- **Description**: Deletes a booking with a specific ID.
- **Authorization**: Bearer token (JWT token obtained from user login).
- **Parameters**:
  - `id` (string): ID of the booking to be deleted.
- **Response**: No content.

Please note that the API requires authentication using JWT tokens for certain endpoints, which can be obtained by logging in as a user.

Note: Some endpoints require authentication and authorization based on user roles.

## Login Credentials
- Doctor details
  - email:  kumargunjan1116@gmail.com,
  - password: 1234
- Patient details
  - email:  vashishtnikhil158@gmail.com,
  - password: 1234

## Dependencies
The Doctor Patient Appointment Booking System relies on the following dependencies:

- `express`: Web application framework for Node.js.
- `cors`: Middleware for handling Cross-Origin Resource Sharing (CORS).
- `mongoose`: Object Data Modeling (ODM) library for MongoDB and Node.js.
- `jsonwebtoken`: Library for generating and verifying JSON Web Tokens (JWT).
- `bcrypt`: Library
- `nodemailer`: To send Email notification

## Deployment Link
- [Frontend](https://splendorous-beignet-2007e7.netlify.app/)
- [Backend](https://dull-teal-walrus-shoe.cyclic.app/)
