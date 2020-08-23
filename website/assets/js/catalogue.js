const selectors = [
    {"key": "author1","id_selector": "author-select", 'valueAll': "Tous" },
    {"key": "genre","id_selector": "genre-select", 'valueAll': "Tous"},
    {"key": "age","id_selector": "age-select", 'valueAll': "Tous"},
    {"key": "collection","id_selector": "collection-select", 'valueAll': "Toutes"},
]

//event listener
selectors.map(selector => {
    let document_selector = document.getElementById(selector['id_selector']);
    document_selector.onchange = async (e) => {
        let books = await fetchDatas()
        const booksResults = await displayResults(books, selectors)
        await initCatalogue(booksResults, selectors)
    }
})

async function init() {
    let books = await fetchDatas()
    await initCatalogue(books, selectors)
    await displayResults(books, selectors)
}

init()