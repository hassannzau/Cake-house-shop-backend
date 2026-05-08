import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  MapContainer,
  Popup,
  Rectangle,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CustomMarker from "./customMarker/customMarker";
// import Route from "./route/route";

const WARSAW_CENTER: [number, number] = [52.2297, 21.0122];

const WARSAW_BOUNDS: [[number, number], [number, number]] = [
  [52.05, 20.85],
  [52.37, 21.27],
];

const rectangle: [[number, number], [number, number]] = [
  [52.215, 20.97],
  [52.245, 21.05],
];

export default function Map() {
  return (
    <div
      style={{
        height: 520,
        maxWidth: 1400,
        width: "92%",
        margin: "0 auto",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={WARSAW_CENTER}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%", zIndex: "0" }}
        maxBounds={WARSAW_BOUNDS}
        maxBoundsViscosity={1.0}
        minZoom={11}
        maxZoom={17}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Warsaw marker">
            <LayerGroup>
              <CustomMarker position={WARSAW_CENTER}>
                <Popup>Warsaw (Center)</Popup>
              </CustomMarker>
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay checked name="Warsaw circles">
            <LayerGroup>
              <Circle
                center={WARSAW_CENTER}
                radius={600}
                pathOptions={{
                  color: "#d3748f",
                  weight: 2,
                  fillColor: "#d3748f",
                  fillOpacity: 0.15,
                }}
              />
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Warsaw rectangle">
            <FeatureGroup>
              <Popup>Area in Warsaw</Popup>
              <Rectangle bounds={rectangle} />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}
