function booksFilterBySerie(books, serie) {
    return books.filter(book=>{return book.collection===serie})
}

async function init() {
    const books = await fetchDatas()
    const serie = document.getElementById("series_books").dataset.serie
    const booksFiltered = booksFilterBySerie(books,serie)
    displayResults(booksFiltered, null, "series_books")
}

init()