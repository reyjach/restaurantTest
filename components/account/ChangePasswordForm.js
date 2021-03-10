import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty, size } from 'lodash'

import { reauthenticate, updateEmail } from '../../utils/action'


import { validateEmail } from '../../utils/helpers'
import { color } from 'react-native-reanimated'


export default function ChangePasswordForm( { setShowModal, toastRef } ) {
    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSumit = async() => {

        if(!validadForm()) {
            return
        }

        /* setLoading(true)    
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
        setShowModal(false) */ 
    }

    const validadForm = () => {

        setErrorNewPassword(null)
        setCurrentPassword(null)
        setErrorConfirmPassword(null)

        let isValid = true

        if(isEmpty(currentPassword)) {
            setErrorCurrentPassword("Debes ingresar tu contraseña actual.")
            isValid = false
        }

        if(size(newPassword) < 6) {
            setErrorNewPassword("Debes ingresar una nueva contraseña de al menos 6 caracteres.")
            isValid = false
        }

        if(size(confirmPassword) < 6) {
            setErrorConfirmPassword("Debes ingresar una nueva confirmacion de tu contraseña de al menos 6 caracteres.")
            isValid = false
        }

        if(newPassword !== confirmPassword) {
            setErrorNewPassword("La nueva contraseña y la confirmacion no son iguales.")
            setErrorConfirmPassword("La nueva contraseña y la confirmacion no son iguales.")
            isValid = false
        }

        if(newPassword === currentPassword) {
            setErrorNewPassword("Debe ingresar una contraseña diferente a la actual.")
            setErrorConfirmPassword("Debe ingresar una contraseña diferente a la actual.")
            setErrorCurrentPassword("Debe ingresar una contraseña diferente a la actual.")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa tu contraseña actual..."
                containerStyle={styles.input}
                defaultValue={currentPassword}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
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
            <Input
                placeholder="Ingresa tu nueva contraseña"
                containerStyle={styles.input}
                defaultValue={newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
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
            <Input
                placeholder="Ingresa tu confirmacion de nueva contraseña"
                containerStyle={styles.input}
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
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
                title="Cambiar Contraseña"
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
