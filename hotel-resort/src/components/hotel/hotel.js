import React, { useState } from "react";
import { HotelFeatures } from "../hotel-features/hotel-features";

import Bedroom from "../../assets/icons/big-bed-with-one-pillow.svg";
import Location from "../../assets/icons/location-pin.svg";
import Price from "../../assets/icons/dollar-tag.svg";

import "./hotel.scss";

/**
 * @description componente para la card de los hoteles provenientes del data.js
 **/

export const Hotel = ({ hotel, dateFromChosen, dateToChosen }) => {
  const [showModal, setShowModal] = useState(false);

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

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="card-container">
      <img src={hotel.photo} alt="hotel" className="hotel-photo" />
      <div className="hotel-content">
        <h2>{hotel.name}</h2>
        <p className="hotel-description">{hotel.description}</p>
        <HotelFeatures
          iconRoom={Bedroom}
          rooms={hotel.rooms}
          iconLocation={Location}
          location={`${hotel.city}, ${hotel.country}`}
        />
        {hotel.price === 1 ? (
          <div className="price-wrapper">
            <img src={Price} alt="price" />
          </div>
        ) : hotel.price === 2 ? (
          <div className="price-wrapper">
            <img src={Price} alt="price" />
            <img src={Price} alt="price" />
          </div>
        ) : hotel.price === 3 ? (
          <div className="price-wrapper">
            <img src={Price} alt="price" />
            <img src={Price} alt="price" />
            <img src={Price} alt="price" />
          </div>
        ) : (
          <div className="price-wrapper">
            <img src={Price} alt="price" />
            <img src={Price} alt="price" />
            <img src={Price} alt="price" />
            <img src={Price} alt="price" />
          </div>
        )}
        <button onClick={() => setShowModal(true)}>Reservar</button>
      </div>
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
    </div>
  );
};
