const search_text = document.getElementById("search_text")
const searched_books_container = document.getElementById("searched_books_container")
const searched_keys = ['title', 'introduction']

//fonction proposant une liste de livres correspondant à la recherche (sur les clés de l'array searched_keys)
function displayBooks(text) {
    if (!text) {
        searched_books_container.innerHTML=""
        searched_books_container.style.visibility = "hidden"
    }
    else {
        fetch("/books.json")
        .then(response => response.json().then(books => {
            let books_searched = books.filter(book => searched_keys.map(key => book[key].toLowerCase().includes(text)).includes(true));
            console.log(books_searched)
            //affichage des éléments trouvés
            let booksHTML = ""
            if (books_searched.length > 0) {
                books_searched.map(book => {
                    booksHTML += `<a href="/books/${book.slug}.html" class="search_item">${book.title}</a>`
                })
            }
            searched_books_container.innerHTML = booksHTML
            searched_books_container.style.visibility = "visible"
        })
        );
    }
}

//appel de la fonction à chaque évolution du champ de recherche
search_text.onkeyup = (e) => {
    displayBooks(e.target.value.toLowerCase())
}

//appel de la fonction à la sélection du champ input
search_text.onfocus = (e) => {
    displayBooks(e.target.value.toLowerCase())
}

//suppression de la liste proposée à un clic en dehors de cette dernière
search_text.onblur = (e) => {
    if (!e.relatedTarget || e.relatedTarget.className!=="search_item") {
        displayBooks("")
    }
}