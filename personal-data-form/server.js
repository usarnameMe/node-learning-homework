const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const appendDataToFile = (data, res) => {
    fs.appendFile('data.txt', data, (err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.send('Data saved successfully');
        }
    });
};

const readDataFromFile = (res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
};

app.post('/submit', (req, res) => {
    const { name, surname, age, ssn } = req.body;
    
    if (!/^\d{11}$/.test(ssn)) {
        return res.status(400).send('SSN must be exactly 11 digits');
    }
    
    const data = `Name: ${name}, Surname: ${surname}, Age: ${age}, SSN: ${ssn}\n`;
    appendDataToFile(data, res);
});

app.get('/data', (req, res) => readDataFromFile(res));

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
