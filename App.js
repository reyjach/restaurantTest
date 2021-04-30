import React, { useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';

import Navigation from './navigations/Navigation'

import { LogBox } from 'react-native'
import { startNotifications } from './utils/action';

LogBox.ignoreAllLogs()



export default function App() {

  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    startNotifications(notificationListener, responseListener)
  }, [])

  return (
    <Navigation></Navigation>
  );
}
