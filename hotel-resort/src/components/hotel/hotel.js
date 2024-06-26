import React, { useState } from "react";
import { HotelFeatures } from "../hotel-features/hotel-features";
import { ModalBookHotel } from "../modal-book-hotel/modal-book-hotel";

import Bedroom from "../../assets/icons/big-bed-with-one-pillow.svg";
import Location from "../../assets/icons/location-pin.svg";
import Price from "../../assets/icons/dollar-tag.svg";

import "./hotel.scss";

/**
 * @description componente para la card de los hoteles provenientes del data.js
 * @params {array} hotel, recibe la data de los hoteles desde su padre, hotels.js
 **/

export const Hotel = ({ hotel }) => {
	const [showModal, setShowModal] = useState(false);

	/**
	 * @description For loop para mostrar íconos de precio según el número proveniente
	 * de data.js de la propiedad price.
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
				<button onClick={() => setShowModal(true)}>Reservar</button>
			</div>
			<ModalBookHotel
				hotel={hotel}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
		</div>
	);
};
