import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'

export default function AddRestaurantsForm( {toastRef, setLoading, navigation} ) {

    const addRestaurant = () => {
        console.log("hola")
    }

    return (
        <View style={styles.viewContainer}>
            <FormApp></FormApp>
            <Button
                title="Crear restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            >
            </Button>
        </View>
    )
}

function FormApp() {
    const [country, setCountry] = useState("CO")
    const [callingCodo, setCallingCodo] = useState("57")
    const [phone, setPhone] = useState("")

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del restaurante"
            >
            </Input>
            <Input
                placeholder="Direccion del restaurante"
            >
            </Input>
            <Input
                keyboardType="email-address"
                placeholder="Email del restaurante"
            >
            </Input>
            <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect={(country) => {
                        setCountry(country.cca2)
                        setCallingCodo(country.callingCode[0])
                    }}
                >
                </CountryPicker>
                <Input
                    placeholder="WhatsApp del restaurante"
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                >
                </Input>
            </View>
            <Input
                    placeholder="Descripcion del restaurante"
                    multiline
                    containerStyle={styles.textArea}
                >
                </Input>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        height: "100%"
    },
    viewForm: {
        marginHorizontal: 10
    },
    textArea: {
        height: 100,
        width: "100%"
    },
    phoneView: {
        width: "80%",
        flexDirection: "row"
    },
    inputPhone: {
        width: "80%"
    },
    btnAddRestaurant: {
        margin: 20,
        backgroundColor: "#e21e16"
    }
})
