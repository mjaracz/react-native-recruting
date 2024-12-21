import React, { FC, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Models } from "react-native-appwrite";
import { icons } from "@/constants";
import { useVideoPlayer } from "expo-video";
import CustomVideoPlayer from "./video-player";

interface Props {
  video: Models.Document;
}


const VideoCard: FC<Props> = ({ video: { title, thumbnail, video, creator: { username, avatar } } }) => {
  const player = useVideoPlayer(video);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const onPressVideoButton = () => {
    if (isPlaying) {
      setIsPlaying(false);
      player.pause();
    }
    else {
      setIsPlaying(true);
      player.play();
    }
  }

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image 
              className="w-full h-full rounded-lg" 
              source={{ uri: avatar }} 
              resizeMode="cover" 
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {isPlaying ? (
        <TouchableOpacity className="relative flex-1 justify-center items-center" activeOpacity={0.7} onPress={onPressVideoButton}>
          <CustomVideoPlayer
            customPlayer={player}
            width={362}
            height={210}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressVideoButton}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl my-10"
            resizeMode="cover"
          />

          <Image 
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
