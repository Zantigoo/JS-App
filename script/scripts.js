// Sets list of Pokemon as array
// Array set as {name:"", types:['',''], height:#}

let pokeRepo = (function() { //Protects dex list for future additions
    let pokemonList = [ 
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
        let sideList = document.querySelector('.pkmn-list');
        let listItem = document.createElement('li');
        let btn = document.createElement('button');
        btn.innerText = pokemon.name;
        btn.classList.add('bar-buttons');
        listItem.appendChild(btn)
        sideList.appendChild(listItem);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
    };

})();


pokeRepo.getAll().forEach(function (pokemon) {
    pokeRepo.addListItem(pokemon);
});

