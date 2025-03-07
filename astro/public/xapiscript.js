// script.js

document.addEventListener('DOMContentLoaded', (event) => {
    const statement = {
        "actor": {
            "objectType": "Group",
            "name": "Troubleshooting Customer Persona",
            "member": [{"name": "Persona: Seeking Help"}]
          },
          "verb": {
            "id": "http://adlnet.gov/expapi/verbs/viewed",
            "display": {"en-US": "viewed"}
          },
          "object": {
            "id": "https://documentation.example.com/features/[feature-name]",
            "definition": {
              "name": {"en-US": "Feature Documentation for [Feature Name]"},
              "description": {"en-US": "User viewed the documentation for [Feature Name]."},
              "type": "http://adlnet.gov/expapi/activities/documentation"
            }
          },
          "timestamp": "2024-03-27T18:00:00Z",
          "context": {
            "registration": "[unique-registration-id]",
            "platform": "Documentation Page",
            "language": "en-US"
            }
    };

    // This endpoint and authentication details should be modified according to your real LRS and security practices.
    const endpoint = 'http://localhost:8080/data/xAPI/statements';
    
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
