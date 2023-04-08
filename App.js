import React, { useEffect, useState } from 'react'
import {
  NavigationContainer
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import { ToastProvider } from 'react-native-paper-toast'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import * as location from 'expo-location'
import Login from './src/screens/login/Login';
import Register from './src/screens/Register/Register';
import OtpScreen from './src/screens/OtpScreen/OtpScreen';
import Home from './src/screens/home/Home';
import BookPreview from './src/screens/BookPreview';
import BookReader from './src/components/Reader/BookReader';
import PrivacyPolicy from './src/screens/PrivacyPolicy/PrivacyPolicy';
import Support from './src/screens/Support/Support';
import MyBooks from './src/screens/MyBooks';
import Cart from './src/screens/Cart';
import Payment from './src/screens/Payment';
import Profile from './src/screens/Profile/Profile';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <PaperProvider theme={DefaultTheme}>
            <ToastProvider>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false
                  }}
                >
                  <Stack.Screen
                    name='home'
                    component={Home}
                  />
                  <Stack.Screen
                    name='bookPreview'
                    component={BookPreview}
                  />
                  <Stack.Screen
                    name='reader'
                    component={BookReader}
                  />
                  <Stack.Screen
                    name='login'
                    component={Login}
                  />
                  <Stack.Screen
                    name='register'
                    component={Register}
                  />
                  <Stack.Screen
                    name="otpscreen"
                    component={OtpScreen}
                  />
                  <Stack.Screen
                    name="privacypolicy"
                    component={PrivacyPolicy}
                  />
                  <Stack.Screen
                    name="support"
                    component={Support}
                  />
                  <Stack.Screen
                    name="library"
                    component={MyBooks}
                  />
                  <Stack.Screen
                    name="cart"
                    component={Cart}
                  />
                  <Stack.Screen
                    name="payment"
                    component={Payment}
                  />
                  <Stack.Screen
                    name="profile"
                    component={Profile}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </ToastProvider>
          </PaperProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}
