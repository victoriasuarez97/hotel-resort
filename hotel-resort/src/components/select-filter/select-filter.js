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
  lista,
  filtrar,
  stateFromDate,
  stateToDate,
  stateCountryFilter,
  statePriceFilter,
  stateSizeFilter,
}) => {
  let [option, setOption] = useState("");

  /**
   * @description Función optionSelected para determinar de qué filtro proviene el
   * event.target.value para realizar el filtrado
   * @param e Objeto evento
   **/
  const optionSelected = (e) => {
    setOption(e.target.value);

    if (lista[0] === "Todos los países") {
      filterByCountry(e);
    } else if (lista[0] === "Todos los precios") {
      filterByPrice(e);
    } else if (lista[0] === "Todos los tamaños") {
      filterBySize(e);
    }
  }

  /**
   * @description Función matchPrice para matchear el precio proveniente de data.js
   * junto con el event.target.value seleccionado del filtro.
   * @param price Cargado con el price proveniente de data.js
   **/
  const matchPrice = (price) => {
    switch (price) {
      case 1:
        price = "$";
        break;

      case 2:
        price = "$$";
        break;

      case 3:
        price = "$$$";
        break;

      case 4:
        price = "$$$$";
        break;

      default:
        price = "Todos los precios";
        break;
    }

    return price;
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
      return "Todos los tamaños";
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
        return statePriceFilter === "Todos los precios"
          ? hotel
          : matchPrice(hotel.price) === statePriceFilter;
      })
      .filter((hotel) => {
        return stateSizeFilter === "Todos los tamaños"
          ? hotel
          : matchHotelSize(hotel.rooms) === stateSizeFilter;
      })
      .filter((hotel) => {
        return stateFromDate && stateToDate
          ? (stateFromDate >= hotel.availabilityFrom
          && stateToDate <= hotel.availabilityTo)
          : hotel
      });
      
    filtrar(newHotelsList, e.target.value);
  };

  const filterByPrice = (e) => {
    let newHotelsList = hotelsData
      .filter((hotel) => {
        return e.target.value === "Todos los precios"
          ? hotel
          : matchPrice(hotel.price) === e.target.value;
      })
      .filter((hotel) => {
        return stateCountryFilter === "Todos los países"
          ? hotel
          : hotel.country === stateCountryFilter;
      })
      .filter((hotel) => {
        return stateSizeFilter === "Todos los tamaños"
          ? hotel
          : matchHotelSize(hotel.rooms) === stateSizeFilter;
      })
      .filter((hotel) => {
        return stateFromDate && stateToDate
          ? (stateFromDate >= hotel.availabilityFrom
          && stateToDate <= hotel.availabilityTo)
          : hotel
      });

    filtrar(newHotelsList, e.target.value);
  };

  const filterBySize = (e) => {
    let newHotelsList = hotelsData
      .filter((hotel) => {
        return e.target.value === "Todos los tamaños"
          ? hotel
          : matchHotelSize(hotel.rooms) === e.target.value;
      })
      .filter((hotel) => {
        return stateCountryFilter === "Todos los países"
          ? hotel
          : hotel.country === stateCountryFilter;
      })
      .filter((hotel) => {
        return statePriceFilter === "Todos los precios"
          ? hotel
          : matchPrice(hotel.price) === statePriceFilter;
      })
      .filter((hotel) => {
        return stateFromDate && stateToDate
          ? (stateFromDate >= hotel.availabilityFrom
          && stateToDate <= hotel.availabilityTo)
          : hotel
      });

    filtrar(newHotelsList, e.target.value);
  };

  return (
    <select onChange={optionSelected} value={option}>
      {
        lista.map((option, i) => (
          <option key={i} value={option}>{option}</option>
        ))
      }
    </select>
  );
};
