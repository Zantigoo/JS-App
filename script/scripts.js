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
                    detailsUrl: item.url
                };
                add(pokemon);
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
            item.artworkUrl = details.sprites.other.dream_world.front_default;
        }).catch(function(e) {
            console.error(e);
        })
    }

    function showDetails(selectedPokemon) {
        loadDetails(selectedPokemon).then(function () {
            showModal(selectedPokemon);
        });
    }
    
    //Modal Stuff ===============================================
    let modalContainer = document.querySelector('#modal-container');
    function showModal(selectedPokemon) {

        let pokemonTypes= modalContainer.querySelector(".type-list")
        let pokemonName = modalContainer.querySelector(".pkmn-name")
        let pokemonAbilities = modalContainer.querySelector(".ability-list")
        let pokemonWeight = modalContainer.querySelector(".pkmn-weight")
        let pokemonHeight = modalContainer.querySelector(".pkmn-height")
        let pokemonArt = modalContainer.querySelector(".pkmn-art")


        //Name & Artwork

        pokemonName.innerText = selectedPokemon.name;

        pokemonArt.setAttribute('src', selectedPokemon.artworkUrl);
        pokemonArt.setAttribute('alt','Artwork of '+selectedPokemon.name+'.')

        //Types & Abilities 

        pokemonTypes.innerHTML = '';
        selectedPokemon.types.forEach((type) => {
          console.log(type.type.name);
          let listItem = document.createElement("li");
          listItem.innerText = type.type.name;
          pokemonTypes.appendChild(listItem);
        });

        pokemonAbilities.innerHTML = '';
        selectedPokemon.abilities.forEach((ability) => {
            console.log(ability.ability.name);
            let listItem = document.createElement("li");
            listItem.innerText = ability.ability.name;
            pokemonAbilities.appendChild(listItem);
        });

        //Height & Weight

        pokemonWeight.innerText = selectedPokemon.weight / 10 + ' KG'
        pokemonHeight.innerText = selectedPokemon.height / 10 + " M"

        //Close Button
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', closeModal);

        // Presto, now you can see it.
        modalContainer.classList.add('visible');
    }
    function closeModal() {
        modalContainer.classList.remove('visible');
    }
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('visible')){
            closeModal();
        }
    });
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            closeModal();
        }
    })
    //end of modal stuff =======================================

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

