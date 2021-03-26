import React from "react";
import { CheckInButton } from "../check-in-button/check-in-button";
import { HotelFeatures } from "../hotel-features/hotel-features";

import Bedroom from "../../assets/icons/big-bed-with-one-pillow.svg";
import Location from "../../assets/icons/location-pin.svg";
import Price from "../../assets/icons/dollar-tag.svg";

import "./hotel.scss";

/**
 * @description componente para la card de los hoteles provenientes del data.js
 **/

export const Hotel = ({ hotel }) => {
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
        <CheckInButton />
      </div>
    </div>
  );
};
