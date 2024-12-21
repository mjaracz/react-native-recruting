import React, { FC } from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";

interface CustomButtonProps {
  label: string;
  handlePress: (event?: GestureResponderEvent) => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

export const CustomButton: FC<CustomButtonProps> = ({ label, containerStyles, handlePress, textStyles, isLoading }) => {
  return (
    <TouchableOpacity 
      onPress={handlePress} 
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center p-4 ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{ label }</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
