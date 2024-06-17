const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

const writeDataToFile = (data, res) => {
    fs.writeFile('data.txt', data, err => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.send('Data saved successfully');
        }
    });
};

const readDataFromFile = res => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.send(`<pre>${data}</pre>`);
        }
    });
};

app.post('/submit', (req, res) => {
    const { name, surname, age, ssn } = req.body;
    const data = `Name: ${name}, Surname: ${surname}, Age: ${age}, SSN: ${ssn}\n`;
    writeDataToFile(data, res);
});

app.get('/data', (req, res) => readDataFromFile(res));

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
