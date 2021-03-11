import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import firebase from 'firebase/app'

import { Loading } from '../../components/Loading'
 
export default function Restaurants() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user)
        })
    }, [])

    if(user === null) {
        return <Loading isVisible={true} text="Cargando..."></Loading>
    }

    return (
        <View style={styles.viewBody}>
            <Text>Restaurantes..</Text>
            {
                user && (
                    <Icon
                        type="material-community"
                        name="plus"
                        color="#e21e16"
                        reverse
                        containerStyle={styles.btnContainer}
                    >
                    </Icon>
                )
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5
    }
})
