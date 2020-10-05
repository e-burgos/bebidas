import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Creamos el context
export const ModalContext = createContext();

const ModalProvider = (props) => {

    // state del context
    const [ idreceta, guardarIdReceta ] = useState(null);
    const [ info, guardarReceta ] = useState([]);

    useEffect(() => {
        const obtenerReceta = async() => {
            if(!idreceta) return null;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;

            const resultado = await axios.get(url);
            guardarReceta(resultado.data.drinks[0]);
        }
        obtenerReceta();
    }, [idreceta]);

    return ( 
        <ModalContext.Provider
            value={{
                info,
                guardarReceta,
                guardarIdReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;