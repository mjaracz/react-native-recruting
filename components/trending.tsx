import React, { FC, useState } from "react";
import { FlatList, TouchableOpacity, ImageBackground, ScaleTransform, Image } from "react-native";
import { Models } from "react-native-appwrite";
import * as Animatable from 'react-native-animatable';

import { icons } from "@/constants";
import { useVideoPlayer } from "expo-video";
import CustomVideoPlayer from "./video-player";

const zoomIn: Animatable.CustomAnimation<ScaleTransform> = {
  from: {
    scale: 0.9
  },
  to: {
    scale: 1.1,
  }
}

const zoomOut: Animatable.CustomAnimation<ScaleTransform> = {
  from: {
    scale: 1.1
  },
  to: {
    scale: 0.9,
  }
}

interface TrendingProps {
  posts: Models.Document[]
}

interface TrendingItemProps {
  activeItem: string;
  item: Models.Document;
}

const TrendingItem: FC<TrendingItemProps> = ({ activeItem, item }) => {
  const player = useVideoPlayer(item.video);
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
    <Animatable.View
      className="mr-5"
      animation={(activeItem === item.$id ? zoomIn : zoomOut) as Animatable.CustomAnimation}
      duration={500}
    >
      {isPlaying ? (
        <TouchableOpacity className="relative flex-1 justify-center items-center" activeOpacity={0.7} onPress={onPressVideoButton}>
          <CustomVideoPlayer width={208} height={288} customPlayer={player} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity className="relative justify-center items-center" activeOpacity={0.7} onPress={onPressVideoButton}>
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
          />
          
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}

const Trending: FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts.length ? posts[1].$id : undefined);

  const viewableItemsChanges = ({ viewableItems }) => {
    if (viewableItems.length > 0) setActiveItem(viewableItems[0].key);
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem
          key={item.$id}
          item={item}
          activeItem={activeItem}
        />
      )}
      onViewableItemsChanged={viewableItemsChanges}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
