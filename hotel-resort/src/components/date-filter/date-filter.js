import React, { useState } from "react";
import { hotelsData } from "../../data";

import straightIcon from "../../assets/icons/straight.svg";

import "./date-filter.scss";

export const DateFilter = ({
  id,
  filtrar,
  stateFromDate,
  stateToDate
}) => {
  let [availableDate, setAvailableDate] = useState("");
  const [openModal, setOpenModal] = useState(false);

  /**
   * @description función que trae la fecha seleccionada en el input date,
   * y la manda a su respecto filtrado de acuerdo al id del input.
   * @param {objet} e objeto evento
   **/
  const dateSelected = (e) => {
    const dateChosen = e.target.value;
    const dateChosenAsUnix = new Date(dateChosen.replace(/-/g, "/")).getTime();
    const today = new Date().getTime()

    if (dateChosenAsUnix < today) {
      setOpenModal(true);
    } else {
      setAvailableDate(dateChosen);
    }

    if (id === "date-from" && stateToDate) {
      filterByFromDate(dateChosenAsUnix);
    } else {
      filterByToDate(dateChosenAsUnix);
    }
  }

  /**
   * @description funcion para prevenir reload del website cuando se cierra el modal
   * de fecha elegida previa al día actual.
   * @param {object} e, objeto evento.
   */
  const handleClick = (e) => {
    e.preventDefault();
    setOpenModal(false);
  }

  /**
   * @description filterBy... función para filtrar y llevar la data a su componente padre,
   * para que se vea reflejada en la vista.
   * @param {number} dateChosenAsUnix fecha seleccionada en tiempo unix.
   **/
  const filterByFromDate = (dateChosenAsUnix) => {
    let hotelsFiltered = hotelsData.filter((hotel) => {
      return (
        dateChosenAsUnix >= hotel.availabilityFrom &&
        hotel.availabilityTo <= stateToDate  
      );
    });

    filtrar(hotelsFiltered, dateChosenAsUnix);
  };

  const filterByToDate = (dateChosenAsUnix) => {
    let hotelsFiltered = hotelsData.filter((hotel) => {
      return (
        stateFromDate >= hotel.availabilityFrom &&
        hotel.availabilityTo <= dateChosenAsUnix
      );
    });

    filtrar(hotelsFiltered, dateChosenAsUnix);
  };

  return (
    <div className="date-wrapper">
      <div className={`wrong-date-modal-wrapper ${openModal ? "open" : ""}`}>
        <div className="wrong-date">
          <img
            src={straightIcon}
            alt="straight face"
            className="straight-icon"
          />
          <h3>Tu fecha de ingreso debe ser mayor a la actual</h3>
          <button onClick={handleClick}>Aceptar</button>
        </div>
      </div>
      <div>
        <input type="date" value={availableDate} onChange={dateSelected} />
      </div>
    </div>
  );
};
