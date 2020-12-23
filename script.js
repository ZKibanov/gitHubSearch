function getPost(name) {
	return new Promise((resolve,reject)=>{
		fetch(`https://api.github.com/search/repositories?q=${name}&sort=stars&order=desc`)
		.then(response => response.text())
		.then(post => resolve(JSON.parse(post)))
		.catch(e => console.log('fuck'));
		})
    }

const debounce = (fn, debounceTime) => {
        let timer;
    function callback (){
        let func = () => {fn.apply(this,arguments)};
        clearTimeout(timer);
        timer = setTimeout(func, debounceTime);
        };
        return callback
    };
        
    function elementCreator(tag, cl, textContent=null) {
        const elem = document.createElement(tag);
        if (cl) elem.classList.add(cl);
        elem.textContent = textContent;
        return elem
    };    


const container = document.querySelector('.container')

function cardTemplate (el) { 
	if (el) {
    const card = elementCreator('div','card');

    const cardBody = elementCreator('div','card-body');

    const article = elementCreator('p','card-text', `Name:${el.name}`);
    cardBody.appendChild(article);

    const article2 = elementCreator('p','card-text', `Owner:${el.owner.login}`);
    cardBody.appendChild(article2);

    const article3 = elementCreator('p','card-text', `Stars:${el.stargazers_count}`);
    cardBody.appendChild(article3);
    card.appendChild(cardBody);

    const btnDelete = elementCreator('button','button-delete', 'x');
    btnDelete.onclick = function(){
        btnDelete.parentElement.remove();        
    }

    card.appendChild(btnDelete)
    return card
}
    }

function showSearchResults (searchResults) {
    const resultsList = elementCreator('div','resultsList')
    if (searchResults.items){
    let resultsArray = searchResults.items;
    for (let i = 0; i < 5;i += 1){
        let art = elementCreator('p',null, resultsArray[i].name);
        art.number = i;
        resultsList.appendChild(art);
    }

    resultsList.onclick = function(event){
        let target = event.target;
        createPost(resultsArray[target.number]);
    }

    container.insertAdjacentElement('afterbegin',resultsList);
}
}

function createPost(response){
	    if (response){
        const searchResults = document.querySelector('.resultsList')
        searchResults.remove()
        let card = cardTemplate(response);
        input.value = '';
        container.insertAdjacentElement('beforeend',card);
	}

    };

async function searchRepos (searchReqest){ 
  let res = await getPost(searchReqest);
  showSearchResults(res)
}

function getSearchRequest() {
    const searchRequest = input.value;
    const searchResults = document.querySelector('.resultsList')
    if (searchResults) searchResults.remove()
    searchRepos(searchRequest)
  }

const input = document.querySelector('.input')
const debouncedFn = debounce(getSearchRequest,300)
input.addEventListener('input', debouncedFn);

