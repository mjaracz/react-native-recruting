import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/search-input";

import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/context";
import VideoCard from "@/components/video-card";
import EmptyState from "@/components/empty-state";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { posts: searchedPosts } = useGlobalContext();

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={searchedPosts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard key={item.$id} video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search result
            </Text>
            <Text className="text-2xl font-psemibold text-white">
              {query}
            </Text>

            <View className="mt-6">
              <SearchInput
                placeholder="Search for video topic" 
                initialQuery={query}
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

      <StatusBar backgroundColor='#161622' style='light' />
      
    </SafeAreaView>
  );
};

export default Search;
