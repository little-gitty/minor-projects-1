function getRecommendation() {
    // Get the recommendations section
    const recommendationsSection = document.getElementById("recommendations");

    // Show the recommendations
    recommendationsSection.style.display = "block";

    // Optionally, update the recommendation message dynamically based on the city entered
    const cityName = document.querySelector(".city-input").value;
    if (cityName) {
        recommendationsSection.innerHTML = `
            <h2>Outfit Recommendations for ${cityName}:</h2>
            <p>Based on the weather, we recommend wearing a light jacket and sunglasses today!</p>
        `;
        console.log(`Outfit Recommendations for ${cityName}:`);
        console.log("Based on the weather, we recommend wearing a light jacket and sunglasses today!");
    } else {
        console.log("Please enter a city name to get recommendations.");
    }
}

document.querySelector(".recommend-btn").addEventListener("click", () => {
    getRecommendation(); // Call the function here
});

document.querySelector(".recommend-btn").addEventListener("click", () => {
    const addressInput = document.getElementById("address-input").value;
    const confirmationMessage = document.getElementById("confirmation-message");

    if (addressInput) {
        confirmationMessage.textContent = `City name inputted: ${addressInput}`;
        confirmationMessage.style.display = "block"; // Ensure the message is visible
        console.log(`City name inputted: ${addressInput}`);
    } else {
        confirmationMessage.textContent = "No city name or address inputted.";
        confirmationMessage.style.display = "block"; // Show the message even for errors
        console.log("No city name or address inputted.");
    }
});

document.getElementById("user-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const address = document.getElementById("address-input").value;

    console.log(`Submitting address: ${address}`); // Log the address to the console

    try {
        const response = await fetch("http://localhost:3000/submit", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        console.log("Server response:", result.message); // Log the server response

        const recommendationsSection = document.getElementById("recommendations");
        recommendationsSection.style.display = "block";
        recommendationsSection.innerHTML = `
            <h2>Recommendations:</h2>
            <p>${result.message}</p>
        `;
        console.log("Recommendations:");
        console.log(result.message);
    } catch (error) {
        console.error("Error submitting form:", error);
    }
});

document.getElementById("send-chat").addEventListener("click", async () => {
    const chatInput = document.getElementById("chat-input").value;
    const chatResponse = document.getElementById("chat-response");

    if (chatInput.trim() === "") {
        chatResponse.textContent = "Please enter a message.";
        return;
    }

    try {
        // Placeholder for chatbot connection
        console.log("Sending message to chatbot:", chatInput);

        // Simulate chatbot response (replace this with actual chatbot API call)
        const simulatedResponse = `Chatbot response to: "${chatInput}"`;
        chatResponse.textContent = simulatedResponse;

        console.log("Chatbot response:", simulatedResponse);
    } catch (error) {
        console.error("Error communicating with chatbot:", error);
        chatResponse.textContent = "Error communicating with chatbot.";
    }
});