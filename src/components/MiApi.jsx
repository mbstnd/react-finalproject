import { useState, useEffect } from "react";

const Api = () => {
    //cree estado para almacenar toda la información
    const [pokemonesTotales, setPokemonesTotales] = useState([]);

    /* cree estado donde guardo información de la api para más adelante mostrarla de forma dinámica */
    const [pokemonesFiltrados, setPokemonesFiltrados] = useState([]); //guardar array ya procesado

    //cree una variable para guardar lo que se ingrese en el input
    const [value, setValue] = useState("");

    /* cree una variable para guardar el select en un estado*/
    const [orden, setOrden] = useState("ascender");

    /* cree useEffect informacionApiPoke y se ejecuta cuando el componente cargue por primera vez pasando un array vacío */
    useEffect(() => {
        getInfoApiPoke();
    }, []);

    //cree useEffect para filtrar la información de la api
    useEffect(() => {
        filterPokemones();
    }, [value]);

    //cree useEffect para ordenar la información de la api
    useEffect(() => {
        sortInformacion();
    }, [orden]);

    //cree la siguiente sintaxis con el metodo fech para llamar a la Api
    const getInfoApiPoke = async () => {
        const url = "https://pokeapi.co/api/v2/pokemon?limit=150";

        /* hice la petición con fetch para que nos de una respuesta a la url*/
        const respuesta = await fetch(url);

        // Transformación de la respuesta a json
        const json = await respuesta.json();

        const pokemonesOrdenados = json.results.sort((a, b) => a.name.localeCompare(b.name));
        setPokemonesTotales(pokemonesOrdenados);
        setPokemonesFiltrados(pokemonesOrdenados);
    };

    /* cree una función para filtrar por nombre*/
    const filterPokemones = () => {
        //Guarde el value del input con toLowerCase (convierta una cadena de texto en letras minuscula)
        const buscar = value.toLowerCase();
        //guarde los pokemones filtrados en una variable sobre pokemonesTotales que es el array de pokemones y desde ahi retorna cuyo nombre escribas en el input
        const filtrar = pokemonesTotales.filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(buscar);
        });
        setPokemonesFiltrados(filtrar);
    };

    //cree una función sort que ordena los elementos de la array locamente y devuelve el arreglo ordenado
    const sortInformacion = () => {
        const pokemonesAOrdenar = [...pokemonesFiltrados]
        let pokemonesOrdenados = []
        if (orden === "ascender") {
            //funcion localeCom permite comparar string para ver si son identicos
            pokemonesOrdenados = pokemonesAOrdenar.sort((a, b) => a.name.localeCompare(b.name));
        } else {
            pokemonesOrdenados = pokemonesAOrdenar.sort((a, b) => b.name.localeCompare(a.name));
        }

        setPokemonesFiltrados(pokemonesOrdenados)
    };


    return (
        <main className="contenedor">

            <div className="pokemones">
                <h2>Listado de Pokemón</h2>
                <article className="elementInput">
                    <input type="text" className="nombrePokemones"
                        placeholder="Buscar Pokemón"
                        onChange={(e) => setValue(e.target.value)} // el evento onChange ocurre cuando se ingresa un texto y cambia de alguna manera//
                    />

                    <select onChange={(e) => setOrden(e.target.value)}>
                        <option value="ascender">Orden Ascendente</option>
                        <option value="descender">Orden Descendente</option>
                    </select>
                </article>
                <ul>
                    {/* Recorro la array de pokemones para imprimir resultados */}
                    {/* método.map recibe dos parámetros el primero el elemento  pokemon y el indice permite mostrar el número de la posición del elemento */}
                    {/*la key es esencial para mostrar los datos de un array y para detectar que items han cambiado*/}

                    {pokemonesFiltrados.map((pokemon, indice) => {
                        return (
                            <div key={indice}>
                                <li>{pokemon.name}</li>
                            </div>
                        );
                    })}
                </ul>
            </div>
        </main>
    );
};

export default Api;

