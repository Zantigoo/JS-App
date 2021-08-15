// Sets list of Pokemon as array
// Array set as {name:"", types:['',''], height:#}

let pokeRepo = (function() { //Protects dex list for future additions
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//Gotta cut this during linting
    let oldpokemonList = [ 
        {name: "Mimikyu", types:['Fairy',' Ghost'], height: 0.2},
        {name: "Shedinja", types:['Bug',' Ghost'], height: 0.8},
        {name: "Gengar", types:['Poison',' Ghost'], height:1.5},
        {name: "Gourgeist", types:['Grass',' Ghost'], height: 1.1},
    ];

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

    // Populates side-bar with pokemon names.
    function addListItem(pokemon) {
        let sideList = document.querySelector('#pkmn-list');
        let listItem = document.createElement('li');
        let btn = document.createElement('button');
        btn.innerText = pokemon.name;
        btn.classList.add('bar-buttons');
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
                    detailsUrl: item.url,
                };
                add(pokemon);
            });
        }).catch(function(e) {
            console.log(e);
        })
    }
    
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.spirtes.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(e) {
            console.log(e);
        })
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        addListItem: addListItem,
        loadDetails:loadDetails
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

