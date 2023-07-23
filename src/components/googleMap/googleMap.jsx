import { Fragment, useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import axios from "axios";
import { Center, Heading } from "@chakra-ui/react";

const markers = [
  {
    id: 1,
    name: "Qobustan",
    position: { lat: 40.0709493, lng: 49.3694411 },
  },
  {
    id: 2,
    name: "Sumqayit",
    position: { lat: 40.5788843, lng: 49.5485073 },
  },
  {
    id: 3,
    name: "Baku",
    position: { lat: 40.3947365, lng: 49.6898045 },
  }
];

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const apiURL = "https://api.citybik.es/v2/networks";

  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [networks, setNetworks] = useState(null);
  const [showNetworks, setShowNetworks] = useState(null);
  const [center, setCenter] = useState({ lat: 38.699708, lng: -9.439973 })

  const handleActiveMarker = (markerId, latitude, longitude) => {
    if (markerId === activeMarkerId) {
      return;
    }
    setActiveMarkerId(markerId);
    setCenter({lat: latitude, lng: longitude})
  };

  useEffect(() => {
    const fetchNetworks = async () => {
      const response = await axios.get(`${apiURL}`);
      const networkData = response.data.networks;
      setNetworks(networkData);
      setShowNetworks(true)
    };

    fetchNetworks();
  }, []);

  return (
    <Fragment>
      {console.log(networks)}
      <div className="container">
        <h1 className="text-center">Vite + React | Google Map Markers</h1>
        <div style={{ height: "90vh", width: "100%" }}>
          {isLoaded ? (
            <GoogleMap
              center={center}
              zoom={10}
              onClick={() => setActiveMarkerId(null)}
              mapContainerStyle={{ width: "100%", height: "90vh" }}
            >
              {showNetworks && networks.map((network) => (
                <MarkerF
                  key={network.id}
                  position={{
                    lat: network.location.latitude,
                    lng: network.location.longitude
                  }}
                  onClick={() => handleActiveMarker(network.id, network.location.latitude, network.location.longitude)}
                  // icon={{
                  //   url:"https://t4.ftcdn.net/jpg/02/85/33/21/360_F_285332150_qyJdRevcRDaqVluZrUp8ee4H2KezU9CA.jpg",
                  //   scaledSize: { width: 50, height: 50 }
                  // }}
                >
                  {activeMarkerId === network.id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarkerId(null)}>
                      <Center>
                        <Heading size={'md'} color={'black'}>{network.location.city}</Heading>
                      </Center>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

export default Map;