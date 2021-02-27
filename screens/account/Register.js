import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import RegisterForm from '../../components/account/RegisterForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Register() {
    return (
        <KeyboardAwareScrollView>
            <Image 
                source={require("../../assets/clipart-restaurant-restaurant-logo-2.png")}
                resizeMode="contain"
                style={styles.image}
            >
            </Image>
            <RegisterForm></RegisterForm>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
   
    image: {
        height: 150,
        width: "100%",
        marginBottom: 20
    }
    
})
