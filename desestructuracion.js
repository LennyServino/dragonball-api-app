//desestructuracion de arreglos y objetos
/*
    es la forma como podemos extraer ciertos elementos de un arreglo o de un objeto, la podemos almacenar en una variable
 */

    const pokemon = {
        name: 'pikachu',
        type: 'electric',
        id: 12,
        abilities: ['static', 'lightning rod', 'surge surfer'],
    }

    pokemon.type; // electric
    export const { name, type, id, abilities } = pokemon;

    export const [item1] = abilities;