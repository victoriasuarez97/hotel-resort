import React from "react";

import Hotel from "../../assets/img/new-background.jpg";

import "./header.scss";

/**
 * @description componente para el header de la aplicación.
 **/

export const Header = () => {
  return (
    <div className="header-container">
      <img src={Hotel} alt="hotel" />
      <div className="header-text-wrapper">
        <h1>HOTELES</h1>
        <h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam
        </h3>
      </div>
    </div>
  );
};
