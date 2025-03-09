import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, Button, Pressable, SectionList, StyleSheet } from 'react-native';
import { setupSocket, sendMessage } from '@src/api/websocket';
import { getMessages, getRoomInformationById } from '@src/api/api';
import NavigationHeader from '@src/components/NavigationHeader';
import { UserContext } from '@src/context/UserContext';
import { ChatRoom, Messages } from '@src/type';

const ChatScreen = () => {
  const { userData, roomInformation } = useContext(UserContext)
  const [messages, setMessages] = useState<Messages>([]);
  const [roomInfo, setRoomInfo] = useState<ChatRoom | null>(null);

  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  console.log("ChatScreen socket", socket)
  // console.log("ChatScreen roomInfo", roomInfo)
  useEffect(() => {
    // Fetch Room Information
    const fetchRoomInformation = async () => {
      try {
        const response = await getRoomInformationById(roomInformation.id);
        setRoomInfo(response);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    // Fetch previous messages
    const fetchMessages = async () => {
      try {
        const messagesData = await getMessages(roomInformation.id);
        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchRoomInformation();
    fetchMessages();
    // Set up WebSocket connection
    const newSocket = setupSocket(roomInformation.id, userData?.username, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    // console.log("ChatScreen newSocket", newSocket)
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [roomInformation, userData]);
  console.log("ChatScreen messages", JSON.stringify(messages))

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = { userId: userData?.id, text: newMessage };
      sendMessage(socket, message);
      setNewMessage('');
    }
  };
  const groupMessagesByUserId = (messages) => {
    // Sort messages by created_at in ascending order
    messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    // Group by user_id
    const grouped = messages.reduce((acc, message) => {
      const { user_id, username } = message;

      let section = acc.find((s) => s.user_id === user_id);

      if (!section) {
        section = {
          user_id,
          title: username, // Section title (username)
          data: [],
        };
        acc.push(section);
      }

      section.data.push(message);
      return acc;
    }, []);

    return grouped;
  }
  const groupedMessages = groupMessagesByUserId(messages);

  console.log(groupedMessages);


  return (
    <View style={{ flex: 1, }}>
      <NavigationHeader
        title={roomInformation.name}
        isBackNavigation={true}
      />
      <SectionList
        sections={groupedMessages}
        keyExtractor={(item, index) => item.id.toString()}

        // Render Section Header (Username)
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.username}>{title}</Text>
          </View>
        )}

        // Render Messages
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.user_id === userData.id ? styles.sentMessage : styles.receivedMessage]}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
      />
      <View style={{ flexDirection: "row", padding: 16, borderTopWidth: 1, borderColor: "#ccc", gap: 8 }}>
        <TextInput
          placeholder="Type message here..."
          value={newMessage}
          onChangeText={setNewMessage}
          placeholderTextColor={"#000"}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8, flex: 1, height: 44, borderRadius: 22, color:'#000', paddingHorizontal:16 }}
        />
        <Pressable onPress={handleSendMessage} style={{ borderRadius: 22, justifyContent: "center", height: 44, backgroundColor: "#000", paddingHorizontal: 16 }} >
          <Text style={{ color: "#fff" }}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: "#f4f4f4",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  username: {
    fontWeight: "bold",
    color: "#555",
  },
  messageContainer: {
    padding: 10,
    marginVertical: 4,
    marginHorizontal:16,
    borderRadius: 8,
    maxWidth: "80%",
  },
  sentMessage: {
    backgroundColor: "#007aff",
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: "#e5e5ea",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#000",
  },
});