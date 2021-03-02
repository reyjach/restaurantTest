import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { closeSession } from '../../utils/action'

export default function UserLogged() {

    const navigation = useNavigation()

    return (
        <View>
            <Text>userLogged...</Text>
            <Button
                title="Cerrar Sesion"
                onPress={() => {
                    closeSession()
                    navigation.navigate("restaurants")
                }}
            >
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({})
