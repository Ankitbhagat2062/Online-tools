document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    // const lara = document.getElementById('lara');
    const ALLTOOLS = document.querySelector('.ALLTOOLS');
    const alltools = document.querySelector('.alltools');
    const alltool = document.querySelector('.alltools-b');
    const cross = document.querySelector('.cross');
    const btnp = document.getElementById('btnp');
    const profile = document.getElementById('profile');
    const transparent = document.querySelector('.transparent');
    // const learn = document.getElementById('learn');
    const dismissBtn = document.getElementsByClassName('dismiss-btn');

    function toggleVisibility(element) {
        element.style.display = element.style.display === 'block' ? 'none' : 'block';
    }

    burger.addEventListener('click', () => {
        // toggleVisibility(lara);
        alltool.classList.toggle('d-none');
    });
    ALLTOOLS.addEventListener('click', () => {
        alltools.classList.toggle('h-nav-resp');
    });

    cross.addEventListener('click', () => {
        alltools.classList.toggle('h-nav-resp');
    });
    btnp.addEventListener('click', () => {
        toggleVisibility(profile);
    });
    profile.style.display = 'none';
    transparent.addEventListener('click', () => {
        if (alltools.classList.contains('h-nav-resp')) {
            alltools.classList.remove('h-nav-resp');
        }
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
    const searchInput = document.getElementById('search-i');
    const items = document.querySelectorAll('.item-i');

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
    const searchinput = document.getElementById('searchinput');
    const items = document.querySelectorAll('.item');

    searchinput.addEventListener('input', () => {
        const searchTerm = searchinput.value.toLowerCase();

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
    const SearchInput = document.getElementById('search-5');
    const items = document.querySelectorAll('.coming');

    SearchInput.addEventListener('input', () => {
        const searchTerm = SearchInput.value.toLowerCase();

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
