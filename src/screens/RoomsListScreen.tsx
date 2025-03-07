import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Button, Text, Pressable } from 'react-native';
import { getRooms } from '@src/api/api';
import { UserContext } from '@src/context/UserContext';
import { ChatRooms } from '@src/type';
import RoomCard from '@src/components/RoomCard';
import NavigationHeader from '@src/components/NavigationHeader';
import { AddOutline } from '@src/assets/icons';


const RoomsListScreen = ({ navigation, route }) => {
  const [chatRooms, setChatRooms] = useState<ChatRooms>([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await getRooms();
        console.log("RoomsListScreen  roomsData", roomsData)

        setChatRooms(roomsData);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <NavigationHeader
        title="Channels"
        isBackNavigation={true}
        rightElement={
          <Pressable
            onPress={() => navigation.navigate('CreateRoom', { userId: userData?.id })}
            style={{ backgroundColor: "#000", padding: 8, borderRadius: 4 }}
          >
            <AddOutline />
          </Pressable>
        }
      />
      <FlatList
        data={chatRooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RoomCard
            roomName={item.name}
            handlePress={() => navigation.navigate('Chat', { roomId: item.id })}
          />
        )}
      />
    </View>
  );
};

export default RoomsListScreen;