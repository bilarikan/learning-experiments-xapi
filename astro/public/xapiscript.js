// script.js

document.addEventListener('DOMContentLoaded', (event) => {
    const statement = {
        "actor": {
            "name": "John Doe",
            "mbox": "mailto:john.doe@example.com"
        },
        "verb": {
            "id": "http://adlnet.gov/expapi/verbs/attended",
            "display": {"en-US": "attended"}
        },
        "object": {
            "id": "http://example.com/your-page",
            "definition": {
                "name": {"en-US": "Example Page"},
                "description": {"en-US": "A page visited by the user."}
            }
        }
    };

    // This endpoint and authentication details should be modified according to your real LRS and security practices.
    const endpoint = 'http://localhost:8080/xapi/statements';
    
    // For demonstration purposes, these are included directly here,
    // but in a production environment, consider securing these values.
    const apiKey = 'my_key'; // Ideally, loaded in a secure manner
    const apiSecret = 'my_secret'; // Ideally, loaded in a secure manner

    // Constructing the Basic Auth Header
    const authHeader = 'Basic ' + btoa(`${apiKey}:${apiSecret}`);

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader,
            'X-Experience-API-Version': '1.0.3' // Ensure compatibility with your LRS version
        },
        body: JSON.stringify(statement),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log('xAPI statement sent successfully:', data))
    .catch((error) => console.error('Error sending xAPI statement:', error));
});
