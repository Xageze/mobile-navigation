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
          <View style={tw`w-full bg-red-200`}>
            <Text style={tw`relative w-full bg-blue-200`}>
              <Image
                source={{ uri: uri }}
                style={tw`absolute bg-green-200 bottom-0 w-full h-full`}
              />
            </Text>
          </View>
        </Callout>
      </Marker>
    </>
  );
};
