// script.js
document.addEventListener('DOMContentLoaded', () => {
    const hearts = document.querySelectorAll('.heart svg');

    hearts.forEach(heart => {
        heart.addEventListener('click', () => {
            console.log('Heart clicked!');
        });
    });
});



// Function to scroll cards automatically in x-direction
function autoScrollCards() {
    // Get the .cards element
    var cardsContainer = document.querySelector('.cards');

    // Set the scroll speed (adjust as needed)
    var scrollSpeed = 2; // Adjust scroll speed here

    // Define the scroll function
    function scroll() {
        // Scroll by scrollSpeed pixels horizontally
        cardsContainer.scrollLeft += scrollSpeed;

        // If scrolled to the end, reset to the beginning
        if (cardsContainer.scrollLeft >= (cardsContainer.scrollWidth - cardsContainer.clientWidth)) {
            cardsContainer.scrollLeft = 0;
        }
    }

    // Set the interval for scrolling
    var scrollInterval = setInterval(scroll, 50); // Adjust interval as needed
}

// Call the autoScrollCards function to start automatic scrolling
autoScrollCards();




// Object to store like counts for each user
var likeCounts = {};

function likeClicked(heart, userName) {
    // Check if the user has already liked
    if (!likeCounts[userName]) {
        // If the user hasn't liked yet, initialize the like count to 15
        likeCounts[userName] = 15;
    }

    // Check if the like count is not incremented yet
    if (likeCounts[userName] === 15) {
        // Increment the like count for the user
        likeCounts[userName]++;
    }

    // Get the span element containing the like count
    var likeCountElement = heart.querySelector('span');

    // Update the like count
    likeCountElement.innerText = likeCounts[userName];

      // Change the color of the heart to blue
      heart.querySelector('svg').setAttribute('fill', '#1DA1F2');

      // Change the background color of the SVG container to blue
      heart.querySelector('.heart').style.backgroundColor = '#1DA1F2';
   
}
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const items = document.querySelectorAll('.top-d');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        items.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchinput');
    const toolItems = document.querySelectorAll('.ALLJPGTOOLS .top');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        toolItems.forEach(item => {
            const toolName = item.querySelector('.top-in span').textContent.toLowerCase();
            if (toolName.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-1');
    const items = document.querySelectorAll('.item');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();

        items.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

document.querySelector('.card').addEventListener('mouseover', function() {
    this.style.animationPlayState = 'paused';
});

document.querySelector('.card').addEventListener('mouseout', function() {
    this.style.animationPlayState = 'running';
});

