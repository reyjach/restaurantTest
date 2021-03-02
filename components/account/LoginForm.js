import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'

import Loading from '../Loading'
import { validateEmail } from '../../utils/helpers'
import { LoginWithEmailAndPassword } from '../../utils/action'


export default function LoginForm() {

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaulFormValue())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPasword, setErrorPasword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const doLogin= async() => {
        if(!validateData()) {
            return;
        }

        setLoading(true)

        const result = await LoginWithEmailAndPassword(formData.email, formData.password)

        setLoading(false)

        if(!result.statusResponse)
        {
            setErrorEmail(result.error)
            setErrorPasword(result.error)
            return;
        }

        navigation.navigate("account")

    }
    const validateData = () => {
        setErrorEmail("")
        setErrorPasword("")

        let isValid = true

        if(!validateEmail(formData.email)){
            setErrorEmail("Debe ingresar un email valido.")
            isValid = false
        }
        if(isEmpty(formData.password)){
            setErrorPasword("Debes ingresar tu contraseña.")
        }

        return isValid
    }

    return (
        <View style={styles.container}>
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
            <Button
                title="Iniciar Sesion"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doLogin()}
            >
            </Button>
            <Loading isVisible={loading} text="Iniciando Sesion..."></Loading>
        </View>
    )
}

const defaulFormValue = () => {
    return {email: "", password: ""}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
