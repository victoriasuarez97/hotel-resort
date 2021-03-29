import React, { useState } from "react";
import { HotelFeatures } from "../hotel-features/hotel-features";
import { ModalBookHotel } from "../modal-book-hotel/modal-book-hotel";

import Bedroom from "../../assets/icons/big-bed-with-one-pillow.svg";
import Location from "../../assets/icons/location-pin.svg";
import Price from "../../assets/icons/dollar-tag.svg";

import "./hotel.scss";

/**
 * @description componente para la card de los hoteles provenientes del data.js
 * @params hotel, recibe la data de los hoteles desde su padre, hotel.js
 *         dateFromChosen, recibe fecha seleccionada de ingreso desde su padre, hotel.js
 *         dateToChosen, recibe fecha seleccionada de salida desde su padre, hotel.js
 **/

export const Hotel = ({ hotel, dateFromChosen, dateToChosen }) => {
  const [showModal, setShowModal] = useState(false);

  /**
   * For loop para mostrar íconos de precio según el número proveniente
   * de daja.js de la propiedad price.
   **/
  const prices = [];
  for (let i = 0; i < hotel.price; i++) {
    prices.push(<img src={Price} alt="price" key={i} />);
  }

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
        <div className="price-wrapper">{prices}</div>
        <button
          onClick={() =>
            dateFromChosen && dateToChosen
              ? setShowModal(true)
              : setShowModal(false)
          }
        >
          Reservar
        </button>
      </div>
      <ModalBookHotel
        hotel={hotel}
        showModal={showModal}
        setShowModal={setShowModal}
        dateFromChosen={dateFromChosen}
        dateToChosen={dateToChosen}
      />
    </div>
  );
};
