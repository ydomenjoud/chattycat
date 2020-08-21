const age_selector = document.getElementById("age-select");
const author_selector = document.getElementById("author-select");
const filter_results = document.getElementById("filter_results");

const selectors = [
    {"key": "author1","id_selector": "author-select" },
    {"key": "genre","id_selector": "genre-select"},
    {"key": "age","id_selector": "age-select"},
    {"key": "collection","id_selector": "collection-select"},
]

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

async function fetchDatas() {
    let response = await fetch("/books.json")
    let books = await response.json()
    return books
}

async function initCatalogue() {
    let books = await fetchDatas()

    selectors.map(selector => {
        let data_filtered = books.map(book => {return book[selector['key']]}).filter(onlyUnique)
        let document_selector = document.getElementById(selector['id_selector']);
    
        data_filtered.map(data =>{
            let option = document.createElement('option')
            option.setAttribute('value', data);
            option.textContent = data
            document_selector.append(option)
        })
    })

}

initCatalogue()

//event listener
selectors.map(selector => {
    let document_selector = document.getElementById(selector['id_selector']);
    document_selector.onchange = async (e) => {
        displayResults()
    }
})

async function displayResults() {
    let books = await fetchDatas()

    selectors.map(selector => {
        let document_selector = document.getElementById(selector['id_selector']);
        books = [...books.filter(book=>{return book[selector['key']]===document_selector.value})]
    })

    let filterResultsString ="";
    books.map(book => {
        filterResultsString += `<div><p>${book.title}</p><p>${book.author1}</p></div>`
    })
    filter_results.innerHTML = filterResultsString

}
