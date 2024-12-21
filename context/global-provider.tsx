import { createContext, useContext, useState, useEffect, PropsWithChildren, FC } from 'react';
import { Models } from 'react-native-appwrite';
import { getCurrentUser } from '@/lib/appwrite';

type UserRes = Models.Document | undefined;

interface Context {
  userRes: UserRes;
  posts: Models.Document[];
  isLoggedIn: boolean;
  isLoading: boolean;
  setIsLoggedIn: (state: boolean) => void;
  setUserRes: (state: UserRes) => void; 
  setPosts: (state: Models.Document[]) => void;
}

const GlobalContext = createContext<Context>({} as Context);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRes, setUserRes] = useState<UserRes>();
  const [posts, setPosts] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if(res) {
          setIsLoggedIn(true);
          setUserRes(res)
        } else {
          setIsLoggedIn(false);
          setUserRes(undefined);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider 
      value={{
        userRes,
        isLoggedIn,
        isLoading,
        setIsLoggedIn,
        setUserRes,
        posts,
        setPosts
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider;
