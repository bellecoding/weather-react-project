import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherIcon from "./WeatherIcon";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <h1 className="city-title">{props.data.city}</h1>

      <ul className="meta">
        <li>
          <FormattedDate date={props.data.date} />
        </li>
        <li className="text-capitalize">{props.data.description}</li>
      </ul>

      <div className="row mt-3 align-items-center">
        {/* ESQUERDA: Humidity (em cima) e Wind (logo abaixo) */}
        <div className="col-6">
          <ul className="stats">
            <li>
              <span className="stat-label">Humidity</span>
              <span className="stat-value">{props.data.humidity}%</span>
            </li>
            <li>
              <span className="stat-label">Wind</span>
              <span className="stat-value">{props.data.wind} km/h</span>
            </li>
          </ul>
        </div>

        {/* DIREITA: Temperatura + Ícone coladinhos e alinhados à direita */}
        <div className="col-6">
          <div className="d-flex justify-content-end align-items-center temp-block">
            <WeatherTemperature celsius={props.data.temperature} />
            <WeatherIcon code={props.data.icon} size={56} />
          </div>
        </div>
      </div>
    </div>
  );
}
