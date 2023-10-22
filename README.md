# CSV Data Upload and Validation

## Description

This Node.js application, built with Express.js, provides an API endpoint for uploading CSV data. The uploaded data is then validated against specific criteria, such as required fields, data types, or constraints. If the data is valid, it is saved into a database. If there are validation errors, a response indicating the errors for each row is returned.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following software and dependencies installed:

Node.js and npm
Express.js
Mongodb

### Installation

1) Clone the repository to your local machine:
git clone https://github.com/Rohit-25/upload-csv

2) Change to the project directory:
cd upload-csv

3) Install the project dependencies:
npm install

4) Configure your environment variables, including database connection settings and any other required configurations.

5) Start the application:
npm start
Express application should now be running and ready to accept requests.

### Usage   

Uploading CSV Data
To upload CSV data, send a POST request to the /api/uploadcsv endpoint. You can use tool Postman for testing.

### Validation Process

The uploaded CSV data is processed and validated according to the specified criteria. Validation checks may include:

Required fields
Data types
Constraints
If the validation process finds errors, the application will return a response with appropriate HTTP status codes (e.g., 400 Bad Request) and a detailed description of the validation errors.

### Database Storage

Validated data is saved into a database using Mongoose library. You should specify the database connection settings in your environment variables or configuration files.

### Handling Large Data

To handle large data that may not fit in memory, the application processes the CSV file row by row, without loading the entire file into memory. This ensures efficient processing and prevents memory overflows.
