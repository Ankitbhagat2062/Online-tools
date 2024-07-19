document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    // const lara = document.getElementById('lara');
    const ALLTOOLS = document.querySelector('.ALLTOOLS');
    const alltools = document.querySelector('.alltools');
    const alltool = document.querySelector('.alltools-b');
    const cross = document.querySelector('.cross');

    function toggleVisibility(element) {
        element.style.display = element.style.display === 'block' ? 'none' : 'block';
    }

    burger.addEventListener('click', () => {
        alltool.classList.toggle('d-none');
    });

    ALLTOOLS.addEventListener('click', () => {
        alltools.classList.toggle('h-nav-resp');
    });

    cross.addEventListener('click', () => {
        alltools.classList.toggle('h-nav-resp');
    });
});
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.getElementById("offerMessage").style.display = "flex";
        document.getElementById("overlay").style.display = "block";
        document.body.style.overflowY = "hidden";
    }, 1000); // 1 second delay
});
function dismissOffer() {
    document.getElementById("offerMessage").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.body.style.overflowY = "auto";
}
document.addEventListener('DOMContentLoaded', () => {
    const hearts = document.querySelectorAll('.heart svg');

    hearts.forEach(heart => {
        heart.addEventListener('click', () => {
            console.log('Heart clicked!');
        });
    });
});


setInterval(() => {
    // Function to scroll cards automatically in x-direction
function autoScrollCards() {
    // Get the .cards element
    var cardsContainer = document.querySelector('.cards-p');

    // Set the scroll speed (adjust as needed)
    var scrollSpeed = 2; // Adjust scroll speed here

    // Define the scroll function
    function scroll() {
        // Scroll by scrollSpeed pixels horizontally
        cardsContainer.scrollLeft += scrollSpeed;

        if (cardsContainer.scrollLeft >= (cardsContainer.scrollWidth - cardsContainer.clientWidth)) {
            cardsContainer.scrollLeft = 0;
        }
    }

    var scrollInterval = setInterval(scroll, 50); // Adjust interval as needed
    console.log(scrollInterval)
}

// Call the autoScrollCards function to start automatic scrolling
autoScrollCards();
}, 1000);





// Object to store like counts for each user
var likeCounts = {};

function likeClicked(heart, userName) {
    if (!likeCounts[userName]) {
        likeCounts[userName] = 15;
    }
    if (likeCounts[userName] === 15) {
        likeCounts[userName]++;
    }
    var likeCountElement = heart.querySelector('span');
    likeCountElement.innerText = likeCounts[userName];
      heart.querySelector('svg').setAttribute('fill', '#1DA1F2');
      heart.querySelector('.heart').style.backgroundColor = '#1DA1F2';
}
document.querySelector('.card-p').addEventListener('mouseover', function() {
    this.style.animationPlayState = 'paused';
});
document.querySelector('.card-p').addEventListener('mouseout', function() {
    this.style.animationPlayState = 'running';
});


