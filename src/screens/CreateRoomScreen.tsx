import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createRoom } from '@src/api/api';
import NavigationHeader from '@src/components/NavigationHeader';
import Toast from 'react-native-toast-message';
import { UserContext } from '@src/context/UserContext';

const CreateRoomScreen = ({ navigation }) => {
  const [roomName, setRoomName] = useState('');
  const { updateRoomInformation } = useContext(UserContext)

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "Please enter a room name",
      });
      return;
    }

    try {
      const roomData: any = await createRoom(roomName); // Pass room name and user 
      updateRoomInformation(roomData)
      navigation.navigate('Chat');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "Failed to create room. Please try again.",
      });
      console.log('Error creating room:', error);
      // Alert.alert('Error', 'Failed to create room. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationHeader
        title='Create Room'
        isBackNavigation={true}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.title}>Create a New Room</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter room name"
            value={roomName}
            onChangeText={setRoomName}
          />
          <Button title="Create Room" onPress={handleCreateRoom} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});

export default CreateRoomScreen;