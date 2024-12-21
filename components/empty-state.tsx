import React, { FC } from "react";
import { View, Text, Image } from "react-native";
import { CustomButton } from "@/components";


import { images } from "@/constants";
import { router } from "expo-router";

interface EmptyStateProps {
  title: string;
  subTitle: string;
}

const EmptyState: FC<EmptyStateProps> = ({ title, subTitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode="contain"  />
      <Text className="text-2xl font-psemibold text-white">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">
        {subTitle}
      </Text>
      <CustomButton
        label="Create video"
        handlePress={() => router.push('/create')}
        containerStyles="w-full my-8"
      />        
    </View>
  );
};

export default EmptyState;
