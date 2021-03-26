import React, { useState } from "react";
import { hotelsData } from "../../data";

import "./select-filter.scss";

/**
 * @description componente donde se encuentran un único select
 * utilizado para los tres filtros, que no son de tipo date, que maneja la aplicación.
 * Este componente tiene todas las props necesarias para poder ser
 * reutilizado junto con la lógica para realizar los filtros.
 **/

export const SelectFilter = ({
  defaultValue,
  firstValue,
  secondValue,
  thirdValue,
  forthValue,
  filtrar,
  stateCountryFilter,
  statePriceFilter,
  stateSizeFilter,
}) => {
  let [option, setOption] = useState(undefined);

  /**
   * @description Función optionSelected para determinar de qué filtro proviene el
   * event.target.value para realizar el filtrado
   * @param e Objeto evento
   **/
  const optionSelected = (e) => {
    setOption(e.target.value);
    if (defaultValue === "Todos los países") {
      filterByCountry(e);
    } else if (defaultValue === "Cualquier precio") {
      filterByPrice(e);
    } else {
      filterBySize(e);
    }
  };

  /**
   * @description Función matchPrice para matchear el precio proveniente de data.js
   * junto con el event.target.value seleccionado del filtro.
   * @param price Cargado con el price proveniente de data.js
   **/
  const matchPrice = (price) => {
    let priceToMatch = price;

    switch (priceToMatch) {
      case 1:
        priceToMatch = "$";
        break;

      case 2:
        priceToMatch = "$$";
        break;

      case 3:
        priceToMatch = "$$$";
        break;

      case 4:
        priceToMatch = "$$$$";
        break;

      default:
        priceToMatch = "Cualquier precio";
        break;
    }

    return priceToMatch;
  };

  /**
   * @description Función matchHotelSize para matchear el precio proveniente de data.js
   * junto con el event.target.value seleccionado del filtro.
   * @param rooms Cargado con rooms proveniente de data.js
   **/
  const matchHotelSize = (rooms) => {
    if (rooms <= 10) {
      return "Hotel pequeño";
    } else if (rooms <= 20) {
      return "Hotel mediano";
    } else if (rooms > 20) {
      return "Hotel grande";
    } else {
      return "Cualquier tamaño";
    }
  };

  /**
   * @description funciones filterBy... lógica para realizar el filtrado según los
   * select seleccionados.
   * @param e objeto evento
   **/
  const filterByCountry = (e) => {
    let newHotelsList = hotelsData
      .filter((hotel) => {
        return e.target.value === "Todos los países"
          ? hotel
          : hotel.country === e.target.value;
      })
      .filter((hotel) => {
        return statePriceFilter === "Cualquier precio"
          ? hotel
          : matchPrice(hotel.price) === statePriceFilter;
      })
      .filter((hotel) => {
        console.log(stateSizeFilter, hotel.rooms);
        return stateSizeFilter === "Cualquier tamaño"
          ? hotel
          : matchHotelSize(hotel.rooms) === stateSizeFilter;
      });

    filtrar(newHotelsList, e.target.value);
  };

  const filterByPrice = (e) => {
    let newHotelsList = hotelsData
      .filter((hotel) => {
        return e.target.value === "Cualquier precio"
          ? hotel
          : matchPrice(hotel.price) === e.target.value;
      })
      .filter((hotel) => {
        return stateCountryFilter === "Todos los países"
          ? hotel
          : hotel.country === stateCountryFilter;
      })
      .filter((hotel) => {
        return stateSizeFilter === "Cualquier tamaño"
          ? hotel
          : matchHotelSize(hotel.rooms) === stateSizeFilter;
      });

    filtrar(newHotelsList, e.target.value);
  };

  const filterBySize = (e) => {
    let newHotelsList = hotelsData
      .filter((hotel) => {
        return e.target.value === "Cualquier tamaño"
          ? hotel
          : matchHotelSize(hotel.rooms) === e.target.value;
      })
      .filter((hotel) => {
        return stateCountryFilter === "Todos los países"
          ? hotel
          : hotel.country === stateCountryFilter;
      })
      .filter((hotel) => {
        return statePriceFilter === "Cualquier precio"
          ? hotel
          : matchPrice(hotel.price) === statePriceFilter;
      });

    filtrar(newHotelsList, e.target.value);
  };

  return (
    <select onChange={optionSelected} value={option}>
      <option value={defaultValue}>{defaultValue}</option>
      <option value={firstValue}>{firstValue}</option>
      <option value={secondValue}>{secondValue}</option>
      <option value={thirdValue}>{thirdValue}</option>
      <option value={forthValue}>{forthValue}</option>
    </select>
  );
};
