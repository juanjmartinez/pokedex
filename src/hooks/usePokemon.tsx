import { useEffect, useState } from "react"
import { fetchAllPokemons } from "../helpers/fetchAllPokemons";
import { Pokemon } from "../interfaces/fetchAllPokemonResponse";


export const usePokemon = () => {

    const [isLoading, setisLoading] = useState(true);
    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    useEffect(() => {
        fetchAllPokemons()
            .then(pokemons => {
                setisLoading(false);
                setPokemons( pokemons);
            })
    }, [])

    return {
        isLoading,
        pokemons
    }

}