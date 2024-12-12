import axios from "axios";
import { mappls } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";

const mapplsClassObject = new mappls();
// const mapplsPluginObject = new mappls_plugin();

const App = () => {
    const token = localStorage.getItem("mapToken")||"c55b822b-9001-4c6d-ace7-73ce7afd0987";
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const loadObject = { 
    map: true, 
    layer: 'raster', // Optional Default Vector
    version: '3.0', // // Optional, other version 3.5 also available with CSP headers
    libraries: ['polydraw'], //Optional for Polydraw and airspaceLayers
    plugins:['direction'] // Optional for All the plugins
};


 async function getRoute(){
   try {
    const response = await axios.get(`https://apis.mapmyindia.com/advancedmaps/v1/${token}/route_adv/driving/77.131123,28.552413;17ZUL7?`)
    console.log("response", response.data);
    
   } catch (error) {
    console.log(error);
   }
 
  }

  useEffect(() => {
    mapplsClassObject.initialize("5f77713e966c956f5b8989bb5e089ab4", loadObject, () => {
      const newMap = mapplsClassObject.Map({
        id: "map",
        properties: {
          center: [28.633, 77.2194],
          zoom: 4,
        },
      });

      newMap.on("load", () => {
        setIsMapLoaded(true);
        mapRef.current = newMap;
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div>
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <input
          type="text"
          placeholder="Enter source location"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={getRoute}>Get Route</button>
      </div>
      <div
        id="map"
        style={{ width: "100vw", height: "calc(99vh - 60px)", display: "inline-block" }}
      >
        {isMapLoaded}
      </div>
    </div>
  );
};

export default App;