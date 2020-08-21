const age_selector = document.getElementById("age-select");
const author_selector = document.getElementById("author-select");
const filter_results = document.getElementById("filter_results");

const selectors = [
    {"key": "author1","id_selector": "author-select", 'valueAll': "Tous" },
    {"key": "genre","id_selector": "genre-select", 'valueAll': "Tous"},
    {"key": "age","id_selector": "age-select", 'valueAll': "Tous"},
    {"key": "collection","id_selector": "collection-select", 'valueAll': "Toutes"},
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

        let option = document.createElement('option')
        option.setAttribute('value', 'all');
        option.textContent = selector['valueAll']
        document_selector.append(option)
    
        data_filtered.map(data =>{
            let option = document.createElement('option')
            option.setAttribute('value', data);
            option.textContent = data
            document_selector.append(option)
        })
    })

}

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
        if (document_selector.value!=='all') {
            books = [...books.filter(book=>{return book[selector['key']]===document_selector.value})]
        }
    })

    let filterResultsString =`<ol>`;
    books.map(book => {
        filterResultsString += `
        <li><a href = "books/${book.slug}.html">
            <div>
                <img src=${book.image} alt="${book.title} cover"/>
            </div>
            <p class="book_title">${book.title}</p>
        </a></li>`
    })
    filterResultsString += `</ol>`;
    filter_results.innerHTML = filterResultsString

}


async function init() {
    await initCatalogue()
    await displayResults()
}

init()