import React, { useState } from "react";
import { hotelsData } from "../../data";

import "./date-filter.scss";

export const DateFilter = ({
  id,
  date,
  filtrar,
  stateFromDate,
  stateToDate,
}) => {
  let [availableDate, setAvailableDate] = useState();

  /**
   * @description función que trae la fecha seleccionada en el input date,
   * y la manda a su respecto filtrado de acuerdo al id del input.
   * @param e objeto evento
   **/
  const dateSelected = (e) => {
    const dateChosen = e.target.value;
    const today = new Date().toJSON().slice(0, 10).replace(/-/g, "-");

    if (dateChosen < today) {
      alert("Tu fecha de ingreso debe ser mayor que la actual");
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
        dateChosenAsUnix < hotel.availabilityTo
      );
    });

    console.log(hotelsFiltered);
    filtrar(hotelsFiltered, dateChosenAsUnix);
  };

  const filterByToDate = (dateChosenAsUnix) => {
    let hotelsFiltered = hotelsData.filter((hotel) => {
      return (
        hotel.availabilityFrom >= dateChosenAsUnix &&
        dateChosenAsUnix < hotel.availabilityTo
      );
    });

    console.log(hotelsFiltered);
    filtrar(hotelsFiltered, dateChosenAsUnix);
  };

  return <input type="date" value={availableDate} onChange={dateSelected} />;
};
