import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, Dimensions } from 'react-native'
import { Avatar, Button, Icon, Input, Image } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { map, size, filter, isEmpty} from 'lodash'
import MapView from 'react-native-maps'

import { getCurrentLocation, loadImageFromGallery, validateEmail } from '../../utils/helpers'
import Modal from '../../components/Modal'


const withScreen = Dimensions.get("window").width


export default function AddRestaurantsForm( {toastRef, setLoading, navigation} ) {

    const [formData, setFormData] = useState(defaulFormValue())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [locationRestaurant, setLocationRestaurant] = useState(null)

    const addRestaurant = () => {
        if(!validForm()) {
            return 
        }
    }

    const validForm = () => {
        clearError()

        let isValid = true

        if(isEmpty(formData.name)) {
            setErrorName("Debes ingresar el nombre del restaurante")
            isValid = false 
        }

        if(!validateEmail(formData.name)) {
            setErrorEmail("Debes ingresar un email de restaurante valido")
            isValid = false 
        }

        if(isEmpty(formData.address)) {
            setErrorAddress("Debes ingresar la dirrecion del restaurante")
            isValid = false 
        }

        if(size(formData.phone) < 10) {
            setErrorPhone("Debes ingresar un telefono del restaurante valido")
            isValid = false 
        }

        if(isEmpty(formData.description)) {
            setErrorDescription("Debes ingresar una descripcion del restaurante")
            isValid = false 
        }

        if(!locationRestaurant) {
            toastRef.current.show("Debes de localizar el restaurante en el mapa", 3000)
            isValid = false
        } else if(size(imagesSelected) === 0) {
            toastRef.current.show("Debes de agregar al menos 1 imagen al restaurante", 3000)
            isValid = false
        }

        return isValid
    }

    const clearError = () => {

        setErrorAddress(null)
        setErrorDescription(null)
        setErrorEmail(null)
        setErrorName(null)
        setErrorPhone(null)
    }

    return (
        <ScrollView style={styles.viewContainer}>
            <ImageRestaurant 
                imageRestaurant={imagesSelected[0]}
            >
            </ImageRestaurant>
            <FormApp
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescription={errorDescription}
                errorEmail={errorEmail}
                errorAddress={errorAddress}
                errorPhone={errorPhone}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
            >
            </FormApp>
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            >
            </UploadImage>
            <Button
                title="Crear restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            >
            </Button>
            <MapRestaurant
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationRestaurant={setLocationRestaurant}
                toastRef={toastRef}
            >
            </MapRestaurant>
        </ScrollView>
    )
}

function MapRestaurant ({ isVisibleMap, setIsVisibleMap ,setLocationRestaurant, toastRef }) {

    const [newRegion, setNewRegion] = useState(null)

    useEffect(() => {
        (async()=>{
            const response = await getCurrentLocation()
            if (response.status){
                setNewRegion(response.location)
            }
        })()
    }, [])

    const confirmLocation = () => {
        setLocationRestaurant(newRegion)
        toastRef.current.show("Localizacion guardada correctamente", 2000)
        setIsVisibleMap(false)
    }

    return (
        <Modal
            isVisible={isVisibleMap}
            setVisible={setIsVisibleMap}
        >
            <View>
                {
                    newRegion && (
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={newRegion}
                            showsUserLocation={true}
                            onRegionChange={(region) => setNewRegion(region)}
                        >
                            <MapView.Marker
                                coordinate={{
                                    latitude: newRegion.latitude,
                                    longitude: newRegion.longitude
                                }}
                                draggable
                            >
                            </MapView.Marker>
                        </MapView>
                    )
                }
                <View
                    style={styles.viewMapBtn}
                >
                    <Button
                        title="Guardar ubicacion"
                        containerStyle={styles.viewMapContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                        onPress={ confirmLocation }
                    >
                    </Button>
                    <Button
                        title="Cancelar ubicacion"
                        containerStyle={styles.viewMapContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => setIsVisibleMap(false)}
                    >
                    </Button>
                </View>
            </View>
        </Modal>
    )
}

function ImageRestaurant ({ imageRestaurant }) {
    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{ width: withScreen, height: 200 }}
                source={
                    imageRestaurant 
                        ? { uri : imageRestaurant}
                        : require("../../assets/no-image.png")
                }
            >
            </Image>
        </View>
    )
}

function UploadImage ({ toastRef, imagesSelected, setImagesSelected}) {

    const imageSelect = async() => {
        const response = await loadImageFromGallery([4, 3])

        if (!response.status) {
            toastRef.current.show("No has seleccionado ninguna imagen.", 2000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar imagen",
            "¿Estas seguro que quieres eliminar la imagen?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Si",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }

    return (
        <ScrollView
            horizontal
            style={styles.viewImage}
        >
            {
                size(imagesSelected) < 10 && (
                    <Icon
                        type="material-community"
                        name="camera"
                        color="#a7a7a7a7"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    >
                    </Icon>
                )
               
            }
            {
                map(imagesSelected, (imageRestaurant, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imageRestaurant}}
                        onPress={() => removeImage(imageRestaurant)}
                    >
                    </Avatar>
                ))
            }
           
        </ScrollView>
    )
}

function FormApp ({ 
    formData, 
    setFormData, 
    errorName, 
    errorDescription, 
    errorEmail, 
    errorAddress, 
    errorPhone, 
    setIsVisibleMap, 
    locationRestaurant}) {
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
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationRestaurant ? "#9b3a24" : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
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
    },
    viewImage: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3e3"
    },
    miniatureStyle: {
        height: 70,
        width: 70,
        marginRight: 10
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    mapStyle: {
        width: "100%",
        height: 550
    },
    viewMapBtn:{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapContainerCancel: {
        paddingLeft: 5
    },
    viewMapContainerSave: {
        paddingRight: 5
    },
    viewMapBtnCancel: {
        backgroundColor: "#e21e16"
    },
    viewMapBtnSave: {
        backgroundColor: "#9b3a24"
    }
})
