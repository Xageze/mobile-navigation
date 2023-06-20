import React, { useContext } from "react";
import MapView from "react-native-maps";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { MapCard } from "../../components/MapCard";
import { PhotoContext } from "../../PhotoContext";
import { Image } from "react-native";
import tw from "twrnc";

type PhotoType = {
  uri: string;
  latitude: number;
  longitude: number;
};

export default function App() {
  const { photos } = useContext(PhotoContext);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {photos.map((photo: PhotoType) => (
          <MapCard
            key={photo.uri}
            uri={photo.uri}
            latitude={photo.latitude}
            longitude={photo.longitude}
          />
        ))}
      </MapView>
      <ScrollView
        horizontal
        contentContainerStyle={tw`flex-grow`}
        style={tw`flex mt-4`}
      >
        <View style={tw`flex flex-row`}>
          {photos.length === 0 && <Text>No photos</Text>}
          {photos.map((photo: PhotoType) => {
            return (
              <Image
                key={photo.uri}
                source={{ uri: photo.uri }}
                style={{
                  width: "24%",
                  aspectRatio: 3 / 4,
                  resizeMode: "contain",
                  marginLeft: 15,
                }}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
  },
});
