// Sets list of Pokemon as array
// Array set as {name:"", types:['',''], height:#}

let pokeRepo = (function() { //Protects dex list for future additions
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

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
        pokeRepo.loadDetails(pokemon).then(function() {
            let sideList = document.querySelector('#pkmn-list');
            let listItem = document.createElement('li');
            let btn = document.createElement('button');
            let sprite = document.createElement('img');
            btn.innerText = pokemon.name;
            sprite.setAttribute('src', pokemon.imageUrl);
            sprite.classList.add('list-sprite');
            listItem.classList.add('poke-entry');
            btn.classList.add('bar-buttons');
            btn.addEventListener('click', () => {
                showDetails(pokemon);
            });
            sprite.addEventListener('click', () => {
                showDetails(pokemon);
            });

            listItem.appendChild(sprite);
            listItem.appendChild(btn);
            sideList.appendChild(listItem);
        });
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
            item.artworkUrl = details.sprites.other['official-artwork']['front_default'];
            item.number = '#'+details.game_indices['19'].game_index;
            item.index = details.game_indices['19'].version.url;
        }).catch(function(e) {
            console.error(e);
        })
    }

    function showDetails(selectedPokemon) {
        loadDetails(selectedPokemon).then(function () {
            showModal(selectedPokemon);
        });
    }
    
    //Repurposed Modal code to display card info ===============================================
    
    let modalContainer = document.querySelector('#card');
    function showModal(selectedPokemon) {

        let pokemonTypes= modalContainer.querySelector(".type-list")
        let pokemonName = modalContainer.querySelector(".pkmn-name")
        let pokemonAbilities = modalContainer.querySelector(".ability-list")
        let pokemonWeight = modalContainer.querySelector(".pkmn-weight")
        let pokemonHeight = modalContainer.querySelector(".pkmn-height")
        let pokemonArt = modalContainer.querySelector(".pkmn-art")
        let pokemonNum = modalContainer.querySelector(".pkmn-num")


        //Name & Artwork & number

        pokemonName.innerText = selectedPokemon.name;
        pokemonNum.innerText = selectedPokemon.number;
        pokemonArt.setAttribute('src', selectedPokemon.artworkUrl);
        pokemonArt.setAttribute('alt','Artwork of '+selectedPokemon.name+'.')

        //Types & Abilities 

        pokemonTypes.innerHTML = '';
        selectedPokemon.types.forEach((type) => {
            console.log(type.type.name);
            let typesvg = document.createElement('img');
            switch (type.type.name) {
                case 'water':
                    svg = 'img/water.svg'
                    typesvg.classList.add('water');
                    typesvg.classList.add('type-img');
                    break;
                case 'bug':
                    svg = 'img/bug.svg'
                    typesvg.classList.add('bug');
                    typesvg.classList.add('type-img');
                    break;
                case 'dark':
                    svg = 'img/dark.svg';
                    typesvg.classList.add('dark');
                    typesvg.classList.add('type-img');
                    break;
                case 'dragon':
                    svg = 'img/dragon.svg';
                    typesvg.classList.add('dragon');
                    typesvg.classList.add('type-img');
                    break;
                case 'electric':
                    svg = 'img/electric.svg';
                    typesvg.classList.add('electric');
                    typesvg.classList.add('type-img');
                    break;
                case 'fairy':
                    svg = 'img/fairy.svg';
                    typesvg.classList.add('fairy');
                    typesvg.classList.add('type-img');
                    break;
                case 'fighting':
                    svg = 'img/fighting.svg';
                    typesvg.classList.add('fighting');
                    typesvg.classList.add('type-img');
                    break;
                case 'fire':
                    svg = 'img/fire.svg';
                    typesvg.classList.add('fire');
                    typesvg.classList.add('type-img');
                    break;
                case 'flying':
                    svg = 'img/flying.svg';
                    typesvg.classList.add('flying');
                    typesvg.classList.add('type-img');
                    break;
                case 'ghost':
                    svg = 'img/ghost.svg';
                    typesvg.classList.add('ghost');
                    typesvg.classList.add('type-img');
                    break;
                case 'grass':
                    svg = 'img/grass.svg';
                    typesvg.classList.add('grass');
                    typesvg.classList.add('type-img');
                    break;
                case 'ground':
                    svg = 'img/ground.svg';
                    typesvg.classList.add('ground');
                    typesvg.classList.add('type-img');
                    break;
                case 'ice':
                    svg = 'img/ice.svg';
                    typesvg.classList.add('ice');
                    typesvg.classList.add('type-img');
                    break;
                case 'normal':
                    svg = 'img/normal.svg';
                    typesvg.classList.add('normal');
                    typesvg.classList.add('type-img');
                    break;
                case 'poison':
                    svg = 'img/poison.svg';
                    typesvg.classList.add('poison');
                    typesvg.classList.add('type-img');
                    break;
                case 'psychic':
                    svg = 'img/psychic.svg';
                    typesvg.classList.add('psychic');
                    typesvg.classList.add('type-img');
                    break;
                case 'rock':
                    svg = 'img/rock.svg';
                    typesvg.classList.add('rock');
                    typesvg.classList.add('type-img');
                    break;
                case 'steel':
                    svg = 'img/steel.svg';
                    typesvg.classList.add('steel');
                    typesvg.classList.add('type-img');
                    break;
                default:
                    type.type.name;
                    break;
            }
            let listItem = document.createElement("li");
            typesvg.setAttribute('src', svg );
            typesvg.setAttribute('alt', type.type.name+' type pokemon');
            pokemonTypes.appendChild(listItem);
            listItem.appendChild(typesvg);
        });

        pokemonAbilities.innerHTML = '';
        selectedPokemon.abilities.forEach((ability) => {
            console.log(ability.ability.name);
            let listItem = document.createElement("li");
            listItem.classList.add('ability');
            listItem.innerText = ability.ability.name;
            pokemonAbilities.appendChild(listItem);
        });

        //Height & Weight

        pokemonWeight.innerText = selectedPokemon.weight / 10 + ' KG'
        pokemonHeight.innerText = selectedPokemon.height / 10 + " M"

    };

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

    let arrow = document.getElementById('arrow');
    let state = "open"
    
    let open = () => { //Open bar and push content
        document.getElementById('pkmn-list').style.width = "250px";
        document.getElementById('main').style.marginLeft = "280px";
        arrow.style.transform = "rotate(0deg)";
        return state = "open";  
        
    }

    let close = () => { //Close bar and pull content
        document.getElementById('pkmn-list').style.width = "0";
        document.getElementById('main').style.marginLeft = "30px";
        arrow.style.transform = "rotate(180deg)";
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

