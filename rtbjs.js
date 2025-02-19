function executeRequest(modelValue) {
        console.log("Running Vidoomy RTB Testing");

        const url = "https://64ff-2401-4900-8827-8158-d968-6698-6e6e-fc0a.ngrok-free.app/";

        fetch(url, {
            method: "GET",
            headers: {
                "ngrok-skip-browser-warning": "true",  // Bypass ngrok warning
                "X-Sec-CH-UA-Model": modelValue               // Append model value
            }
        })
        .then(response => response.text())
        .then(data => {
            console.log("Response received:", data);
        })
        .catch(error => {
            console.error("Error executing request:", error);
        });
    }

    // Fetch high entropy values and execute the request
    window.onload = function() {
        let highEntropyValues = ['model'];

        navigator.userAgentData.getHighEntropyValues(highEntropyValues)
            .then(ua => {
                let modelValue = ua.model || "Unknown";
                executeRequest(modelValue);
            })
            .catch(error => {
                console.error("Error fetching model:", error);
                executeRequest("Unknown");  // Fallback if fetching fails
            });
    };
