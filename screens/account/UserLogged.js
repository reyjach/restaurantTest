import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'

import { closeSession, getCurrentUser } from '../../utils/action'
import Loading from '../../components/Loading'
import InfoUser from '../../components/account/InfoUser'
import AccountOption from '../../components/account/AccountOption'

export default function UserLogged() {

    const toastRef = useRef()

    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [lodingText, setLodingText] = useState("")
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(getCurrentUser)
    },[])

    return (
        <View style={styles.container}>
            {
                user && (
                    <View>
                        <InfoUser 
                            user={user} 
                            setLoading={setLoading} 
                            setLodingText={setLodingText}
                        >
                        </InfoUser>
                        <AccountOption
                            user={user}
                            toastRef={toastRef}
                        >
                        </AccountOption>
                    </View>
                )
            }
            
            <Button
                title="Cerrar Sesion"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionTitle}
                onPress={() => {
                    closeSession()
                    navigation.navigate("restaurants")
                }}
            >
            </Button>
            <Toast ref={toastRef} position="center" opacity={0.9}></Toast>
            <Loading isVisible={loading} text={lodingText}></Loading>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backgroundColor: "#f9f9f9"
    },
    btnCloseSession: {
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#e21e16",
        borderBottomWidth: 1,
        borderBottomColor: "#e21e16",
        paddingVertical: 10
    },
    btnCloseSessionTitle: {
        color: "#e21e16"
    }
})
