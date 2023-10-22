const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');
const csv = require('csv-parser');
const DataModel = require('../models/data')
const fileProcessor = require('../service/fileProcessor');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'tmp/csv/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });
//#region 
// router.post('/', upload.single('file'), (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: "No File uploaded" });
//         }

//         const validationErrors = [];
//         const validData = [];


//         // Read the file from disk and create a readable stream
//         const fileStream = fs.createReadStream(req.file.path);
//         let count = 0;
//         // Pipe the file stream to csv-parser
//         fileStream
//             .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
//             .on('data', (row) => {
//                 count++;


//                 if (!row.Name) {
//                     validationErrors.push(`Name is required at row no: ${count}`);
//                 }

//                 if (!row.Age) {
//                     validationErrors.push(`Age is required at row no: ${count} `);
//                 } else if (isNaN(row.Age)) {
//                     validationErrors.push(`Age must be Number at row no: ${count}  `);
//                 } else if (row.Age < 0) {
//                     validationErrors.push(`Age cannot be negative at row no: ${count} `);
//                 }

//                 if (!row.City) {
//                     validationErrors.push(`City is required at row no: ${count}`);
//                 }

//             })
//             .on('end', () => {
//                 if (validationErrors.length === 0) {
//                     //inserting data in chunks to handle large data
//                     const fileStream = fs.createReadStream(req.file.path);
//                     console.log
//                     fileStream
//                         .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
//                         .on('data', (row) => {
//                             let checkObj = {};
//                             checkObj.Name = row.Name;
//                             checkObj.Age = row.Age;
//                             checkObj.City = row.City
//                             const newRow = new DataModel(checkObj);
//                             console.log(checkObj)
//                             DataModel.collection.insertOne(checkObj)
//                                 .catch((err) => {
//                                     console.log(err)
//                                 })
//                         })
//                         .on('end', () => {
//                             return res.status(200).json({ message: 'Data upload successful' });
//                         })




//                 } else {
//                     return res.status(400).json({ message: validationErrors })
//                 }
//             });

//     } catch (err) {
//         console.log(err);
//     }
// });
//#endregion
router.post('/', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No File uploaded" });
        }

        const result = await fileProcessor.processCSVFile(req.file.path);

        if (Array.isArray(result)) {
            return res.status(400).json({ message: result });
        } else {
            return res.status(200).json({ message: result });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
