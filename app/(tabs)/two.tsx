import React, { useContext } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { MapCard } from "../../components/MapCard";
import { PhotoContext } from "../../PhotoContext";
import { Image } from "react-native";

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
