import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from '@src/context/UserContext';
import MainNavigator from './MainNavigator';


const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <UserProvider>
                <MainNavigator />
            </UserProvider>
        </GestureHandlerRootView>
    );
};

export default App;