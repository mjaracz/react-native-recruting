import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { FC, useState } from "react";

import { icons } from "@/constants";
import { usePathname, router } from "expo-router";
import { searchPosts, useFetchedData } from "@/lib/appwrite";
import { useGlobalContext } from "@/context";

interface SearchFieldProps {
  initialQuery?: string | string[];
  placeholder?: string;
  customStyles?: string;
  keyboardType?: string;
}

export const SearchField: FC<SearchFieldProps> = ({ placeholder }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const { fetchData } = useFetchedData(searchPosts);
  const { setPosts, posts } = useGlobalContext();

  return (
    <View className="w-full h-16 px-4 bg-black-200 border-2 rounded-2xl focus:border-secondary flex-1 flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity onPress={async () => {
        if (!query) {
          return Alert.alert(
            "Missing query", 
            "Please input something to search results across database"
          )
        }
        const res = await fetchData(() => searchPosts(query));
        if (!posts?.length) setPosts(res); 

        if (pathname.startsWith('/search')) router.setParams({ query })
        else router.push(`/search/${query}`)
      }}>
        <Image 
          source={icons.search}
          className="w-5 h-5 mt-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchField;
