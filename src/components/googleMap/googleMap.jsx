import { Fragment, useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
  MarkerClusterer,
} from "@react-google-maps/api";
import axios from "axios";
import { Center, Heading } from "@chakra-ui/react";

function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const apiURL = "https://api.citybik.es/v2/networks";

  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [networks, setNetworks] = useState(null);
  const [showNetworks, setShowNetworks] = useState(null);
  const [center, setCenter] = useState({ lat: 38.699708, lng: -9.439973 });

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

  return (
    <Fragment>
      {console.log(networks)}
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
                            <Center>
                              <Heading size={"md"} color={"black"}>
                                {network.location.city}
                              </Heading>
                            </Center>
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
