import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'; // Load environment variables from .env
import connectDB from './db.js'; // Import the connectDB function
import { City } from './schema.js'; 



const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log('MONGO_URI:', process.env.MONGO_URI); // Debugging log

// Middleware
app.use(cors());
app.use(express.json());



// MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Express API!');
});

City.find({})
  .then(data => console.log("Fetched Cities:", data))
  .catch(err => console.error("DB Error:", err));




// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.log('Server error:', err);
});






app.get('/clues/v1', async (req, res) => {
    try {
        // Fetch all cities from the database
        const cities = await City.find({});

        // Check if any cities were found
        if (!cities.length) {
            return res.status(404).send('No cities found');
        }

        // Select a random city from the list
        const randomIndex = Math.floor(Math.random() * cities.length);
        const randomCity = cities[randomIndex];

        // Get the clues array from the random city
        const clues = randomCity.clues;

        // Check if clues array is not empty
        if (!clues || clues.length === 0) {
            return res.status(404).send('No clues found for this city');
        }

        // Send both clues as a response
        res.json({ clues });
    } catch (err) {
        console.error('Error fetching clues:', err);
        res.status(500).send('Internal Server Error');
    }
});