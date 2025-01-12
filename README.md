

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
---


## Overview
This project is a comprehensive authentication system built with Node.js, Express, MongoDB, and React. It implements industry-standard security practices including JWT authentication, refresh token rotation, and multi-device support. The system provides a secure, user-friendly authentication flow with protected routes and role-based access control.

## Core Features

### Backend (Node.js & Express)
- **Advanced JWT Authentication**
  - Secure token generation and validation
  - Refresh token rotation mechanism for enhanced security
  - Reuse detection to prevent token replay attacks
  - Multi-device login support with session management
  - Secure cookie handling for token storage

- **RESTful API Architecture**
  - Clean and organized endpoint structure
  - MongoDB integration for user data and session management
  - Middleware-based authentication checks
  - Rate limiting and request validation

### Frontend (React)
- **User Authentication Flow**
  - Secure login and registration system
  - Persistent user sessions with automatic token refresh
  - Axios interceptors for handling token expiration
  - Protected route implementation using React Router v6
  - Role-based access control (Admin/User/Guest)

- **Form Management**
  - Custom React hooks for form data handling
  - Comprehensive form validation
  - Real-time validation feedback
  - Secure password handling
  - Registration form with email verification

- **Security Features**
  - HTTP-only cookie implementation
  - CSRF protection
  - XSS prevention measures
  - Secure password hashing
  - Input sanitization

- **User Experience**
  - Seamless authentication state management
  - Loading states and error handling
  - Responsive design for all devices
  - Intuitive user interface
  - Clear error messages and user feedback

### Best Practices Implementation
- Token blacklisting for enhanced security
- Secure password storage using bcrypt
- Environment variable configuration
- Error logging and monitoring
- CORS configuration
- Rate limiting
- Request validation
- Input sanitization
- Secure headers implementation

##  Project Structure

```sh
└── custom-google-react--auth/
    ├── README.md
    ├── backend
    │   ├── config
    │   ├── controllers
    │   ├── logs
    │   ├── middleware
    │   ├── model
    │   ├── package.json
    │   ├── routes
    │   └── server.js
    └── frontend
        ├── package.json
        ├── public
        └── src
```



						
---
##  Getting Started

###  Prerequisites

Before getting started with custom-google-react--auth, ensure your runtime environment meets the following requirements:

- **Programming Language:** JavaScript
- **Package Manager:** Npm


###  Installation

Install custom-google-react--auth using one of the following methods:

**Build from source:**

1. Clone the custom-google-react--auth repository:
```sh
❯ git clone https://github.com/Dimeji-go/custom-google-react--auth
```

2. Navigate to the project directory:
```sh
❯ cd custom-google-react--auth
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```




###  Usage
Run custom-google-react--auth using the following command after filling the environment variables :
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start 
```



