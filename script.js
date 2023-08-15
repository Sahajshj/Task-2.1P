const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const app = express();


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));


const mg = mailgun({
    apiKey:'4b710b1ea31f2b805a073d1aece51aa7-ee16bf1a-3f687394',

    domain: 'sandbox6fbb5f9587ac43c7ac0a47951da74eb1.mailgun.org'
    
   
});
app.post('/', (req, res) => {
    const email = req.body.email;
    console.log(email);
    console.log('hello');
    const data = {
        from: 'Sahajpal singh <sahajpal4831.be22@chitkara.edu.in>',
        to: email,
        subject: 'Welcome E-mail',
        text: 'Hi there! Welcome to my website! Get ready for exciting updates and exclusive content straight to your inbox. Feel free to explore and engage with us!'

    };
    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).send('An error occurred while sending the email.');
        } else {
          
            res.status(200).send('Email sent successfully.');
        }
    })
})



app.listen(3000, function (request, response) {
    console.log(`Server is running on port 3000`);
});
