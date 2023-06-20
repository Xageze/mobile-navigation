import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Callout } from "react-native-maps";
import { Text, View, Image } from "react-native/";
import { Marker } from "react-native-maps";

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
          {/* // TODO ADD IMAGE */}
        </Callout>
      </Marker>
    </>
  );
};
