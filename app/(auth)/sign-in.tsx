import React, { useState } from "react";
import { ScrollView, View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import { FormField, CustomButton } from "@/components";
import { Link } from "expo-router";
import useSubmit from "./use-submit";

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const { submit, isSubmitting } = useSubmit(form);
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Log in to Aora</Text>
          
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
            label="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>

            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
