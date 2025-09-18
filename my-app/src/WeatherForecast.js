import React, { useState, useEffect, useCallback } from "react";
import "./WeatherForecast.css";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  const handleResponse = useCallback((response) => {
    // SheCodes returns { daily: [...] }
    setForecast(response.data.daily);
    setLoaded(true);
  }, []);

  useEffect(() => {
    // Sempre que as coordenadas mudarem, zera o estado
    setLoaded(false);
    setForecast(null);

    if (props.coordinates) {
      const apiKey = "ddafb333ff3taa6005d55d473416odb3"; // em produção, use .env
      const longitude = props.coordinates.longitude;
      const latitude = props.coordinates.latitude;

      const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

      axios.get(apiUrl).then(handleResponse);
    }
  }, [props.coordinates, handleResponse]);

  if (!loaded || !forecast) return null;

  return (
    <div className="WeatherForecast">
      {/* Grid de mini-cards (5 dias) */}
      <div className="WeatherForecast-grid">
        {forecast.slice(0, 5).map((dailyForecast, index) => (
          <WeatherForecastDay data={dailyForecast} key={index} />
        ))}
      </div>
    </div>
  );
}
