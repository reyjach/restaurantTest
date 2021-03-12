import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loading from '../../components/Loading'

import AddRestaurantsForm from '../../components/restaurants/AddRestaurantsForm'


export default function AppRestaurants({ navigation }) {

    const toastRef = useRef()
    const [loading, setLoading] = useState(false)

    return (
        <KeyboardAwareScrollView>
            <AddRestaurantsForm toastRef={toastRef} setLoading={setLoading} navigation={navigation}></AddRestaurantsForm>
            <Loading isVisible={loading} text="Creando Restaurante"></Loading>
            <Toast ref={toastRef} position="center" opacity={0.9}></Toast>
        </KeyboardAwareScrollView>
    )
}



const styles = StyleSheet.create({})
