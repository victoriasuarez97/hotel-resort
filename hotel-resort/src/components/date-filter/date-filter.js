import React, { useState } from "react";
import { hotelsData } from "../../data";

import straightIcon from "../../assets/icons/straight.svg";

import "./date-filter.scss";

export const DateFilter = ({
	id,
	filtrar,
	stateFromDate,
	stateToDate,
	stateCountryFilter,
	statePriceFilter,
	stateSizeFilter,
}) => {
	let [availableDate, setAvailableDate] = useState("");
	const [openModal, setOpenModal] = useState(false);

	/**
	 * @description función que trae la fecha seleccionada en el input date,
	 * y la manda a su respecto filtrado de acuerdo al id del input.
	 * @param {object} e objeto evento
	 **/
	const dateSelected = (e) => {
		const dateChosen = e.target.value;
		const dateChosenAsUnix =
			new Date(dateChosen.replace(/-/g, "/")).getTime() + 86300000;
		const today = new Date().getTime();

		if (id === "date-from" && dateChosenAsUnix < today) {
			setOpenModal(true);
		} else {
			setAvailableDate(dateChosen);
		}

		if (id === "date-from") {
			filterByFromDate(dateChosenAsUnix);
		} else {
			filterByToDate(dateChosenAsUnix);
		}
	};

	/**
	 * @description funcion para prevenir reload del website cuando se cierra el modal
	 * de fecha elegida previa al día actual.
	 * @param {object} e, objeto evento.
	 */
	const handleClick = (e) => {
		e.preventDefault();
		setOpenModal(false);
	};

	/**
	 * @description filterBy... función para filtrar y llevar la data a su componente padre,
	 * para que se vea reflejada en la vista.
	 * @param {number} dateChosenAsUnix fecha seleccionada en tiempo unix.
	 **/
	const filterByFromDate = (dateChosenAsUnix) => {
		let hotelsFiltered = hotelsData
			.filter((hotel) => {
				return !stateToDate
					? hotel
					: dateChosenAsUnix >= hotel.availabilityFrom &&
							stateToDate <= hotel.availabilityTo;
			})
			.filter((hotel) => {
				return stateCountryFilter === "Todos los países"
					? hotel
					: hotel.country === stateCountryFilter;
			})
			.filter((hotel) => {
				return statePriceFilter === "Todos los precios"
					? hotel
					: hotel.price === statePriceFilter;
			})
			.filter((hotel) => {
				return stateSizeFilter === "Todos los tamaños"
					? hotel
					: hotel.rooms === stateSizeFilter;
			});

		filtrar(hotelsFiltered, dateChosenAsUnix);
	};

	const filterByToDate = (dateChosenAsUnix) => {
		let hotelsFiltered = hotelsData
			.filter((hotel) => {
				return !stateFromDate
					? hotel
					: stateFromDate >= hotel.availabilityFrom &&
							dateChosenAsUnix <= hotel.availabilityTo;
			})
			.filter((hotel) => {
				return stateCountryFilter === "Todos los países"
					? hotel
					: hotel.country === stateCountryFilter;
			})
			.filter((hotel) => {
				return statePriceFilter === "Todos los precios"
					? hotel
					: hotel.price === statePriceFilter;
			})
			.filter((hotel) => {
				return stateSizeFilter === "Todos los tamaños"
					? hotel
					: hotel.rooms === stateSizeFilter;
			});

		filtrar(hotelsFiltered, dateChosenAsUnix);
	};

	return (
		<div className="date-wrapper">
			<div className={`wrong-date-modal-wrapper ${openModal ? "open" : ""}`}>
				<div className="wrong-date">
					<img
						src={straightIcon}
						alt="straight face"
						className="straight-icon"
					/>
					<h3>Tu fecha de ingreso debe ser mayor a la actual</h3>
					<button onClick={handleClick}>Aceptar</button>
				</div>
			</div>
			<input type="date" value={availableDate} onChange={dateSelected} />
		</div>
	);
};
