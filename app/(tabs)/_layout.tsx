import React, { FC } from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import { Tabs } from 'expo-router';

import { icons } from "@/constants";
import { StatusBar } from "expo-status-bar";

interface TabsIconProps {
  name: string;
  color: string;
  focused: boolean;
  icon: ImageSourcePropType;
}
const TabIcon: FC<TabsIconProps> = ({ name, color, icon, focused }) => {
  return (
    <View className="items-center justify-center gap-2 min-w-20 py-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 87,
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            paddingTop: 12
          }
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.home} 
                focused={focused} 
                color={color}
                name='Home' 
              />
            )
          }}
        />
        <Tabs.Screen
          name='create'
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus} 
                focused={focused} 
                color={color}
                name='Create'
              />
            )
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                icon={icons.profile} 
                focused={focused} 
                color={color}
                name='Profile' 
              />
            )
          }}
        />
      </Tabs>
      <StatusBar backgroundColor='#161622' style='light' />
    </>
  );
};

export default TabsLayout;
