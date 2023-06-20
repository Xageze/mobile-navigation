import { Camera, CameraType } from "expo-camera";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PhotoContext } from "../PhotoContext";
import * as Location from "expo-location";

type PhotoType = {
  uri: string;
  latitude: number;
  longitude: number;
};

export default function ModalsScreen() {
  const cameraRef = useRef<Camera | null>();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { photos, setPhotos } = useContext(PhotoContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
    })();
  }, []);

  if (!permission) {
    return <Text>Permission needed to use camera</Text>;
  }
  if (permission && !permission.granted) {
    requestPermission();
    return <Text>Permission needed to use camera</Text>;
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const userLocation = await Location.getCurrentPositionAsync();
      const photo: PhotoType = {
        uri: (await cameraRef.current.takePictureAsync({ quality: 0.8 })).uri,
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      };
      setPhotos([photo, ...photos]);
      await AsyncStorage.setItem("photos", JSON.stringify([...photos, photo]));
    }
  };

  return (
    <View>
      <View>
        <Camera
          type={type}
          ref={(camera) => {
            cameraRef.current = camera;
          }}
          style={{ width: "100%", aspectRatio: 3 / 4 }}
        />
        <View
          style={tw`pt-6 px-2 flex flex-row justify-around items-center gap-2`}
        >
          <TouchableOpacity
            style={tw`px-3 py-2 rounded-lg border border-gray-300`}
            onPress={toggleCameraType}
          >
            <Text style={tw`text-white`}>Flip Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`px-3 py-2 rounded-lg border border-gray-300`}
            onPress={() => setPhotos([])}
          >
            <Text style={tw`text-white`}>Clear Pictures</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`px-3 py-2 rounded-lg border border-gray-300`}
            onPress={takePicture}
          >
            <Text style={tw`text-white`}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </View>
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
