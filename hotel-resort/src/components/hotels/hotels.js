import React, { useState } from "react";
import { hotelsData } from "../../data";
import { Hotel } from "../hotel/hotel";
import { SelectFilter } from "../select-filter/select-filter";
import { DateFilter } from "../date-filter/date-filter";

import SadFace from "../../assets/icons/sad.svg";

import "./hotels.scss";

/**
 * @description componente para mostrar los filtros
 * y el mapeo de los hoteles de este componente
 * padre a su hijo, hotel.js
 **/

export const Hotels = () => {
  const [data, setData] = useState(hotelsData);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [country, setCountry] = useState("Todos los países");
  const [price, setPrice] = useState("Cualquier precio");
  const [size, setSize] = useState("Cualquier tamaño");

  /**
   * @description filteredBy... función para recibir los hoteles filtrados.
   * @param {array} hotelsFiltered representa los hoteles filtrados provenientes
   *        del componente Select, recibidos desde la prop filtrar y seteado con el estado
   *        del total de los hoteles
   *        {string} state representa el input seleccionado por el usuario,
   *        para que se tenga en cuenta con el resto de los filtros.
   **/
  const filteredHotelsByFromDate = (hotelsFiltered, state) => {
    setDateFrom(state);
    setData(hotelsFiltered);
  };

  const filteredHotelsByToDate = (hotelsFiltered, state) => {
    setDateTo(state);
    setData(hotelsFiltered);
  };

  const filteredHotelsByCountry = (hotelsFiltered, state) => {
    setCountry(state);
    setData(hotelsFiltered);
  };

  const filteredHotelsByPrice = (hotelsFiltered, state) => {
    setPrice(state);
    setData(hotelsFiltered);
  };

  const filteredHotelsBySize = (hotelsFiltered, state) => {
    setSize(state);
    setData(hotelsFiltered);
  };

  /**
   * @description función para acción de botón y limpiar filtros.
   **/

  const clearFilter = () => {
    setData(hotelsData);
  };

  /**
   * @description formatDateToShow, función para formatear fechas para mostrar en el inicio al usuario
   * cuando se comienza a seleccionar las fechas.
   * @returns {array} fechas dateFrom y dateTo formateadas en un array.
   **/
  const formatDateToShow = () => {
    let dateFromFormatted;
    let dateToFormatted;

    const dateFromUnixToDate = new Date(dateFrom);
    dateFromFormatted = `${dateFromUnixToDate.getDate()}/${
      dateFromUnixToDate.getMonth() + 1
    }/${dateFromUnixToDate.getYear() - 100}`;

    const dateToUnixToDate = new Date(dateTo);
    dateToFormatted = `${dateToUnixToDate.getDate()}/${
      dateToUnixToDate.getMonth() + 1
    }/${dateToUnixToDate.getYear() - 100}`;

    return [dateFromFormatted, dateToFormatted];
  };

  const dates = formatDateToShow();

  return (
    <>
      <div className="subheader-container">
        <p className="subheader-text">
          ¡Mirá los hoteles que tenemos para vos!
        </p>

        <div className="filter-wrapper">
          <p className="filter-header">Elegí según tu preferencia :)</p>
          <p className="filter-description">
            {dateTo
              ? `Elegiste reservar desde ${dates[0]} hasta ${dates[1]} en ${country}`
              : ""}
          </p>
          <form>
            <div className="filters">
              <div className="date-wrapper">
                <label htmlFor="date-from">Ingreso</label>
                <DateFilter
                  id="date-from"
                  filtrar={filteredHotelsByFromDate}
                  stateFromDate={dateFrom}
                  stateToDate={dateTo}
                />
              </div>
              <div className="date-wrapper">
                <label htmlFor="date-from">Salida</label>
                <DateFilter
                  id="date-to"
                  filtrar={filteredHotelsByToDate}
                  stateFromDate={dateFrom}
                  stateToDate={dateTo}
                />
              </div>
              <SelectFilter
                defaultValue="Todos los países"
                firstValue="Argentina"
                secondValue="Brasil"
                thirdValue="Chile"
                forthValue="Uruguay"
                filtrar={filteredHotelsByCountry}
                stateFromDate={dateFrom}
                stateToDate={dateTo}
                stateCountryFilter={country}
                statePriceFilter={price}
                stateSizeFilter={size}
              />
              <SelectFilter
                defaultValue="Cualquier precio"
                firstValue="$"
                secondValue="$$"
                thirdValue="$$$"
                forthValue="$$$$"
                filtrar={filteredHotelsByPrice}
                stateFromDate={dateFrom}
                stateToDate={dateTo}
                stateCountryFilter={country}
                statePriceFilter={price}
                stateSizeFilter={size}
              />
              <SelectFilter
                defaultValue="Cualquier tamaño"
                firstValue="Hotel pequeño"
                secondValue="Hotel mediano"
                thirdValue="Hotel grande"
                filtrar={filteredHotelsBySize}
                stateFromDate={dateFrom}
                stateToDate={dateTo}
                stateCountryFilter={country}
                statePriceFilter={price}
                stateSizeFilter={size}
              />

              <button
                className="clear-filter"
                type="reset"
                onClick={clearFilter}
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hotels-container">
        {!data.length ? (
          <div className="not-available">
            <img src={SadFace} alt="sad face" className="sad-face-icon" />
            <p className="title-not-available">
              No hay hoteles disponibles para mostrar con estas opciones
            </p>
            <p className="subtitle-not-available">
              Por favor, cambiá alguna de las opciones previamente seleccionadas
              para que puedas seguir viendo nuestra selección de hoteles
            </p>
          </div>
        ) : (
          data.map((hotel, i) => (
            <Hotel
              hotel={hotel}
              key={i}
              dateFromChosen={dateFrom}
              dateToChosen={dateTo}
            />
          ))
        )}
      </div>
    </>
  );
};
