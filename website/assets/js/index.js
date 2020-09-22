const search_text = document.getElementById("search_text");
const searched_books_container = document.getElementById("searched_books_container");
const searched_keys = ['name', 'introduction'];

//fonction proposant une liste de livres correspondant à la recherche (sur les clés de l'array searched_keys)
function displayBooks(text) {
    if (!text) {
        searched_books_container.innerHTML = "";
        searched_books_container.style.visibility = "hidden";
    } else {
        fetch("/books.json")
            .then(response => response.json().then(books => {
                    let books_searched = books.filter(book => searched_keys.map(key => book[key].toLowerCase().includes(text)).includes(true));
                    //affichage des éléments trouvés
                    let booksHTML = "";
                    if (books_searched.length > 0) {
                        books_searched.map(book => {
                            booksHTML += `<a href="/books/${book.slug}.html" class="search_item">${book.name}</a>`;
                        });
                    }
                    searched_books_container.innerHTML = booksHTML;
                    searched_books_container.style.visibility = "visible";
                })
            );
    }
}

//appel de la fonction à chaque évolution du champ de recherche
search_text.onkeyup = (e) => {
    displayBooks(e.target.value.toLowerCase());
};

//appel de la fonction à la sélection du champ input
search_text.onfocus = (e) => {
    displayBooks(e.target.value.toLowerCase());
};

//suppression de la liste proposée à un clic en dehors de cette dernière
search_text.onblur = (e) => {
    if (!e.relatedTarget || e.relatedTarget.className !== "search_item") {
        // displayBooks("");
    }
};

let slider_position = 0;
let interval;

function selectSlide(num) {
    const slides = document.querySelectorAll('#slider article');
    const slider_controls = document.querySelectorAll('#slider_control a');

    slider_position = num % slides.length;

    toggle(slider_controls, 'active', slider_position);
    toggle(slides, 'active', slider_position);
}

function toggle(list, selector, index) {
    Array.from(list).forEach(c => {
        c.classList.remove(selector);
    });
    if (list[index]) {
        list[index].classList.add(selector);
    }
}

function resetSlider() {
    // kill previous
    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => selectSlide(slider_position + 1), 6000);
}

function _GET(url) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                resolve(this.response);
            } else {
                // We reached our target server, but it returned an error
                reject({status: this.status, response: this.response});
            }
        };

        request.onerror = function (error) {
            // There was a connection error of some sort
            reject(error);
        };

        request.send();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const slider_controls = document.querySelectorAll('#slider_control a');

    Array.from(slider_controls).forEach((c, i) => {
        c.addEventListener('click', () => {
            selectSlide(i);
            resetSlider();
        });
    });
    resetSlider();

    // add newsletter subscription
    const button = document.getElementById('newsletter_button');
    button.addEventListener('click', function () {
        document.getElementById('newsletter_box').style.visibility = 'hidden';
        const email = document.getElementById('newsletter_email').value;
        _GET('https://europe-west1-chattycat-site.cloudfunctions.net/newsletter?email=' + encodeURIComponent(email))
            .then(result => {
                alert('Votre inscription a bien été prise en compte')
            }).catch(error => {
                alert('Une erreur est survenue, merci de réessayer plus tard')
            console.log('error in newsletter registration', error);
        });
    });
});
