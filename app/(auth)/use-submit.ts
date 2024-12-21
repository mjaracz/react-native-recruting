import { useGlobalContext } from "@/context";
import { createUser, getCurrentUser, signIn } from "@/lib/appwrite";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export interface User {
  email: string;
  password: string;
  username?: string;
}

const useSubmit = (form: User) => {
  const { setUserRes, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert('Error', 'Please fill in all fields');
    }
    
    setIsSubmitting(true)
    
    try {
      if (form.username !== undefined) {
        const result = await createUser(form.email, form.password, form?.username);
        setUserRes(result);
      } else {
        await signIn(form.email, form.password);
        const result = await getCurrentUser();

        setUserRes(result)
        setIsLoggedIn(true);
      }

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', (error as { message: string }).message);
    } finally {
      setIsSubmitting(false);
    }
  }
  
  
  return {
    isSubmitting,
    submit
  }
}

export default useSubmit;