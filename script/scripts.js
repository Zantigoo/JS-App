let pokeRepo = (function() { 
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    //Add pokemon objects to array
    function add(item) {
        if (item.hasOwnProperty('name', 'types', 'height')) { //Sanitizes input (kinda)
            return ( //Checks for object in function
                typeof(item) == 'object' ? 
                pokemonList.push(item) : 'Invalid entry'
            );
        } else {
            console.log('Invalid Entry');
        }
    }

    //Fetches all the pokemon objects from the array
    function getAll() {
        return pokemonList;
    }

    // Populates side-bar with pokemon name & sprite.
    function addListItem(pokemon) {
        let url = pokemon.detailsUrl;
        let sideList = document.querySelector('#pkmn-list');
        let listItem = document.createElement('li');
        let btn = document.createElement('button');
        btn.innerText = pokemon.name;
        btn.classList.add('list-group-item');
        btn.classList.add('btn');
        btn.classList.add('bar-buttons');
        btn.setAttribute('data-toggle','modal');
        btn.setAttribute('data-target','#exampleModal');
        btn.addEventListener('click', () => {
            showDetails(pokemon);
        });
        listItem.appendChild(btn);
        sideList.appendChild(listItem);
    }

   
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                console.log(pokemon);
            });
        }).catch(function(e) {
            console.log(e);
        })
    }
    
    
    function loadDetails(item) {
        let url = item.detailsUrl;
        let name = item.name
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.name = name;
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
            item.abilities = details.abilities;
        }).catch(function(e) {
            console.log(e);
        })
    }

    function showModal(item) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        

        modalTitle.empty();
        modalBody.empty();

        let nameElement = $("<h1>"+item.name+"</h1>");
        let imageElementFront = $('<img class="modal-img" style="width:50%">');
        imageElementFront.attr("src", item.imageUrl);
        let heightElement = $("<p>"+"height : "+item.height+"</p>");
        let weightElement = $("<p>"+"weight : "+item.weight+"</p>");
        let typesElement = $("<p>"+"types : "+item.types+"</p>");

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
    }

    function showDetails(selectedPokemon) {
        loadDetails(selectedPokemon).then(function () {
            showModal(selectedPokemon);
        });
    }
    
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        addListItem: addListItem,
        loadDetails:loadDetails,
    };

})();


pokeRepo.loadList().then(function() {
    pokeRepo.getAll().forEach(function (pokemon) {
        pokeRepo.addListItem(pokemon);
    });
});


let navi = (function() {

    
    let state = "open"
    
    let open = () => { //Open bar and push content
        document.getElementById('pkmn-list').style.width = "180px";
        document.getElementById('main').style.marginLeft = "180px";
        return state = "open";  
        
    }

    let close = () => { //Close bar and pull content
        document.getElementById('pkmn-list').style.width = "0";
        document.getElementById('main').style.marginLeft = "0";
        return state = "close";
    }

    let toggle = () => {
        if (state === "close"){
                open();
                console.log('open')
        } else {
               close();
               console.log('close')
        }
    }

//Replace with CSS classes at some point

    return {
        toggle: toggle,
        open: open,
        close: close,
    };

})();

