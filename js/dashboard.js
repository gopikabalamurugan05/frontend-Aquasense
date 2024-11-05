function toggleMenu() {
    document.getElementById("navLinks").style.display =
        document.getElementById("navLinks").style.display === "flex" ? "none" : "flex";
}

function closeMenu() {
    document.getElementById("navLinks").style.display = "none";
}

function toggleProfileDropdown() {
    const profileDropdown = document.getElementById("profileDropdown");
    profileDropdown.style.display = profileDropdown.style.display === "block" ? "none" : "block";
}

const username = localStorage.getItem("username");
if (username) {
    document.getElementById("username").textContent = username;
}

window.addEventListener("DOMContentLoaded", () => {
    const phoneNumber = localStorage.getItem("phoneNumber");

    if (phoneNumber) {
        const maskedPhone = `${phoneNumber.slice(0, 2)}XXX XXX${phoneNumber.slice(-2)}`;
        const phoneElement = document.getElementById("phone");

        if (phoneElement) {
            phoneElement.textContent = maskedPhone;
        }
    }
});



const apiKey = "912993f55f0076857d91ebf469813669";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const weatherIcon = document.querySelector(".weather-icon");

// Function to fetch and display weather data
async function checkWeather(city) {
    try {
        const response = await fetch(`${apiURL}${city}&appid=${apiKey}`);
        
        if (response.status === 404) {
            document.querySelector(".weather-display").style.display = "none";
            document.querySelector(".error").style.display = "block";
        } else {
            const data = await response.json();
            document.getElementById("weather-city").textContent = data.name;
            document.getElementById("weather-temp").textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById("weather-range").textContent = `Min: ${Math.round(data.main.temp_min)}°C / Max: ${Math.round(data.main.temp_max)}°C`;

            // Set weather icon based on weather condition
            switch (data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "./images/clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "./images/clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "./images/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "./images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "./images/mist.png";
                    break;
                default:
                    weatherIcon.src = "./images/default.png";
                    break;
            }

            // Display the weather data section
            document.querySelector(".weather-display").classList.add("show");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
    }
}

// Retrieve the city from localStorage and check the weather
document.addEventListener("DOMContentLoaded", () => {
    const city = localStorage.getItem("city") || "Default City"; // Use a default value if city is not set
    checkWeather(city);
});

function updateWaterFlowSpeed() {
    // Simulate fetching the water flow speed from a sensor
    const waterFlowSpeed = Math.random() * 10; // Example: random speed between 0-10 L/min

    // Update the UI with the fetched water flow speed
    document.getElementById("water-flow-speed").textContent = waterFlowSpeed.toFixed(2);
}

// Update water flow speed every 5 seconds
setInterval(updateWaterFlowSpeed, 5000);


document.addEventListener('DOMContentLoaded', async function() {
    const city = localStorage.getItem('city') || "default city"; // fallback city
    checkWeather(city);

    const ctx = document.getElementById('waterLevelChart').getContext('2d');

    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Days of the week
        datasets: [
            {
                type: 'line', // Line chart dataset for average water usage
                label: 'Average Water Usage',
                data: [30, 28, 35, 25, 30, 27, 29], // Example data for average water usage
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            },
            {
                type: 'bar', // Bar chart dataset for daily water usage
                label: 'Daily Water Usage',
                data: [32, 25, 37, 23, 31, 29, 28], // Example data for daily water usage
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            }
        ]
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Days'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Water Level in Litres'
                },
                beginAtZero: true,
                max: 40
            }
        },
        maintainAspectRatio: false // Ensure the chart uses the specified height and width
    };

    const waterLevelChart = new Chart(ctx, {
        data: data,
        options: options
    });
});