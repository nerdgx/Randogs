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
                imgElement.style.display = "none"; // Hide image while loading
                imgElement.onload = function() {
                    imgElement.style.display = "block"; // Show when fully loaded
                };
                imgElement.onerror = function() {
                    imgElement.style.display = "none"; // Hide if there's an error
                };
                imgElement.src = imageUrl;
            } else {
                console.error('No valid artworks with images found.');
            }
        })
        .catch(error => console.error('Error fetching artworks:', error));
} 