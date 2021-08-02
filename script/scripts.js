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

    return {
        add: add,
        getAll: getAll
    };
})();

// Populates page with entries into the array with needed tags

pokeRepo.getAll().forEach(dexDetails);

function dexDetails(list) {
   document.write(
    '<p class="entry">Name<span class="name">: '
    + list.name
    + ' </span> |'
    + ' Types: <span class="types">' 
    + list.types 
    + '</span> | Height: <span class="height">' 
    + list.height 
    + '</span>m.' 
    );
    // Puts a little star next to pokemon over a metre
    if (list.height > 1) {
        document.write(' <span title="Big guy!">⭐</span></p>');
    } else {
        document.write('</p>');
    }
}

// Sanitizes add function


