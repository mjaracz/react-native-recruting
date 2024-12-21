import { useGlobalContext } from "@/context";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useFetchedData = (fetchFn: Function, onComponentDidMount?: boolean) => {
  const { setPosts, posts } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchData = async (fetchFn: Function) => {
    setIsLoading(true);

    try {
      const response = await fetchFn();

      setPosts(response);
      return response;
    } catch (error) {
      Alert.alert('Error', (error as { message: string }).message)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (onComponentDidMount) {
      fetchData(fetchFn);
    }
  }, [onComponentDidMount])
  
  const refetch = () => fetchData(fetchFn);

  return { 
    posts,
    isLoading,
    refetch,
    fetchData
  }
}

export default useFetchedData;