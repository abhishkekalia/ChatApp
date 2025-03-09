import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { setUsername } from '@src/api/api';
import { UserContext } from '@src/context/UserContext';
import NavigationHeader from '@src/components/NavigationHeader';


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
    <View style={{ flex: 1 }}>
      <NavigationHeader
        title='Login'
      />
      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 16 }}>


        <View style={{ gap: 8 }}>
          <Text>Username</Text>
          <TextInput
            placeholder="Enter username"
            value={username}
            onChangeText={setUsernameInput}
            placeholderTextColor={"#000"}
            style={{ height: 44, borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8, borderRadius: 22, color: '#000', paddingHorizontal: 16 }}

          />
        </View>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default LoginScreen;