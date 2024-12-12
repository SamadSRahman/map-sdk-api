import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();


const SDK = () => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routeCoordinates, setRouteCoordinates] = useState(null);

  const loadObject = { 
    map: true, 
    layer: ['raster', 'route'], // Optional Default Vector
    version: '3.0', // // Optional, other version 3.5 also available with CSP headers
    libraries: ['polydraw', 'polygon'], //Optional for Polydraw and airspaceLayers
    plugins:['direction'] // Optional for All the plugins
};
function getRoute(){
  mapplsPluginObject.direction({
    map:mapRef.current,
    // divWidth:500,
    start:source,
    end: destination,
    steps:false,
    callback: function (data) {
      console.log(data);
      
      if (data.routes && data.routes[0]) {
        setRouteCoordinates(data.routes[0].geometry.coordinates);
      }
    },
    // autoSubmit:false
    // divId:"search"

  })
}
useEffect(() => {
  // Initialize the map using the provided Mappls class
  mapplsClassObject.initialize(
    "a1d51755-a3d6-4ab5-acd6-b493b4351218", // Replace with your API key
    loadObject,
    () => {
      // Create a new map instance
      const newMap = mapplsClassObject.Map({
        id: "map", // The id of the HTML element where the map will render
        properties: {
          center: [28.633, 77.2194], // Initial map center coordinates
          zoom: 4, // Initial zoom level
          fullscreenControl: false, // Disable fullscreen control
        },
      });

      // Set up an event listener for when the map finishes loading
      newMap.on("load", () => {
        setIsMapLoaded(true); // Update state to indicate the map has loaded
        mapRef.current = newMap; // Store the map instance in a ref

        // Add a circle to the map
        const mapplsCircle = new mapplsClassObject.Circle({
          center: {"lat": "28.519467" ,"lng": "77.223150"},
          map: mapRef.current,
          radius: 100,
          strokeColor: "red",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "red",
          fillOpacity: 0.8
          
        });
      });

      // Store the map instance in a ref
      mapRef.current = newMap;
    }
  );

  // Cleanup function to remove the map instance when the component unmounts
  return () => {
    if (mapRef.current) {
      mapRef.current.remove();
    }
  };
}, []);


  return (
    <div>
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        display: "flex",
        gap: "15px",
      }}
    >
      <input
        type="text"
        placeholder="Enter source location"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={getRoute}>Get Route</button>
    </div>
    <div
      id="map"
      style={{
        width: "100vw",
        height: "calc(100vh - 60px)",
        display: "inline-block",
      }}
    >
   
    </div>
  </div>
    
  );
};

export default SDK;