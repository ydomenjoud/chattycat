async function fetchDatas() {
    let response = await fetch("/books.json")
    let books = await response.json()
    return books
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

async function initCatalogue(books, selectors) {

    selectors.map(selector => {

        let data_filtered=[];
        //getting of value possible for selector
        if (selector['isArray']) {
            let allDatas = [];
            books.map(book => {
                allDatas = [...allDatas, ...book[selector['key']].split(", ")]
                })
            data_filtered = allDatas.filter(onlyUnique)
        }
        else {
            data_filtered = books.map(book => {return book[selector['key']]}).filter(onlyUnique)
        }

        let document_selector = document.getElementById(selector['id_selector']);
        const selectedValue = document_selector.value
        document_selector.innerHTML = "";

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
        if (selectedValue) {
            document_selector.value = selectedValue
        }
    })
}

async function displayResults(books, selectors) {

    selectors.map(selector => {
        let document_selector = document.getElementById(selector['id_selector']);
        if (document_selector.value!=='all') {
            if (selector['isArray']) {
                books = [...books.filter(book=>{return book[selector['key']].includes(document_selector.value)})]
            }
            else {
                books = [...books.filter(book=>{return book[selector['key']]===document_selector.value})]
            }
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
    const filter_results = document.getElementById("filter_results")
    filter_results.innerHTML = filterResultsString

    return books
}