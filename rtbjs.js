function executeRequest(modelValue, brandValue) {
    console.log("Running Vidoomy RTB Testing");

    const url = "https://64ff-2401-4900-8827-8158-d968-6698-6e6e-fc0a.ngrok-free.app/";

    fetch(url, {
        method: "GET",
        headers: {
            "ngrok-skip-browser-warning": "true",  // Bypass ngrok warning
            "Sec-CH-UA-Model": "?1",               // Try to fetch client hints
            "User-Agent": navigator.userAgent,     // Send client UA
            "X-DV-Model": modelValue,              // Append model value
            "X-DV-Brand": brandValue               // Append brand value
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
            let brandValue = navigator.userAgentData.brands.map(b => b.brand).join(", ") || "Unknown";
            executeRequest(modelValue, brandValue);
        })
        .catch(error => {
            console.error("Error fetching model and brand:", error);
            executeRequest("Unknown", "Unknown");  // Fallback if fetching fails
        });
};