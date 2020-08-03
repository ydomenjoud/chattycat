const search_text = document.getElementById("search_text")
const searched_books_container = document.getElementById("searched_books_container")
const searched_keys = ['title', 'introduction']

search_text.onkeyup = (e) => {
    let text = e.target.value.toLowerCase()
    fetch("/books.json")
    .then(response => response.json().then(books => {
        let books_searched = books.filter(book => searched_keys.map(key => book[key].toLowerCase().includes(text)).includes(true));
        console.log(books_searched)
        let booksHTML = ""
        books_searched.map(book => {
            booksHTML += `<a href="/books/${book.slug}.html">${book.title}</a>`
        })
        console.log(booksHTML)
        searched_books_container.innerHTML = booksHTML
    })
    );
}