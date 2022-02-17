import { useEffect, useState } from "react"
import { fetchAllPokemons } from "../helpers/fetchAllPokemons";
import { PokemonDetail } from "../interfaces/fetchAllPokemonResponse";


export const usePokemonDetail = (url: string) => {

    const [isLoading, setisLoading] = useState(true);
    const [pokemon, setPokemon] = useState<PokemonDetail[]>([])

    useEffect(() => {
        // fetchAllPokemons()
        //     .then(pokemons => {
        //         setisLoading(false);
        //         setPokemons( pokemons);
        //     })
    }, [])

    return {
        isLoading
        // ,
        // pokemons
    }

}