

import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
const CARS_API_URL = 'https://bootcamp.projectcodex.co/cars.json';

app.use(bodyParser.json());
app.use(express.static('public')); 

// GET: Fetch all cars
app.get('/api/cars', async (req, res) => {
  try {
    const response = await axios.get(CARS_API_URL);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching car data');
  }
});

// GET: Most Blue Cars
app.get('/api/mostBlueCars', async (req, res) => {
  try {
    const response = await axios.get(CARS_API_URL);
    const cars = response.data;
    const blueCars = cars.filter(car => car.color.toLowerCase() === 'blue');
    res.json(blueCars);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching blue cars');
  }
});

// POST: Add a new car
app.post('/api/cars', async (req, res) => {
  try {
    const newCar = req.body;
    const response = await axios.get(CARS_API_URL);
    const cars = response.data;

    // Add new car to the list (this does not actually save the car anywhere permanently)
    cars.push(newCar);

    res.status(201).json(newCar); // Simulate successful creation
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding new car');
  }
});

// PUT: Update a car by registration number
app.put('/api/cars/:regNumber', async (req, res) => {
  try {
    const regNumber = req.params.regNumber;
    const updatedCar = req.body;
    const response = await axios.get(CARS_API_URL);
    const cars = response.data;

    // Update the car details
    const carIndex = cars.findIndex(car => car.reg_number.toUpperCase() === regNumber.toUpperCase());
    if (carIndex !== -1) {
      cars[carIndex] = { ...cars[carIndex], ...updatedCar };
      res.json(cars[carIndex]); // Return updated car
    } else {
      res.status(404).send('Car not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating car');
  }
});

// DELETE: Delete a car by registration number
app.delete('/api/cars/:regNumber', async (req, res) => {
  try {
    const regNumber = req.params.regNumber;
    const response = await axios.get(CARS_API_URL);
    const cars = response.data;
    const updatedCars = cars.filter(car => car.reg_number.toUpperCase() !== regNumber.toUpperCase());

    // Simulate deletion by returning the updated list
    res.json(updatedCars);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error deleting car with registration number ${req.params.regNumber}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
