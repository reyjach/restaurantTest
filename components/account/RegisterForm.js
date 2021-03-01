import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'

import { validateEmail } from '../../utils/helpers'
import { registerUser } from '../../utils/action'

const navigation = useNavigation()
export default function RegisterForm() {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaulFormValue())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPasword, setErrorPasword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const doRegisterUser = async() => {
        if(!validateData()) {
            return;
        }

        const result = await registerUser(formData.email, formData.password)
        if(!result.statusResponse)
        {
            setErrorEmail(result.error)
            return;
        }

        navigation.navigate("account")

    }

    const validateData = () => {
        setErrorConfirm("")
        setErrorEmail("")
        setErrorPasword("")

        let isValid = true

        if(!validateEmail(formData.email)){
            setErrorEmail("Debe ingresar un email valido.")
            isValid = false
        }

        if(size(formData.password) < 6) {
            setErrorPasword("Debes ingresar una contraseña de al menos de 6 caracteres.")
            isValid = false
        }
        if(size(formData.confirm) < 6) {
            setErrorConfirm("Debes ingresar una confirmacion de contraseña de al menos de 6 caracteres.")
            isValid = false
        }
        if(formData.password !== formData.confirm) {
            setErrorPasword("La contraseña y la confirmacion no son iguales.")
            setErrorConfirm("La contraseña y la confirmacion no son iguales.")
            isValid = false
        }

        return isValid
    }
    return (
        <View style={styles.form}>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu Email..."
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            >
            </Input>
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPasword}
                defaultValue={formData.password}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={ showPassword ? "eye-off-outline": "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                    </Icon>
                }
            >
            </Input>
            <Input
                containerStyle={styles.input}
                placeholder="confirma tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "confirm")}
                errorMessage={errorConfirm}
                defaultValue={formData.confirm}
                rightIcon={
                    <Icon 
                        type="material-community"
                        name={ showPassword ? "eye-off-outline": "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                    </Icon>
                }
            >
            </Input>
            <Button
                title="Registrar Nuevo usuario"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doRegisterUser()}
            >
            </Button>
        </View>
    )
}

const defaulFormValue = () => {
    return {email: "", password: "", confirm: ""}
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
    },
    icon: {
        color: "#c1c1c1"
    }
})
