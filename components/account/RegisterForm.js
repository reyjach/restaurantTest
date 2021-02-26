import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'

export default function RegisterForm() {
    return (
        <View style={styles.form}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu Email..."
            >
            </Input>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu contraseña..."
                password={true}
                secureTextEntry={true}
            >
            </Input>
            <Input
                containerStyle={styles.input}
                placeholder="confirma tu contraseña..."
                password={true}
                secureTextEntry={true}
            >
            </Input>
            <Button
                title="Registrar Nuevo usuario"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
            >
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 30
    },
    input: {
        width: "100%"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#e21e16"
    }
})
