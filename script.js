function getPost(name) {
	return new Promise((resolve,reject)=>{
		fetch(`https://api.github.com/search/repositories?q=${name}&sort=stars&order=desc`)
		.then(response => response.text())
		.then(post => resolve(JSON.parse(post)))
		.catch(e => console.log(e));
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
        
    


const container = document.querySelector('.container')

function cardTemplate (el) {
    const card = document.createElement('div')
    card.classList.add('card');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const article = document.createElement('p');
    article.classList.add('card-text');
    article.textContent = `Name:${el.name}`;
    cardBody.appendChild(article);
    const article2 = document.createElement('p');
    article2.textContent = `Owner:${el.owner.login}`;
    cardBody.appendChild(article2);
    const article3 = document.createElement('p');
    article3.textContent = `Stars:${el.stargazers_count}`;
    cardBody.appendChild(article3);
    card.appendChild(cardBody);
    const btnDelete = document.createElement('button-delete')
    btnDelete.textContent = 'X';
    btnDelete.onclick = function(){
        btnDelete.parentElement.remove();        
    }
    card.appendChild(btnDelete)
    return card
    }



function showSearchResults (searchResults) {
    const resultsList = document.createElement('div')
    resultsList.classList.add('resultsList');
    let resultsArray = searchResults.items;
    const art = document.createElement('p');
    art.number = 0;
    art.textContent = resultsArray[0].name;
    resultsList.appendChild(art);
 
    const art1 = document.createElement('p');
    art1.number = 1;
    art1.textContent = resultsArray[1].name;
    resultsList.appendChild(art1);
   
    const art2 = document.createElement('p');
    art2.number = 2;
    art2.textContent = resultsArray[2].name;
    resultsList.appendChild(art2);
    
    const art3 = document.createElement('p');
    art3.number = 3;
    art3.textContent = resultsArray[3].name;
    resultsList.appendChild(art3);
    
    const art4 = document.createElement('p');
    art4.number = 4;
    art4.textContent = resultsArray[4].name;
    resultsList.appendChild(art4);
    console.log(resultsList)

    resultsList.onclick = function(event){
        let target = event.target;
        createPost(resultsArray[target.number]);
        console.log(target.number)
    }
    container.insertAdjacentElement('afterbegin',resultsList);
}

function createPost(response){
        let card = cardTemplate(response);
        console.log(card)
        input.value = '';
        container.insertAdjacentElement('beforeend',card);
        const searchResults = document.querySelector('.resultsList')
        searchResults.remove()
    };

  


async function searchRepos (searchReqest){ 
  let res = await getPost(searchReqest);
  console.log(res)
  console.log(res.items[2].name)
  showSearchResults(res)
}

function getSearchRequest() {
    var searchRequest = input.value;
    const searchResults = document.querySelector('.resultsList')
    if (searchResults) searchResults.remove()
    searchRepos(searchRequest)
  }

const input = document.querySelector('.input');
const debouncedFn = debounce(getSearchRequest,1000)
input.addEventListener('keyup', debouncedFn);

