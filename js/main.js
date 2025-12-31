//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

// Pseudo code
// 1. Get the date from the user
getPicture = () => {
    let date = document.getElementById('date').value;
    let url = `https://api.nasa.gov/planetary/apod?api_key=72zb3yYE6MYJFDNUV1YzDP2ZIAr3hEtQJbTTZK6V&date=${date}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            // Display the title
            document.getElementById('title').innerText = data.title;

            // Display the explanation
            document.getElementById('explanation').innerText = data.explanation;

            // Handle image or video
            let media = document.getElementById('media');
            if (data.media_type === "image") {
                media.innerHTML = `<img src="${data.url}" alt="${data.title}" width="100%">`;
            } else if (data.media_type === "video") {
                media.innerHTML = `<div class="video-container">
            <iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>
            </div>`;
        }
    })
        .catch(error => console.error('Error fetching data:', error));
};

document.getElementById('date').addEventListener('input', function() {
    let date = new Date(this.value);
    let minDate = new Date('1995-06-16');

    if (date < minDate) {
        alert("Please choose a date from 16th June 1995 onwards.");
        this.value = ''; // Clear the input field
    }
});


getMarsWeather = () => {
    let url = 'https://api.nasa.gov/insight_weather/?api_key=72zb3yYE6MYJFDNUV1YzDP2ZIAr3hEtQJbTTZK6V&feedtype=json&ver=1.0';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            let marsWeather = document.getElementById('marsWeather');
            let latestSol = data.sol_keys && data.sol_keys.length ? data.sol_keys[data.sol_keys.length - 1] : null;

            if (!latestSol || !data[latestSol]) {
                marsWeather.innerText = 'Mars weather unavailable right now.';
                return;
            }

            let solData = data[latestSol];
            let avgTemp = solData.AT && solData.AT.av !== undefined ? `${solData.AT.av}°C` : 'N/A';
            let avgWind = solData.HWS && solData.HWS.av !== undefined ? `${solData.HWS.av} m/s` : 'N/A';
            let avgPressure = solData.PRE && solData.PRE.av !== undefined ? `${solData.PRE.av} Pa` : 'N/A';

            marsWeather.innerText = `Sol ${latestSol} • Avg Temp: ${avgTemp} • Avg Wind: ${avgWind} • Avg Pressure: ${avgPressure}`;

    })
        .catch(error => console.error('Error fetching data:', error));
};
