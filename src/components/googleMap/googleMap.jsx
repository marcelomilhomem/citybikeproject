import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import "./googleMap.css";
import { Center, Text, Stack } from "@chakra-ui/react";
import WithSpeechBubbles from "../myDescription/MyDescription";

export default function MapTest() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  return (
    <Center>
      <Stack
        w={"100vw"}
        h={"100vh"}
        justify={"center"}
        alignItems={"center"}
        spacing={"25px"}
      >
        {isLoaded ? (
          <>
            <WithSpeechBubbles />
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "60%",
                boxShadow: "",
              }}
              center={{ lat: 38.72304884321217, lng: -9.142570395627299 }}
              zoom={10}
            ></GoogleMap>
          </>
        ) : (
          <Text>Loading</Text>
        )}
      </Stack>
    </Center>
  );
}
