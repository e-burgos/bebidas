import React, { useContext, useState } from 'react';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    // state del formulario
    const [ busqueda, guardarBusqueda ] = useState({
        nombre: '',
        categoria: ''
    });

    // Tomamos las variables o funciones que necesitamos de los context que necesitemos 
    const { categorias } = useContext(CategoriasContext);
    const { buscarRecetas, guardarConsultar } = useContext(RecetasContext);

    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
        
    }

    return (
      <form className="col-12"
        onSubmit={e => {
            e.preventDefault();
            buscarRecetas(busqueda);
            guardarConsultar(true);
        }}
      >
        <fieldset className="text-center">
          <legend>Busca Bebidas por Categoría o Ingredientes</legend>
        </fieldset>
        <div className="row mt-4">
          <div className="col-md-4">
            <input
              name="nombre"
              type="text"
              className="form-control"
              placeholder="Buscar por Ingrediente"
              onChange={obtenerDatosReceta}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-control"
              name="categoria"
              onChange={obtenerDatosReceta}
            >
              <option value="">Selecciona una Categoría</option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.strCategory}
                  value={categoria.strCategory}
                >
                  {categoria.strCategory}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="submit"
              className="btn btn-block btn-success"
              value="Buscar Bebidas"
            />
          </div>
        </div>
      </form>
    );
}
 
export default Formulario;