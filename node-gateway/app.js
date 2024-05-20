const express = require('express');
const createPayment = require('./create-payment');
const checkingPayment = require('./checking-payment');
const cors = require('cors')

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your allowed origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

const app = express();

app.use(cors(corsOptions));


app.use(express.json())
app.use(express.urlencoded({ extends: true }))

app.post('/payment', createPayment)

app.post('/checking-payment', checkingPayment)


app.listen(8080, () => {
  console.log('App listen on port 8080');
})
