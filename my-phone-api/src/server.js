import express from 'express';

const app = express()

const hostname = 'localhost';
const port = 5500;

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
  })

  app.listen(port, hostname, () =>{
    console.log("I'm smeap, running server");
  })