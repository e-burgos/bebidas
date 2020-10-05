import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Crear el Context
export const CategoriasContext = createContext();

// Provider es donde se encuentran las funciones y el state
const CategoriasProvider = (props) => {

    // state del Context
    const [ categorias, guardarCategorias ] = useState([]);

    // Ejecutar el llamado a la API TheCocktailDB
    useEffect(() => {
        const obtenerCategorias = async() => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;

            const listaCategorias = await axios.get(url);

            guardarCategorias(listaCategorias.data.drinks);
        }
        obtenerCategorias();
    }, []);

    return ( 
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
     );
}
 
export default CategoriasProvider;