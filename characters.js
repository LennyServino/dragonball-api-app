//async - await (promesas) (funciones asicronas)

//declarando una funcion asincronica para los datos de los personajes
export async function getAllCharacters() {
    try {
        const response = await fetch('https://dragonball-api.com/api/characters?limit=12');

        const data = await response.json();
        //console.log(data);

        //desestructurando el objeto data
        const { items } = data;

        //llamando al contenedor para la lista de personajes
        const dragonBallContainer = document.getElementById('list-dragon-ball');

        for (const character of items) {
            //accedemos al id y nombre de cada personaje
            const { id, name } = character;
            //console.log(`Personaje: ${name}, id: ${id}`);

            //realizar otro fetch a un nuevo endpoint
            const response_character = await fetch(`https://dragonball-api.com/api/characters/${id}`);

            const data_character = await response_character.json();
            //console.log(data_character);

            //desestructurando el objeto data_character
            const { name: nameCharacter, race, image, originPlanet, transformations } = data_character;

            //desestructurando el objeto originPlanet
            const { name: namePlanet } = originPlanet;

            const itemTransformation = transformations.map(({ name }) => name);
            //console.log(itemTransformation);

            //creando un nuevo elemento html (article)
            const article = document.createElement('article');
            article.innerHTML = `
                <div class="card">
                    <div class="card-header">
                        <img src="${image}" alt="${nameCharacter}" />
                    </div>
                    <div class="card-body">
                        <h4>${nameCharacter}</h4>
                        <p>Raza: ${race}</p>
                        <p>Planeta de origen: ${namePlanet}</p>
                        <p>Transformaciones: ${ itemTransformation.length > 0 ? itemTransformation.join(', ') : 'No hay transformaciones' }</p>
                    </div>
                </div>
            `;

            //agregando un hijo al contenedor de la lista de personajes
            dragonBallContainer.appendChild(article);
        }
    } catch (error) {
        console.log(`Error al obtener la data de dragon ball: ${error}`);
    }
}

//metodo para el consumo de planetas
export async function getPlanets() {
    try {
        const response = await fetch('https://dragonball-api.com/api/planets?limit=20');

        const data = await response.json();
        //console.log(data);

        //desestructurando el objeto data de planetas
        const { items } = data;

        //llamando al contendor de planetas
        const planetContainer = document.getElementById('planet');

        //llamando al contenedor para la lista de personajes
        const dragonBallContainer = document.getElementById('list-dragon-ball');

        //creando una etiqueta select
        const selectPlanet = document.createElement('select');
        selectPlanet.setAttribute('id', 'select-planet');
        selectPlanet.innerHTML = `
            <option value="">Todos los planetas</option>
        `;

        //llenando el select con los planetas
        for (const planet_data of items) {
            const { id, name } = planet_data;
            selectPlanet.innerHTML += `
                <option value="${id}">${name}</option>
            `;
        }
        planetContainer.appendChild(selectPlanet);

        //evento change para el select
        selectPlanet.addEventListener('change', (event) => {
            const planetId = event.target.value;
            dragonBallContainer.innerHTML = '';
            planetId !== '' ? getCharactersByPlanet(planetId) : getAllCharacters();
        });

    } catch (error) {
        console.log(`Error al obtener la data de planetas: ${error}`);  
    }
}

export async function getCharactersByPlanet(planetId) {
    try {
        const characterResponse = await fetch('https://dragonball-api.com/api/characters?limit=58');
        const characterData = await characterResponse.json();

        //desestructurando el objeto characterData
        const { items } = characterData;

        //llamando al contenedor para la lista de personajes
        const dragonBallContainer = document.getElementById('list-dragon-ball');

        //convertir a enteros los id de los planetas del select
        planetId = parseInt(planetId);

        for (const character of items) {
            const { id, name, race, image } = character;

            const characterPlanetResponse = await fetch(`https://dragonball-api.com/api/characters/${id}`);
            const characterPlanetData = await characterPlanetResponse.json();

            const { originPlanet, transformations } = characterPlanetData;
            const { id: planetIdCharacter, name: namePlanet } = originPlanet;

            const itemTransformation = transformations.map(({ name }) => name);

            if (planetIdCharacter === planetId) {
                //creando un nuevo elemento html (article)
                const article = document.createElement('article');
                article.innerHTML = `
                    <div class="card">
                        <div class="card-header">
                            <img src="${image}" alt="${name}" />
                        </div>
                        <div class="card-body">
                            <h4>${name}</h4>
                            <p>Raza: ${race}</p>
                            <p>Planeta de origen: ${namePlanet}</p>
                            <p>Transformaciones: ${ itemTransformation.length > 0 ? itemTransformation.join(', ') : 'No hay transformaciones' }</p>
                        </div>
                    </div>
                `;

                //agregando un hijo al contenedor de la lista de personajes
                dragonBallContainer.appendChild(article);
            }
            
        }
    } catch (error) {
        console.log(`Error al obtener los personajes del planeta: ${error}`);
    }
}