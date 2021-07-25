// Sets list of Pokemon as array
// Array set as {name:"", types:['',''], height:#}
let pokemonList = [
    {name: "Mimikyu", types:[' Fairy',' Ghost'], height: 0.2},
    {name: "Shedinja", types:[' Bug',' Ghost'], height: 0.8},
    {name: "Gengar", types:[' Poison',' Ghost'], height:1.5},
    {name: "Gourgeist", types:[' Grass',' Ghost'], height: 1.1},
];

// Populates page with entries into the array with needed tags
for (let i = 0; i < pokemonList.length; i++) {
   document.write(
    '<p class="entry">Name<span class="name">: '
    + pokemonList[i].name
    + ' </span> |'
    + ' Types: <span class="types">' 
    + pokemonList[i].types 
    + '</span> | Height: <span class="height">' 
    + pokemonList[i].height 
    + '</span>m.' 
    );
    // Puts a little star next to pokemon over a metre
    if (pokemonList[i].height > 1) {
        document.write(' <span title="Big guy!">⭐</span></p>');
    } else {
        document.write('</p>');
    }
}

