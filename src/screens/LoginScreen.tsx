import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { setUsername } from '@src/api/api';
import { UserContext } from '@src/context/UserContext';


const LoginScreen = ({ navigation }) => {
  const [username, setUsernameInput] = useState('');
  const { updateUser } = useContext(UserContext);


  const handleLogin = async () => {
    try {
      // const userId = await setUsername(username);
      const userId = {
        "username": "Vishal",
        "id": 447,
        "created_at": "2025-03-07T06:25:09",
        "expires_at": "2025-03-10T06:25:09"
      }
      updateUser(userId);

      navigation.navigate('RoomsList', { userId });
    } catch (error) {
      Alert.alert('Error', 'Failed to set username');
    }
  };

  return (
    <View>
      <TextInput placeholder="Enter username" value={username} onChangeText={setUsernameInput} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;