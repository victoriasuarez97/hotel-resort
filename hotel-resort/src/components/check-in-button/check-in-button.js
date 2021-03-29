import React, { useState } from "react";
import { ModalBookHotel } from "../modal-book-hotel/modal-book-hotel";

import "./check-in-button.scss";

/**
 * @description componente para botón con acción Reservar
 **/

export const CheckInButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Reservar</button>
      <ModalBookHotel showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};
