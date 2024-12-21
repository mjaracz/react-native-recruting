import React, { useState } from "react";
import { ScrollView, View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import { FormField, CustomButton } from "@/components";
import { Link } from "expo-router";

import useSubmit from "./use-submit";

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const { submit, isSubmitting } = useSubmit(form);
  
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to Aora</Text>
          
          <FormField 
            title='Username'
            value={form.username}
            handleChangeText={(emailValue) => setForm({
              ...form,
              username: emailValue
            })}
            customStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title='Email'
            value={form.email}
            handleChangeText={(emailValue) => setForm({
              ...form,
              email: emailValue
            })}
            customStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title='Password'
            value={form.password}
            handleChangeText={(passwordValue) => setForm({
              ...form,
              password: passwordValue
            })}
            customStyles="mt-7"
          />

          <CustomButton
            label="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
