import React, { FC, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "@/constants";

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (eventValue: string) => void;
  placeholder?: string;
  customStyles?: string;
  keyboardType?: string;
}

export const FormField: FC<FormFieldProps> = ({ title, handleChangeText, value, placeholder, customStyles }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <View className={`space-y-2 ${customStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-black-200 border-2 rounded-2xl focus:border-secondary flex-1 flex-row ">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image className="w-6 h-6 my-5" source={!showPassword ? icons.eye : icons.eyeHide} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
