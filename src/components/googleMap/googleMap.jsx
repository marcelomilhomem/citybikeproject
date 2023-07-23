import React, { Fragment, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import { Spinner, Center, Heading } from "@chakra-ui/react";
import apiBikeService from "../../service/api";

function Map() {
  const [networks, setNetworks] = useState([]);
  const [showMarkers, setShowMarkers] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const fetchApi = async () => {
    try {
      let response = await apiBikeService.fetchNetworks();
      setNetworks(response.data.networks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
    // Delay showing the markers by 500ms to ensure the Google Maps API is fully loaded
    const timerId = setTimeout(() => {
      setShowMarkers(true);
    }, 500);

    return () => clearTimeout(timerId);
  }, []);

  const handleActiveMarker = (marker) => {console.log(marker)
    if (marker.id === (activeMarker && activeMarker.id)) {
      setActiveMarker(null);
    } else {
      setActiveMarker(marker);
    }
  };

  return (
    <>
    <Heading>City Map</Heading>
    <Fragment>
      {isLoaded ? (
        <GoogleMap
          center={{ lat: 38.699708, lng: -9.439973 }}
          zoom={10}
          mapContainerStyle={{
            width: "100%",
            height: "50vh",
          }}
        >
          {showMarkers && (
            <MarkerClusterer gridSize={60}>
              {(clusterer) =>
                networks.map((network, index) => (
                  <Marker
                    key={index}
                    position={{
                      lat: network.location.latitude,
                      lng: network.location.longitude,
                    }}
                    clusterer={clusterer}
                    onClick={() => handleActiveMarker(network)}
                  >
                    {activeMarker && activeMarker.id === network.id ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <div style={{ color: "black" }}>
                          <p>{network.location.city}</p>
                        </div>
                      </InfoWindow>
                    ) : null}
                  </Marker>
                ))
              }
            </MarkerClusterer>
          )}
        </GoogleMap>
      ) : (
        <Center height={"50vh"}>
          <Spinner size="xl" />
        </Center>
      )}
    </Fragment>
    </>
  );
}

export default Map;
