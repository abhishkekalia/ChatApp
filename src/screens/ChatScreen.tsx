import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, Button } from 'react-native';
import { setupSocket, sendMessage } from '@src/api/websocket';
import { getMessages, getRoomInformationById } from '@src/api/api';
import NavigationHeader from '@src/components/NavigationHeader';
import { UserContext } from '@src/context/UserContext';
import { ChatRoom, Messages } from '@src/type';

const ChatScreen = ({ route }) => {
  const { roomId } = route.params;
  const [messages, setMessages] = useState<Messages>([]);
  const [roomInformation, setRoomInformation] = useState<ChatRoom | null>(null);

  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    // Fetch Room Information
    const fetchRoomInformation = async () => {
      try {
        const response = await getRoomInformationById(roomId);
        setRoomInformation(response);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    // Fetch previous messages
    const fetchMessages = async () => {
      try {
        const messagesData = await getMessages(roomId);
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchRoomInformation();
    fetchMessages();
    // Set up WebSocket connection
    const newSocket = setupSocket(
      roomId,
      userData?.username,
      (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      },
    );

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [roomId, userData]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = { userId: userData?.id, text: newMessage };
      sendMessage(socket, message);
      setNewMessage('');
    }
  };

  return (
    <View style={{ flex: 1, }}>
      <NavigationHeader
        title='Chat'
        isBackNavigation={true}
      />
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 8 }}>
            {item.room_id === roomId ? (
              <Text style={{ alignSelf: 'flex-end' }}>{item.content}</Text>
            ) : (
              <Text>{item.content}</Text>
            )}
          </View>
        )}
      />
      <TextInput
        placeholder="Type message here..."
        value={newMessage}
        onChangeText={setNewMessage}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8 }}
      />
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};

export default ChatScreen;