import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty } from 'lodash'

import { reauthenticate, updateEmail } from '../../utils/action'

import { validateEmail } from '../../utils/helpers'
import { color } from 'react-native-reanimated'

export default function ChangeEmailForm({ email, setShowModal, toastRef, setReloadUser }) {
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSumit = async() => {

        if(!validadForm()) {
            return
        }

        setLoading(true)    
        const resultReauthenticate = await reauthenticate(password)

        if(!resultReauthenticate.statusResponse) {
            setErrorPassword("Contraseña incorrecta.")
            setLoading(false)
            return
        }

        const resultUpdateEmail = await updateEmail(newEmail)
        setLoading(false)

        if(!resultUpdateEmail.statusResponse) {
            setErrorEmail("No se puede cambiar por este correo, ya esta en uso por otro usuario.")
            return
        }

        setReloadUser(true)
        toastRef.current.show("Se ha actulializado el Email.", 2000)
        setShowModal(false) 
    }

    const validadForm = () => {

        setErrorEmail(null)
        setErrorPassword(null)

        let isValid = true

        if(!validateEmail(newEmail)) {
            setNewEmail("Debes ingresar un email valido.")
            isValid = false
        }

        if(newEmail === email) {
            setErrorEmail("Debes ingresar un email diferentes al actual.")
            isValid = false
        }

        if(isEmpty(password)) {
            setErrorPassword("Debes ingresar tu contraseña.")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa el nuevo correo..."
                containerStyle={styles.input}
                defaultValue={email}
                keyboardType="email-address"
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
            >
            </Input>
            <Input
                placeholder="Ingresa tu contraseña"
                containerStyle={styles.input}
                defaultValue={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={ 
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off-outline": "eye-outline"}
                        iconStyle={{ color: "#e21e16" }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                    </Icon>
                }
            >
            </Input>
            <Button
                title="Cambiar Email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSumit}
                loading={loading}
            >
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#e21e16"
    }
})
