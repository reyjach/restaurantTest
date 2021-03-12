import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'

export default function AddRestaurantsForm( {toastRef, setLoading, navigation} ) {

    const [formData, setFormData] = useState(defaulFormValue())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)

    const addRestaurant = () => {
        console.log(formData)
        console.log("hola")
    }

    return (
        <View style={styles.viewContainer}>
            <FormApp
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescription={errorDescription}
                errorEmail={errorEmail}
                errorAddress={errorAddress}
                errorPhone={errorPhone}
            >
            </FormApp>
            <Button
                title="Crear restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            >
            </Button>
        </View>
    )
}

function FormApp({ formData, setFormData, errorName, errorDescription, errorEmail, errorAddress, errorPhone}) {
    const [country, setCountry] = useState("CO")
    const [callingCodo, setCallingCodo] = useState("57")
    const [phone, setPhone] = useState("")

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del restaurante"
                defaultValue={formData.name}
                onChange={(e)=> onChange(e, "name")}
                errorMessage={errorName}
            >
            </Input>
            <Input
                placeholder="Direccion del restaurante"
                defaultValue={formData.address}
                onChange={(e)=> onChange(e, "address")}
                errorMessage={errorAddress}
            >
            </Input>
            <Input
                keyboardType="email-address"
                placeholder="Email del restaurante"
                defaultValue={formData.email}
                onChange={(e)=> onChange(e, "email")}
                errorMessage={errorEmail}
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
                        setFormData({...formData, country: country.cca2, callingCode: country.callingCode[0]})
                    }}
                >
                </CountryPicker>
                <Input
                    placeholder="WhatsApp del restaurante"
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e)=> onChange(e, "phone")}
                    errorMessage={errorPhone}
                >
                </Input>
            </View>
            <Input
                placeholder="Descripcion del restaurante"
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.description}
                onChange={(e)=> onChange(e, "description")}
                errorMessage={errorDescription}
            >
            </Input>
        </View>
    )
}

const defaulFormValue = () => {
    return {
        name: "",
        description: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        callingCode: "57"
    }
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
