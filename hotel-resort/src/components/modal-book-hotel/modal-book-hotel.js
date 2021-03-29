import React from "react";

import "./modal-book-hotel.scss";

/**
 * @description Componente para modal, previo a realizar la reserva del hotel
 * seleccionado.
 * @param hotel, recibe la data desde su hermano, hotel.js.
 *        showModal && setShowModal, recibe el estado del botón de reserva.
 *        dateFromChosen && dateToChosen, recibe el estado de la fecha seleccionada
 */

export const ModalBookHotel = ({
  hotel,
  showModal,
  setShowModal,
  dateFromChosen,
  dateToChosen,
}) => {
  const closeModal = () => {
    setShowModal(false);
  };

  const formatUnix = (date) => {
    const dateFormatted = new Date(date);
    const newDate = `
          ${dateFormatted.getDate()}
          /
          ${dateFormatted.getMonth() + 1}
          /
          ${dateFormatted.getYear() - 100}`;
    return newDate;
  };

  return (
    <div className={`modal-book-hotel-container ${showModal ? "open" : ""}`}>
      <div className="modal-book-hotel-wrapper">
        <h3>¿Estás seguro de realizar esta reserva?</h3>
        <p className="hotel-chosen">El hotel que elegiste es:</p>
        <div className="hotel-chosen-data">
          <p className="hotel-name">{hotel.name}</p>
          <p>{`Fecha de Ingreso: ${formatUnix(dateFromChosen)}`}</p>
          <p>{`Fecha de Ingreso: ${formatUnix(dateToChosen)}`}</p>
          <p>{`En: ${hotel.city}, ${hotel.country}`}</p>
        </div>
        <div className="buttons-wrapper">
          <button>Sí, quiero reservar</button>
          <button onClick={closeModal}>No, me arrepentí</button>
        </div>
      </div>
    </div>
  );
};
