import React, {useContext, useState} from 'react';
import { ModalContext } from '../context/ModalContext';

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "fixed",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Receta = ({receta}) => {
  // Configuracion de Modal de Material UI
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Extraemos los valores del context
  const { info, guardarReceta, guardarIdReceta } = useContext(ModalContext);

  // Muestra y formatea los ingredientes
  const mostrarIngredientes = (info) => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (info[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            <small>
              {info[`strIngredient${i}`]} -> {info[`strMeasure${i}`]}
            </small>
          </li>
        );
      }
    }
    return ingredientes;
  };

  return (
    <div className="card text-center">
      <img
        src={receta.strDrinkThumb}
        className="card-img-top"
        alt={receta.strDrink}
      />
      <div className="card-body">
        <h5 className="card-title">{receta.strDrink}</h5>
      </div>
      <div className="card-footer bg-transparent">
        <button
          className="btn btn-block btn-success"
          onClick={() => {
            guardarIdReceta(receta.idDrink);
            handleOpen();
          }}
        >
          Ver Receta
        </button>
        <Modal
          open={open}
          onClose={() => {
            guardarIdReceta(null);
            guardarReceta({});
            handleClose();
          }}
        >
          <div style={modalStyle} className={classes.paper}>
            <button
              className="float-right btn btn-sm btn-success"
              onClick={() => {
                handleClose();
              }}
            >
              Volver
            </button>
            <h2 className="text-center">{info.strDrink}</h2>
            <h5 className="mt-4">
              Instrucciones: <small>{info.strInstructions}</small>
            </h5>
            <hr />
            <h5 className="text-center">Ingredientes y Cantidades</h5>
            <hr />
            <div className="row">
              <div className="col-md-7">
                <ul>{mostrarIngredientes(info)}</ul>
              </div>
              <div className="col-md-5">
                <img
                  className="img-fluid float-right rounded"
                  src={info.strDrinkThumb}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
 
export default Receta;