import React, { useState } from "react";
import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import SearchInput from "@/components/search-input";
import Trending from "@/components/trending";
import EmptyState from "@/components/empty-state";
import VideoCard from "@/components/video-card";

import { getAllPosts, getLatestPosts, searchPosts, useFetchedData } from "@/lib/appwrite";
import { useGlobalContext } from "@/context";

const Home = () => {
  const { userRes } = useGlobalContext();
  const { posts, refetch } = useFetchedData(getAllPosts, true);
  const { posts: latestPosts } = useFetchedData(getLatestPosts, true)

  const [isRefreshing, setIsRefreshing] = useState(false);
  

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard key={item.$id} video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {userRes.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput placeholder="Search for video topic" />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="Be the first one to upload a video"
          />
        )}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
