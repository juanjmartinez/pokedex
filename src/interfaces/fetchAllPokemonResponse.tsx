

export interface FetchAllPokemonResponse {
    count: number;
    next: null;
    previous: null;
    results: SmallPokemon[];
}

export interface PokemonDetail {
    id: number
    abilities: [],
    base_experience: string,
    forms: [],
    game_indices: [],
    height: number,
    held_items: []

}

export interface SmallPokemon {
    name: string;
    url: string;
}

export interface Pokemon {
    id: string; 
    name: string;
    pic: string;
    url: string;
}