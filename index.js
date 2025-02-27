function fetchArtwork() {
    let randomPage = Math.floor(Math.random() * 10) + 1; 
    fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPage}&limit=100`)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Data:', data); 
            let artworks = data.data.filter(art => art.image_id);
            
            if (artworks.length > 0) {
                let randomIndex = Math.floor(Math.random() * artworks.length);
                let imageId = artworks[randomIndex].image_id;
                let imageUrl = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

                let imgElement = document.getElementById('arts');
                imgElement.style.display = "none";
                imgElement.onload = function() {
                    imgElement.style.display = "block";
                };
                imgElement.onerror = function() {
                    imgElement.style.display = "none";
                };
                imgElement.src = imageUrl;
            } else {
                console.error('No valid artworks with images found.');
            }
        })
        .catch(error => console.error('Error fetching artworks:', error));
} 

function fetchDog() {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => {
            updateImage(data.message);
        })
        .catch(error => console.error("Error fetching dog image:", error));
}

function fetchCat() {
    fetch("https://api.thecatapi.com/v1/images/search")
        .then(response => response.json())
        .then(data => {
            updateImage(data[0].url);
        })
        .catch(error => console.error("Error fetching cat image:", error));
}

function fetchQuote() {
    fetch("https://inspirobot.me/api?generate=true") 
        .then(response => response.text()) 
        .then(imageUrl => {
            updateImage(imageUrl);
        })
        .catch(error => console.error("Error fetching quote image:", error));
}


function updateImage(url) {
    let imgElement = document.getElementById('arts');
    imgElement.style.display = "none"; 

    imgElement.onload = function() {
        imgElement.style.display = "block"; 
    };

    imgElement.onerror = function() {
        console.error("Error loading image.");
        imgElement.style.display = "none"; 
    };

    imgElement.src = url;
}