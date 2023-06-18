import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Callout, Marker } from "react-native-maps";
import { Text, View, Image } from "react-native/";
import tw from "twrnc";

type PhotoPorps = {
  uri: string;
  latitude: number;
  longitude: number;
};

export const MapCard: React.FC<PhotoPorps> = ({ uri, latitude, longitude }) => {
  return (
    <>
      <Marker coordinate={{ latitude: latitude, longitude: longitude }}>
        <MaterialIcons name="location-pin" size={20} color="black" />
        <Callout>
          <Text style={tw`text-black w-full`}>Longitude : {longitude}</Text>
          <Text style={tw`text-black w-full`}>Latitude : {latitude}</Text>
          <Image
            style={{
              width: 100,
              height: 100,
              zIndex: 10,
            }}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
          {/* <Image
            key={uri}
            source={{ uri: uri }}
            style={{
              width: "100%",
              aspectRatio: 1,
              resizeMode: "contain",
              marginTop: 15,
              marginBottom: 15,
            }}
            onError={(e) => console.log(e.nativeEvent.error)}
          /> */}
        </Callout>
      </Marker>
    </>
  );
};
