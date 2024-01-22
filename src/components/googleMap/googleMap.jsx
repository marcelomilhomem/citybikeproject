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
  Collapse,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Table from "../table/table";
import { withNamespaces } from "react-i18next";
import { FaMapMarkedAlt } from "react-icons/fa";

function Map({ t }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const apiURL = "https://api.citybik.es/v2/networks";

  const [activeMarkerId, setActiveMarkerId] = useState();
  const [networks, setNetworks] = useState();
  const [stations, setStations] = useState();
  const [currentStation, setCurrentStation] = useState("");
  const [stationsLength, setStationsLength] = useState(0);
  const [showNetworks, setShowNetworks] = useState();
  const [showStations, setShowStations] = useState();
  const [center, setCenter] = useState();
  const [networkId, setNetworkId] = useState();
  const [networkCity, setNetworkCity] = useState();

  const handleActiveMarker = (markerId, latitude, longitude, city) => {
    console.log("city", city);
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

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      setCenter({ lat: 38.699708, lng: -9.439973 });
    }
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
      };

      fetchStation();
    }
  }, [networkId]);

  return (
    <SimpleGrid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={1}>
      <GridItem>
        <Card textAlign={"start"}>
          <CardHeader>
            <Heading size="md"> {networkCity}</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {stationsLength !== 0 ? (
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
                  Current Station
                </Heading>
                <Text pt="2" fontSize="sm">
                  {currentStation !== ""
                    ? currentStation.name
                    : "Select Station"}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Free Bikes
                </Heading>
                <Text pt="2" fontSize="sm">
                  {currentStation.free_bikes}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Lat
                </Heading>
                <Text pt="2" fontSize="sm">
                  {currentStation.latitude}
                </Text>
                <Heading size="xs" textTransform="uppercase">
                  Lng
                </Heading>
                <Text pt="2" fontSize="sm">
                  {currentStation.longitude}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem colSpan={2}>
        <Card>
          {showStations && (
            <Button
              variant="ghost"
              px={6}
              onClick={() => {
                setShowStations(false);
                setShowNetworks(true);
                setNetworkId(null);
                setActiveMarkerId(null);
                setNetworkCity("");
                setStationsLength(0);
              }}
            >
              {t("backToNetworks")}
            </Button>
          )}
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
                                  variant={"ghost"}
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
                          onClick={() => {
                            handleActiveMarker(
                              station.id,
                              station.latitude,
                              station.longitude
                            ),
                              setCurrentStation(station),
                              console.log(station);
                          }}
                          clusterer={clusterer}
                        >
                          {activeMarkerId === station.id ? (
                            <InfoWindowF
                              onCloseClick={() => {
                                setActiveMarkerId(null), setCurrentStation("");
                              }}
                            >
                              <Stack>
                                <Text as="b" size={"sm"} color={"black"}>
                                  Free Bikes {station.free_bikes}
                                </Text>
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
        </Card>
      </GridItem>
    </SimpleGrid>
  );
}

export default withNamespaces()(Map);
