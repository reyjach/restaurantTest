import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Avatar } from 'react-native-elements'
import { updateProfile, uploadImage } from '../../utils/action'

import { loadImageFromGallery } from '../../utils/helpers'

export default function InfoUser({ user, setLoading, setLodingText }) {

    const [photoUrl, setPhotoUrl] = useState(user.photoURL)
    
    const changePhoto = async() => {
        const result = await loadImageFromGallery([1 , 1])

        if (!result.status) {
            return
        }

        setLodingText("Actialinzado imagen...")
        setLoading(true)

        const resultUpdateImage = await uploadImage(result.image, "avatars", user.uid)

        if(!resultUpdateImage.statusResponse){
            setLoading(false)
            Alert.alert("Ha ocurrido un problema al guardar la foto del perfil.")
            return 
        }

        const resultUpdateProfile = await updateProfile({ photoURL: resultUpdateImage.url })
        setLoading(false)

        if(resultUpdateProfile.statusResponse){
            setPhotoUrl(resultUpdateImage.url)
        } else {
            Alert.alert("Ha ocurrido un error al actualizar la foto del perfil")
        }      
    }

    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size="large"
                onPress={changePhoto}
                source={
                    photoUrl
                        ? {uri: photoUrl} 
                        : require("../../assets/avatar-default.jpg")
                }
            >
            </Avatar>
            <View style={styles.infoUser}>
                <Text style={styles.displayName}>
                    {
                        user.displayName ? user.displayName : "Anonimo"
                    }
                </Text>
                <Text>{user.email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical: 30
    },
    infoUser: {
        marginLeft: 20
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 5
    }

})
