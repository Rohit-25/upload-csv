
const fs = require('fs');
const csv = require('csv-parser');
const DataModel = require('../models/data');

// Function to process a CSV file
function processCSVFile(filePath) {
    return new Promise((resolve, reject) => {
        const validationErrors = [];
        let count = 0;

        const fileStream = fs.createReadStream(filePath);

        fileStream
            .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
            .on('data', (row) => {
                count++;

                if (!row.Name) {
                    validationErrors.push(`Name is required at row no: ${count}`);
                }

                // Add more validation checks for Age and City

            })
            .on('end', () => {
                if (validationErrors.length === 0) {
                    // Insert data into the database
                    insertDataFromFile(filePath)
                        .then(() => resolve('Data upload successful'))
                        .catch((err) => reject(err));
                } else {
                    resolve(validationErrors);
                }
            });
    });
}

// Function to insert data from CSV into the database
function insertDataFromFile(filePath) {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(filePath);

        fileStream
            .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
            .on('data', (row) => {
                let checkObj = {
                    Name: row.Name,
                    Age: row.Age,
                    City: row.City,
                };
                const newRow = new DataModel(checkObj);

                newRow.save()
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .on('end', () => {
                resolve();
            });
    });
}

module.exports = {
    processCSVFile,
};
