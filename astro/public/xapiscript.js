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

fetch('/proxy/xapi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(statement)
  })
  .then(response => response.ok ? response.json() : Promise.reject(response))
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
});
