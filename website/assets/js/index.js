const search_text = document.getElementById("search_text")
const searched_books_container = document.getElementById("searched_books_container")
const searched_keys = ['title', 'introduction']

function displayBooks(text) {
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
    })
    );
}

search_text.onkeyup = (e) => {
    let text = e.target.value.toLowerCase()
    if (text) {displayBooks(text)}
    else {searched_books_container.innerHTML=""}
}