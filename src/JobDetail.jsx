import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';


export default function() {
    const pokemonName = useParams().pokemonName;

    function findPokemonDetails() {

        axios.get('http://localhost:8000/api/pokemon/find/' + pokemonName)
            .then(response => setPokemon(response.data))
            .then(error => console.log("Could not find that job"));

    }


    const [pokemon, setPokemon] = useState(null);
    useEffect(findPokemonDetails, []);


    const pokemonComponent = pokemon ? 
        (<><div>
            Pokemon Name: {pokemon.name}
        </div>
        <div>
            Pokemon Health: {pokemon.health} 
        </div></>) :
        (<div> No Pokemon found </div>);

    return (
        <div>
            {pokemonComponent}
        </div>
    )
}