import React from "react";
import { Image } from "react-native";

type PhotoType = {
  uri: string;
  latitude: number;
  longitude: number;
};

type PhotoListProps = {
  photos: Array<PhotoType>;
};

export const PhotoList: React.FC<PhotoListProps> = ({ photos = [] }) => {
  return (
    <>
      {photos.map((photo: PhotoType) => {
        return (
          <Image
            key={photo.uri}
            source={{ uri: photo.uri }}
            style={{
              width: "100%",
              aspectRatio: 1,
              resizeMode: "contain",
              marginTop: 15,
              marginBottom: 15,
            }}
          />
        );
      })}
    </>
  );
};
