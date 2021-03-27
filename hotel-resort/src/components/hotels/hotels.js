import React, { useState } from "react";
import { hotelsData } from "../../data";
import { Hotel } from "../hotel/hotel";
import { SelectFilter } from "../select-filter/select-filter";
import { DateFilter } from "../date-filter/date-filter";

import "./hotels.scss";

/**
 * @description componente para mostrar los filtros
 * y el mapeo de los hoteles de este componente
 * padre a su hijo, hotel.js
 **/

export const Hotels = () => {
  const [data, setData] = useState(hotelsData);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [country, setCountry] = useState("Todos los países");
  const [price, setPrice] = useState("Cualquier precio");
  const [size, setSize] = useState("Cualquier tamaño");

  /**
   * @description filteredBy... función para recibir los hoteles filtrados.
   * @param hotelsFiltered representa los hoteles filtrados provenientes
   * del componente Select, recibidos desde la prop filtrar y seteado con el estado
   * del total de los hoteles
   * @param state representa el input seleccionado por el usuario,
   * para que se tenga en cuenta con el resto de los filtros.
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
    return setData(hotelsData);
  };

  return (
    <>
      <div className="subheader-container">
        <p className="subheader-text">
          ¡Mirá los hoteles que tenemos para vos!
        </p>

        <div className="filter-wrapper">
          <p className="filter-header">Elegí según tu preferencia :)</p>
          <div className="filters">
            <div className="date-wrapper">
              <label htmlFor="date-from">Ingreso</label>
              <DateFilter
                id="date-from"
                date={dateFrom}
                filtrar={filteredHotelsByFromDate}
                stateFromDate={dateFrom}
                stateToDate={dateTo}
              />
            </div>
            <div className="date-wrapper">
              <label htmlFor="date-from">Salida</label>
              <DateFilter
                id="date-to"
                date={dateTo}
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
              stateCountryFilter={country}
              statePriceFilter={price}
              stateSizeFilter={size}
            />

            <button className="clear-filter" onClick={clearFilter}>
              Limpiar
            </button>
          </div>
        </div>
      </div>
      <div className="hotels-container">
        {data.map((hotel, i) => (
          <Hotel hotel={hotel} key={i} />
        ))}
      </div>
    </>
  );
};
