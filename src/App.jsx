import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    // Coordenadas de la Catedral de Sevilla y Teatro de la Maestranza
    const start = [37.3861, -5.9922]; // Catedral de Sevilla
    const end = [37.3843, -5.9968]; // Teatro de la Maestranza

    // Consulta a la API de OSRM para obtener la ruta entre los puntos
    fetch(
      `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?steps=true&geometries=geojson`
    )
      .then((response) => response.json()) // Convertimos la respuesta en formato JSON
      .then((data) => {
        if (data.routes && data.routes[0]) {
          setRoute(data.routes[0].geometry.coordinates); // Establecemos las coordenadas de la ruta
        }
      })
      .catch((error) => console.error("Error fetching route:", error)); // Captura de errores
  }, []);

  return (
    <div>
      <h1>Mapa de OpenStreetMap con Ruta</h1>
      <MapContainer
        center={[37.3886, -5.9823]} // Coordenadas de Sevilla
        zoom={14}
        className="map"
        style={{ width: "100%", height: "500px" }}
      >
        {/* Capa de OpenStreetMap */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Marcas para la Catedral de Sevilla y Teatro de la Maestranza */}
        <Marker position={[37.3861, -5.9922]}>
          <Popup>Catedral de Sevilla</Popup>
        </Marker>
        <Marker position={[37.3843, -5.9968]}>
          <Popup>Teatro de la Maestranza</Popup>
        </Marker>

        {/* Mostrar la ruta como una línea poligonal */}
        {route.length > 0 && (
          <Polyline
            positions={route.map((coord) => [coord[1], coord[0]])}
            color="red"
          />
        )}
      </MapContainer>
    </div>
  );
}

export default App;
