import React from 'react'
import { StyleSheet, Text, ScrollView, Image } from 'react-native'
import Loading from '../../components/Loading';
import { Button } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()
    return (
        <ScrollView 
            centerContent
            style={styles.viewBody}
        >
            <Image 
                source={require("../../assets/clipart-restaurant-restaurant-logo-2.png")}
                resizeMode="contain"
                style={styles.image}
                >
                </Image>
                <Text style={styles.title}>Consulta tu perfil en Estaurants</Text>
                <Text style={styles.descripcion}>
                    ¿Como describirias tu mejor restaurante? Busca y visualiza los mejores restaurante de 
                    una forma sencilla, vota cual te ha gustado mas y comenta como ha sido tu experiencia.
                </Text>
                <Button
                    buttonStyle={styles.button}
                    title="Ver tu perfil"
                    onPress={() => navigation.navigate("login")}
                > 
                </Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    viewBody: {
        marginHorizontal: 30
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 10, 
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginVertical: 10,
        textAlign: "center"
    },
    descripcion: {
        textAlign: "justify",
        marginBottom: 20,
        color: "#9b3a24"
    },
    button: {
        backgroundColor: "#e21e16"
    }
})
