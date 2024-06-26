import React, { useState } from "react";

import CoolFace from "../../assets/icons/cool.svg";

import "./modal-book-hotel.scss";

/**
 * @description Componente para modal, previo a realizar la reserva del hotel
 * seleccionado.
 * @param hotel, recibe la data desde su hermano, hotel.js.
 * @param showModal, recibe el estado del botón de reserva.
 * @param setShowModal, setea el estado del botón de reserva.
 */

export const ModalBookHotel = ({ hotel, showModal, setShowModal }) => {
	const [book, setBook] = useState(false);
	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div className={`modal-book-hotel-container ${showModal ? "open" : ""}`}>
			<div className="modal-book-hotel-wrapper">
				{book ? (
					<div className="booked-succesfully">
						<img src={CoolFace} alt="cool emoji" />
						<h3>¡La reserva se ha realizado con éxito!</h3>
						<p>
							Pronto te enviaremos un mail con toda la información de tu reserva
						</p>
						<button onClick={() => setShowModal(false)}>Aceptar</button>
					</div>
				) : (
					<>
						<h3>¿Estás seguro de realizar esta reserva?</h3>
						<p className="hotel-chosen">El hotel que elegiste es:</p>
						<div className="hotel-chosen-data">
							<p className="hotel-name">{hotel.name}</p>
							<p>{`En: ${hotel.city}, ${hotel.country}`}</p>
						</div>
						<div className="buttons-wrapper">
							<button onClick={() => setBook(true)}>Sí, quiero reservar</button>
							<button onClick={closeModal}>No, me arrepentí</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
