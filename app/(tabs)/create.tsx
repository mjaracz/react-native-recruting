import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField } from "@/components";
import * as ImagePicker  from 'expo-image-picker'

import { useVideoPlayer } from "expo-video";
import { icons } from "@/constants";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context";
import CustomVideoPlayer from "@/components/video-player";

const Create = () => {
  const { userRes } = useGlobalContext();
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const player = useVideoPlayer(form.video);

  const openPicker = async (selectType: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' 
        ? ImagePicker.MediaTypeOptions.Images
        : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      if (selectType === 'image') setForm({ ...form, thumbnail: result.assets[0] })
      if (selectType === 'video') setForm({ ...form, video: result.assets[0] })
    }
  }

  const submit = async () => {
    if(!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert('Please fill in all the fields');
    }



    try {
      await createVideo({ 
        ...form,
        userId: userRes.$id
      });
      
      Alert.alert('Success', 'Post uploaded succesfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: '',
      });
    }
  }


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Upload Video
        </Text>

        <FormField 
          value={form.title}
          title="Video Title"
          customStyles="mt-10 h-20"
          placeholder="Give your video a title"
          handleChangeText={(e) => setForm({ ...form, title: e })}
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <View className="mt-10">
            {form.video ? (
              <CustomVideoPlayer
                customPlayer={player}
                width={360}
                height={160}
              />
            ) : (
              <TouchableOpacity onPress={() => openPicker('video')} className="w-full h-40 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image source={icons.upload} resizeMode="contain" className="w-1/2 h-1/2" />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View className="mt-12 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker('image')} className="mt-5">
            {form.thumbnail ? (
              <Image 
                source={{ uri: form.thumbnail.uri }}
                resizeMode='cover'
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image source={icons.upload} resizeMode="contain" className="w-5 h-5" />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          customStyles="mt-7 h-20"
        />

        <CustomButton
          label="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          
        />

      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
