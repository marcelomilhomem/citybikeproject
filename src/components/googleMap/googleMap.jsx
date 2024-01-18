import { Fragment, useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
  MarkerClusterer,
} from "@react-google-maps/api";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import Table from "../table/table";
import { withNamespaces } from "react-i18next";

function Map({ t }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const apiURL = "https://api.citybik.es/v2/networks";

  const [activeMarkerId, setActiveMarkerId] = useState();
  const [networks, setNetworks] = useState();
  const [stations, setStations] = useState();
  const [stationsLength, setStationsLength] = useState();
  const [showNetworks, setShowNetworks] = useState();
  const [showStations, setShowStations] = useState();
  const [center, setCenter] = useState({ lat: 38.699708, lng: -9.439973 });
  const [networkId, setNetworkId] = useState();
  const [networkCity, setNetworkCity] = useState();

  const handleActiveMarker = (markerId, latitude, longitude, city) => {
    if (markerId === activeMarkerId) {
      return;
    }
    setActiveMarkerId(markerId);
    setCenter({ lat: latitude, lng: longitude });

    if (!networkCity) {
      setNetworkCity(city);
    }
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
        setStationsLength(response.data.network.stations.length);
        console.log(networkCity);
      };

      fetchStation();
    }
  }, [networkId]);

  return (
    <SimpleGrid templateColumns="1fr 3fr">
      <Card>
        <CardHeader>
          <Heading size="md">Where are you?</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Location
              </Heading>
              <Text pt="2" fontSize="sm">
                {networkCity}
              </Text>
            </Box>
            {stationsLength ? (
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Stations Here:
                </Heading>
                <Text pt="2" fontSize="sm">
                  {stationsLength}
                </Text>
              </Box>
            ) : null}
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Analysis
              </Heading>
              <Text pt="2" fontSize="sm">
                See a detailed analysis of all your business clients.
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
      <Stack spacing={10}>
        <Stack>
          <Fragment>
            {isLoaded ? (
              <GoogleMap
                center={center}
                zoom={6}
                onClick={() => setActiveMarkerId(null)}
                mapContainerStyle={{ width: "100%", height: "70vh" }}
              >
                {showNetworks && (
                  <MarkerClusterer
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                  >
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
                              network.location.city
                            )
                          }
                          clusterer={clusterer}
                        >
                          {activeMarkerId === network.id ? (
                            <InfoWindowF
                              onCloseClick={() => {
                                setActiveMarkerId(null), setNetworkCity("");
                              }}
                            >
                              <Stack>
                                <Heading size={"md"} color={"black"}>
                                  {network.location.city}
                                </Heading>
                                <Button
                                  onClick={() => setNetworkId(network.id)}
                                  size={"sm"}
                                >
                                  {t("checkStations")}
                                </Button>
                              </Stack>
                            </InfoWindowF>
                          ) : null}
                        </MarkerF>
                      ))
                    }
                  </MarkerClusterer>
                )}
                {showStations && (
                  <MarkerClusterer
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                  >
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
                              station.longitude
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
                                  <Table
                                    address={station.name}
                                    freeBikes={station.free_bikes}
                                    city={networkCity}
                                  />
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
          {showStations && (
            <Button
              colorScheme={"green"}
              variant="ghost"
              px={6}
              _hover={{
                color: "white",
              }}
              onClick={() => {
                setShowStations(false);
                setShowNetworks(true);
                setNetworkId(null);
                setActiveMarkerId(null);
                setNetworkCity("");
                setStationsLength(null);
              }}
            >
              {t("backToNetworks")}
            </Button>
          )}
        </Stack>
      </Stack>
    </SimpleGrid>
  );
}

export default withNamespaces()(Map);
