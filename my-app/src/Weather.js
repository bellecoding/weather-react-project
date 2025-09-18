import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    const d = response?.data;

    // Basic guards so we don't crash on unexpected payloads
    if (!d || !d.temperature) {
      console.error("Unexpected API payload:", d);
      return;
    }

    setWeatherData({
      ready: true,
      // SheCodes shapes (based on their docs; names may vary slightly)
      coordinates: d.coordinates, // { latitude, longitude }
      temperature: d.temperature?.current, // number
      humidity: d.temperature?.humidity ?? d.humidity, // %
      date: d.time ? new Date(d.time * 1000) : new Date(), // unix seconds → Date
      description: d.condition?.description ?? "", // string
      icon: d.condition?.icon ?? "", // e.g. "clear-sky-day"
      wind: d.wind?.speed, // m/s or km/h
      city: d.city ?? "",
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "ddafb333ff3taa6005d55d473416odb3"; // move to .env in real use
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${encodeURIComponent(
      city || "Lisbon"
    )}&key=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((e) => {
        console.error("STATUS", e.response?.status);
        console.error("DATA", e.response?.data);
      });
  }

  useEffect(() => {
    if (!weatherData.ready) {
      search();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                autoFocus
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
      </div>
    );
  } else {
    return "Loading...";
  }
}
