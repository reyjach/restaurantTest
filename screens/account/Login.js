import React from 'react'
import { ScrollView, Image, StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'


export default function Login() {
    
    return (
        <ScrollView>
            <Image 
                source={require("../../assets/clipart-restaurant-restaurant-logo-2.png")}
                resizeMode="contain"
                style={styles.image}
            >
            </Image>
            <View style={styles.container}>
                <Text>Login Form</Text>
                <CreateAccount></CreateAccount>
            </View>
            <Divider style={styles.divider}></Divider>
        </ScrollView>
       
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
