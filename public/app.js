// app.js

document.getElementById('itinerary-form').addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the default form submission

    // Get the form values
    const destination = document.getElementById('destination').value;
    const days = document.getElementById('days').value;
    const category = document.getElementById('category').value;

    // Make sure the fields are filled out
    if (!destination || !days || !category) {
        alert('Please fill in all fields');
        return;
    }

    // Disable the submit button while the request is being processed
    document.querySelector('button').disabled = true;

    try {
        // Send the data to the server via POST request
        const response = await fetch('http://localhost:3000/generate-itinerary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ destination, days, category }),
        });

        const data = await response.json();

        // Display the generated itinerary
        if (data.itinerary) {
            document.getElementById('itinerary-output').innerHTML = `
                <h2>Your Itinerary:</h2>
                <pre>${data.itinerary}</pre>
            `;
        } else {
            document.getElementById('itinerary-output').innerHTML = `
                <p>There was an error generating your itinerary. Please try again later.</p>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('itinerary-output').innerHTML = `
            <p>Error generating itinerary. Please try again later.</p>
        `;
    } finally {
        // Re-enable the submit button after the request is complete
        document.querySelector('button').disabled = false;
    }
});
