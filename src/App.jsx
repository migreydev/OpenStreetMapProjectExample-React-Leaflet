import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
  return (
    <div>
      <h1>Mapa de OpenStreetMap</h1>
      <MapContainer
        center={[37.3886, -5.9823]} // Coordenadas de Sevilla
        zoom={14}
        className="map"
      >
        {/* La URL de la capa de tiles de OpenStreetMap */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[37.3861, -5.9922]}>
          <Popup>Catedral de Sevilla</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
