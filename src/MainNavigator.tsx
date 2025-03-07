import React, { useContext, useEffect } from 'react';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@src/screens/LoginScreen';
import RoomsListScreen from '@src/screens/RoomsListScreen';
import ChatScreen from '@src/screens/ChatScreen';
import CreateRoomScreen from '@src/screens/CreateRoomScreen';
import { UserContext } from './context/UserContext';
import { RootNavigator } from './types';

const Stack = createStackNavigator<RootNavigator>();

const MainNavigator = () => {
    const { userData } = useContext(UserContext);
    const navigationRef = createNavigationContainerRef();
    useEffect(() => {
        if (userData?.id) {
            navigationRef.current?.navigate("RoomsList")
        }
    }, [userData])

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                    gestureDirection: 'horizontal',
                    animation: 'fade',
                }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="RoomsList" component={RoomsListScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="CreateRoom" component={CreateRoomScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;