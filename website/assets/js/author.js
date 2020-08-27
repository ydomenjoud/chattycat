function booksFilterByAuthor(books, author) {
    return books.filter(book=>{return book.author1===author})
}

async function init() {
    const books = await fetchDatas()
    const author = document.getElementById("author_page").dataset.author
    const booksFiltered = booksFilterByAuthor(books,author)
    displayResults(booksFiltered, null, "author_books")
}

init()