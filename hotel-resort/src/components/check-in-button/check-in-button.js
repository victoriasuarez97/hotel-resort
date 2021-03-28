import React from "react";

import "./check-in-button.scss";

/**
 * @description componente para botón con acción Reservar
 **/

export const CheckInButton = () => {
  return (
    <button onClick={() => alert("Reserva realizada exitosamente!")}>
      Reservar
    </button>
  );
};
