const selectors = [
    {"key": "author1","id_selector": "author-select", 'valueAll': "Tous", "isArray": false },
    {"key": "themes","id_selector": "themes-select", 'valueAll': "Tous", "isArray": true},
    {"key": "genre","id_selector": "genre-select", 'valueAll': "Tous", "isArray": false},
    {"key": "collection","id_selector": "collection-select", 'valueAll': "Toutes", "isArray": false},
]

function booksFilterByAge(books, age) {
    console.log(books, age)
    return books.filter(book=>{return book.age===age})
}

//event listener
selectors.map(selector => {
    let document_selector = document.getElementById(selector['id_selector']);
    document_selector.onchange = async (e) => {
        const books = await fetchDatas()
        const age = document.getElementById("selectors_container").classList[0]
        const booksFiltered = booksFilterByAge(books,age)
        const booksResults = await displayResults(booksFiltered, selectors)
        await initCatalogue(booksResults, selectors)
    }
})

async function init() {
    const books = await fetchDatas()
    const age = document.getElementById("selectors_container").classList[0]
    const booksFiltered = booksFilterByAge(books,age)
    await initCatalogue(booksFiltered, selectors)
    await displayResults(booksFiltered, selectors)
}

init()