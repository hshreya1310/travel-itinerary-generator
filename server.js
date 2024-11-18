// server.js

const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

// Initialize dotenv to access environment variables
dotenv.config();

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Route to handle generating the itinerary
app.post('/generate-itinerary', async (req, res) => {
    const { destination, days, category } = req.body;

    // Make sure the required fields are provided
    if (!destination || !days || !category) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Prepare the OpenAI request payload
        const prompt = `Generate a travel itinerary for ${destination} for ${days} days, focusing on ${category} activities.`;

        // Call OpenAI API
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003', // You can use other models if needed
            prompt: prompt,
            max_tokens: 500
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Send the generated itinerary as a response
        res.json({ itinerary: response.data.choices[0].text });
    } catch (error) {
        console.error('Error generating itinerary:', error);
        res.status(500).json({ error: 'Failed to generate itinerary' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
