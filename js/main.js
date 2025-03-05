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

// 2. Use the date to get the NASA picture of the day
// 3. Display the picture on the page

