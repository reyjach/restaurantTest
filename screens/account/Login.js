import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import LoginForm from '../../components/account/LoginForm'


export default function Login() {
    
    return (
        <KeyboardAwareScrollView>
            <Image 
                source={require("../../assets/clipart-restaurant-restaurant-logo-2.png")}
                resizeMode="contain"
                style={styles.image}
            >
            </Image>
            <View style={styles.container}>
                <LoginForm></LoginForm>
                <CreateAccount></CreateAccount>
            </View>
            <Divider style={styles.divider}></Divider>
        </KeyboardAwareScrollView>
       
    )
}

function CreateAccount(props) {
    const navigation = useNavigation()
    return (
        <Text style={styles.register} onPress={() => navigation.navigate("register")}>
            ¿Aun no tienes una cuenta{" "}
            <Text style={styles.btnRegister}>
                Registrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width: "100%",
        marginBottom: 20
    },
    container: {
        marginHorizontal: 40
    },
    divider: {
        backgroundColor: "#e21e16",
        margin: 40
    },
    register: {
        marginTop: 15,
        marginHorizontal: 10,
        alignSelf: "center"
    },
    btnRegister: {
        color: "#e21e16",
        fontWeight: "bold"
    }
})
