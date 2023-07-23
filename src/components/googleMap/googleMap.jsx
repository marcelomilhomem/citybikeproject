import { Fragment, useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
  MarkerClusterer,
} from "@react-google-maps/api";
import axios from "axios";
import { Button, Center, Heading, Stack } from "@chakra-ui/react";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const apiURL = "https://api.citybik.es/v2/networks";

  const [activeMarkerId, setActiveMarkerId] = useState();
  const [networks, setNetworks] = useState();
  const [stations, setStations] = useState();
  const [showNetworks, setShowNetworks] = useState();
  const [showStations, setShowStations] = useState();
  const [center, setCenter] = useState({ lat: 38.699708, lng: -9.439973 });
  const [networkId, setNetworkId] = useState();

  const handleActiveMarker = (markerId, latitude, longitude) => {
    if (markerId === activeMarkerId) {
      return;
    }
    setActiveMarkerId(markerId);
    setCenter({ lat: latitude, lng: longitude });
  };

  useEffect(() => {
    const fetchNetworks = async () => {
      const response = await axios.get(`${apiURL}`);
      const networkData = response.data.networks;
      setNetworks(networkData);
      setShowNetworks(true);
    };

    fetchNetworks();
  }, []);

   useEffect(() => {
    if (!networkId) {
      return;
    } else {
      const fetchStation = async () => {
        const response = await axios.get(`${apiURL}/${networkId}`);
        const stationData = response.data.network.stations;
        setShowNetworks(false);
        setShowStations(true);
        setStations(stationData);
      };

      fetchStation();
    }
  }, [networkId]); 

  return (
    <Fragment>
      {console.log(stations)}
          {isLoaded ? (
            <GoogleMap
              center={center}
              zoom={10}
              onClick={() => setActiveMarkerId(null)}
              mapContainerStyle={{ width: "100%", height: "90vh" }}
            >
              {showNetworks && (
                <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
                  {(clusterer) =>
                    networks.map((network) => (
                      <MarkerF
                        key={network.id}
                        position={{
                          lat: network.location.latitude,
                          lng: network.location.longitude,
                        }}
                        onClick={() =>
                          handleActiveMarker(
                            network.id,
                            network.location.latitude,
                            network.location.longitude,
                          )
                        }
                        clusterer={clusterer}
                      >
                        {activeMarkerId === network.id ? (
                          <InfoWindowF
                            onCloseClick={() => setActiveMarkerId(null)}
                          >
                            <Stack>
                              <Heading size={"md"} color={"black"}>
                                {network.location.city}
                              </Heading>
                              <Button onClick={() => setNetworkId(network.id)} size={'sm'}>Check {network.location.city} Stations</Button>
                            </Stack>
                          </InfoWindowF>
                        ) : null}
                      </MarkerF>
                    ))
                  }
                  
                </MarkerClusterer>
              )}
                {showStations && (
                <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
                  {(clusterer) =>
                    stations.map((station) => (
                      <MarkerF
                        key={station.id}
                        position={{
                          lat: station.latitude,
                          lng: station.longitude,
                        }}
                        onClick={() =>
                          handleActiveMarker(
                            station.id,
                            station.latitude,
                            station.longitude,
                          )
                        }
                        clusterer={clusterer}
                      >
                        {activeMarkerId === station.id ? (
                          <InfoWindowF
                            onCloseClick={() => setActiveMarkerId(null)}
                          >
                            <Stack>
                              <Heading size={"md"} color={"black"}>
                                {station.name}
                              </Heading>
                            </Stack>
                          </InfoWindowF>
                        ) : null}
                      </MarkerF>
                    ))
                  }
                  
                </MarkerClusterer>
              )}
            </GoogleMap>
          ) : null}
    </Fragment>
  );
}

export default Map;
