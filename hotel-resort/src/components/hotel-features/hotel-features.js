import React from "react";

import "./hotel-features.scss";

/**
 * @description componente wrapper para presentar las características de los hoteles:
 * - Cantidad de habitaciones
 * - Locación.
 **/

export const HotelFeatures = ({ iconRoom, rooms, iconLocation, location }) => {
  return (
    <>
      <div className="option-container">
        <img src={iconRoom} alt="icon" />
        <p className="option-text">{`${rooms} Habitaciones`}</p>
      </div>

      <div className="option-container">
        <img src={iconLocation} alt="icon" />
        <p className="option-text">{location}</p>
      </div>
    </>
  );
};
