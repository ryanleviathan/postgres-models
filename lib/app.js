const express = require('express');
const Bike = require('./models/Bike');
const app = express();

app.use(express.json());

// CRUD ROUTES
app.post('/api/v1/bikes', (req, res) => {
  Bike
    .insert(req.body)
    .then(bike => res.send(bike));
});

app.get('/api/v1/bikes', (req, res) => {
  Bike
    .find()
    .then(bikes => res.send(bikes));
});

app.get('/api/v1/bikes/:id', (req, res) => {
  Bike
    .findById(req.params.id)
    .then(bikes => res.send(bikes));
});

app.put('/api/v1/bikes/:id', (req, res) => {
  Bike
    .update(req.params.id, req.body)
    .then(bikes => res.send(bikes));
});

app.delete('/api/v1/bikes/:id', (req, res) => {
  Bike
    .delete(req.params.id)
    .then(bikes => res.send(bikes));
});

module.exports = app;
