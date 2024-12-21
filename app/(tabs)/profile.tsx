import React from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFetchedData, getUserPosts, signOut } from "@/lib/appwrite";
import { StatusBar } from "expo-status-bar";
import VideoCard from "@/components/video-card";
import EmptyState from "@/components/empty-state";
import { useGlobalContext } from "@/context";
import { icons } from "@/constants";
import InfoBox from "@/components/info-box";

import { router } from "expo-router";

const Profile = () => {
  const { userRes, setUserRes, setIsLoggedIn } = useGlobalContext();  
  const { posts: searchedPosts } = useFetchedData(() => getUserPosts(userRes.$id));


  const logout = async () => {
    await signOut();
    setUserRes(null);
    setIsLoggedIn(false);

    router.replace('/sign-in');
  }


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={searchedPosts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard key={item.$id} video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="w-full jusitfy-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
              <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
            </TouchableOpacity>

            <View className="flex w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image 
                source={{ uri: userRes.avatar }} 
                className="w-[95%] h-[95%] rounded-lg"
                resizeMode="cover" 
              />
            </View>
            
            <InfoBox
              title={userRes?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={(searchedPosts.length || 0).toString()}
                subTitle="Posts"
                containerStyles="mt-5"
                titleStyles="text-lg"
              />

              <InfoBox
                title="1.2k"
                subTitle="Followers"
                containerStyles="mt-5"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos Found"
            subTitle="Be the first one to upload a video"
          />
        )}
      />

      <StatusBar />
    </SafeAreaView>
  );
};

export default Profile;
