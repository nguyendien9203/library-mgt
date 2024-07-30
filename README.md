# Library Management System

## Overview

The Library Management System (LMS) is designed to streamline the management of books and book copies within a library. It provides an intuitive interface for librarians and administrators to handle various library operations efficiently.

### How It Works

The system consists of two main components:

1. **Backend:** Built using Spring Boot and Hibernate, the backend handles data storage, business logic, and user authentication. It connects to a relational database like MySQL to persist data.
   
2. **Frontend:** Developed with ReactJS and styled using Bootstrap and Ant Design, the frontend provides a user-friendly interface for interacting with the system. It communicates with the backend via RESTful APIs to perform operations.

![image](https://github.com/user-attachments/assets/f35b0255-b366-4f19-8e48-b5642b03e1ba)
![image](https://github.com/user-attachments/assets/e1407e2c-544f-4346-947f-f6e6a755eef5)
![image](https://github.com/user-attachments/assets/abbf27d1-324d-4548-a102-20f2bc57b4c4)

## Technologies

- **Backend:** Spring Boot, Spring Security, Spring Data JPA
- **Frontend:** ReactJS, Bootstrap, Ant Design
- **Database:** MySQL
- **Version Control:** Git
- **Other:** JWT, RESTful APIs

## Installation and Running

### I. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/nguyendien9203/library-mgt.git
```

### II. Backend Installation

1. Navigate to the backend directory:
   
   ```bash
   cd library-mgt/backend
   ```

2. Install dependencies:
   
   ```bash
   ./mvnw install
   ```
   
3. Configure the database in `application.properties`:
   
   ```bash
   spring.datasource.url=jdbc:mysql://localhost:3306/library_db
   spring.datasource.username=root
   spring.datasource.password=password
   ```
   
4. Run the backend application:
   
   ```bash
   ./mvnw spring-boot:run
   ```
   
### III. Frontend Installation

1. Navigate to the frontend directory:
   
   ```bash
   cd ../frontend
   ```
   
2. Install dependencies:
   
   ```bash
   npm install
   ```
   
3. Run the frontend application:
   
   ```bash
   npm start
   ```
   
4. Run the frontend application:

```bash
npm start
```
