import React, { useState } from "react";
import { hotelsData } from "../../data";

import straightIcon from "../../assets/icons/straight.svg";

import "./date-filter.scss";

export const DateFilter = ({ id, filtrar, stateFromDate, stateToDate }) => {
  let [availableDate, setAvailableDate] = useState("");
  const [openModal, setOpenModal] = useState(false);

  /**
   * @description función que trae la fecha seleccionada en el input date,
   * y la manda a su respecto filtrado de acuerdo al id del input.
   * @param e objeto evento
   **/
  const dateSelected = (e) => {
    const dateChosen = e.target.value;
    const today = new Date().toJSON().slice(0, 10).replace(/-/g, "-");

    if (dateChosen < today) {
      setOpenModal(true);
    } else {
      setAvailableDate(dateChosen);
      const dateChosenAsUnix = new Date(
        dateChosen.replaceAll("-", "/")
      ).getTime();

      if (id === "date-from") {
        filterByFromDate(dateChosenAsUnix);
      } else {
        filterByToDate(dateChosenAsUnix);
      }
    }
  };

  /**
   * @description filterBy... función para filtrar y llevar la data a su componente padre,
   * para que se vea reflejada en la vista.
   * @param dateChosenAsUnix fecha seleccionada en tiempo unix.
   **/
  const filterByFromDate = (dateChosenAsUnix) => {
    let hotelsFiltered = hotelsData.filter((hotel) => {
      return (
        hotel.availabilityFrom >= dateChosenAsUnix &&
        stateToDate < hotel.availabilityTo
      );
    });

    filtrar(hotelsFiltered, dateChosenAsUnix);
  };

  const filterByToDate = (dateChosenAsUnix) => {
    let hotelsFiltered = hotelsData.filter((hotel) => {
      return (
        hotel.availabilityFrom >= stateFromDate &&
        dateChosenAsUnix < hotel.availabilityTo
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
          <button onClick={() => setOpenModal(false)}>Aceptar</button>
        </div>
      </div>
      <div>
        <input type="date" value={availableDate} onChange={dateSelected} />
      </div>
    </div>
  );
};
