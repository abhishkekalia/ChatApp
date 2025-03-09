import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from '@src/context/UserContext';
import MainNavigator from './MainNavigator';
import Toast from 'react-native-toast-message';
import { toastConfig } from './components/CustomToast';


const App = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <UserProvider>
                <MainNavigator />
            </UserProvider>
            <Toast config={toastConfig} />

        </GestureHandlerRootView>
    );
};

export default App;