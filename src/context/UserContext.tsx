import { RootUser } from '@src/type';
import React, { createContext, useEffect, useState, } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context for user data
export const UserContext = createContext<{
  userData: RootUser | null;
  updateUser: (event: RootUser) => void;
  clearUser: () => void;
}>({
  userData: null,
  updateUser: () => { },
  clearUser: () => { },
});

// Create a provider component
interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<RootUser | null>(null);

  useEffect(() => {
    const _retrieveData = async () => {
      try {
        let value = await AsyncStorage.getItem('user');
        if (value !== null) {
          value = JSON.parse(value);
          setUserData(value)
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    _retrieveData()
  }, [])

  // Function to update user data
  const updateUser = async (event: RootUser) => {
    setUserData(event);
    await AsyncStorage.setItem('user', JSON.stringify(event));
  };

  // Function to clear user data (e.g., on logout)
  const clearUser = () => {
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};