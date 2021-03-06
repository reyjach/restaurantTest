import React, { useState, useCallback, useRef, useEffect } from 'react'
import { isEmpty, map } from 'lodash'
import { Alert, Dimensions ,StyleSheet, Text, View, ScrollView } from 'react-native'
import { Icon, ListItem, Rating, Input, Button } from 'react-native-elements'
import firebase from 'firebase/app'
import Toast from 'react-native-easy-toast'
import { useFocusEffect } from '@react-navigation/native'

import CarouselImages from '../../components/CarouselImages'
import Loading from '../../components/Loading'
import MapRestaurant from '../../components/restaurants/MapRestaurant'
import { addDocumentWithoutId, deleteFavorite, getCurrentUser, getDocumentById, getIsFavorite, getUsersFavorite, sendPushNotification, setNotificationMessage } from '../../utils/action'
import { callNumber, formatPhone, sendEmail, sendWhatsApp } from '../../utils/helpers'
import ListReview from '../../components/restaurants/ListReview'
import Modal from '../../components/Modal'




const withScreen = Dimensions.get("window").width

export default function Restaurant({ navigation, route }) {

    const { id, name } = route.params

    const toastRef = useRef()

    const [restaurant, setRestaurant] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [userLogged, setUserLogged] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modalNotification, setModalNotification] = useState(false)
    
    firebase.auth().onAuthStateChanged(user => {
        user ? setUserLogged(true) : setUserLogged(false)
        setCurrentUser(user)
    })

    useFocusEffect(
        useCallback(() => {
            (async() => {
                const response = await getDocumentById("restaurants", id)
    
                if (response.statusResponse) {
                    setRestaurant(response.document)
                } else {
                    setRestaurant({})
                    Alert.alert("Ocurrió un problema cargando el restaurante, intente más tarde.")
                }
    
            })()
        }, [])
    )

    useEffect(() => {
        (async() => {
            if (userLogged && restaurant) {
                const response = await getIsFavorite(restaurant.id)
                response.statusResponse && setIsFavorite(response.isFavorite)
            }
        })()
    }, [userLogged, restaurant])

    if(!restaurant) {
        return <Loading isVisible={true} text="cargando..."></Loading>
    }

    const addFavorite = async() => {
        if (!userLogged) {
            toastRef.current.show("Para agregar el restaurante a favoritos debes estar logueado.", 2000)
            return
        }

        setLoading(true)
        const response = await addDocumentWithoutId("favorites", {
            idUser: getCurrentUser().uid,
            idRestaurant: restaurant.id
        })
        setLoading(false)
        if (response.statusResponse) {
            setIsFavorite(true)
            toastRef.current.show("Restaurante añadido a favoritos.", 2000)
        } else {
            toastRef.current.show("No se pudo adicionar el restaurante a favoritos. Por favor intenta más tarde.", 2000)
        } 
    }

    const removeFavorite = async() => {
        
        setLoading(true)
        const response = await deleteFavorite(restaurant.id)
        setLoading(false)

        if (response.statusResponse) {
            setIsFavorite(false)
            toastRef.current.show("Restaurante eliminado de favoritos.", 3000)
        } else {
            toastRef.current.show("No se pudo eliminar el restaurante de favoritos. Por favor intenta más tarde.", 3000)
        }
    }

    navigation.setOptions({ title: name })

    return (
        <ScrollView style={styles.viewBody}>
            <CarouselImages 
                images={restaurant.images}
                height={250}
                width={withScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            >
            </CarouselImages>
            <View style={styles.viewFavorite}>
                <Icon
                    type="material-community"
                    name={ isFavorite ? "heart" : "heart-outline" }
                    onPress={ isFavorite ? removeFavorite : addFavorite }
                    color="#442484"
                    size={35}
                    underlayColor="tranparent"
                />
            </View>
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}
            >
            </TitleRestaurant>
            <RestaurantInfo
                name={restaurant.name}
                location={restaurant.location}
                address={restaurant.address}
                email={restaurant.email}
                phone={formatPhone(restaurant.callingCode, restaurant.phone)}
                currentUser={currentUser}
                callingCode={restaurant.callingCode}
                phoneNoFormat={restaurant.phone}
                setLoading={setLoading}
                setModalNotification={setModalNotification}
            >
            </RestaurantInfo>
            <ListReview
                navigation={navigation}
                idRestaurant={restaurant.id}
            />
            <SendMessage
                modalNotification={modalNotification}
                setModalNotification={setModalNotification}
                setLoading={setLoading}
                restaurant={restaurant}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text="Por favor espere..."/>
        </ScrollView>
    )
}


function TitleRestaurant ({ name, description, rating }) {
    return (
        <View style={styles.viewRestaurantTitle}>
            <View style={styles.viewRestaurantContainer}>
                <Text style={styles.nameRestaurant}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                >
                </Rating>
            </View>
            <Text style={styles.descriptionRestaurant}>{description}</Text>
        </View>
    )
}

function SendMessage ({ modalNotification, setModalNotification, setLoading, restaurant }) {
    const [title, setTitle] = useState(null)
    const [errorTitle, setErrorTitle] = useState(null)
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const sendNotification = async() => {
        if (!validForm()) {
            return
        }

        setLoading(true)
        const userName = getCurrentUser().displayName ? getCurrentUser().displayName : "Anónimo"
        const theMessage = `${message}, del restaurante: ${restaurant.name}`

        const usersFavorite = await getUsersFavorite(restaurant.id)
        if (!usersFavorite.statusResponse) {
            setLoading(false)
            Alert.alert("Error al obtener los usuarios que aman el restaurante.")
            return
        }

        console.log(usersFavorite.users)

        await Promise.all (
            map(usersFavorite.users, async(user) => {
                const messageNotification = setNotificationMessage(
                    user.token,
                    `${userName}, dijo: ${title}`,
                    theMessage,
                    { data: theMessage}
                )

                console.log("hola 2")
        
                await sendPushNotification(messageNotification)
            })
        )

        setLoading(false)
        setTitle(null)
        setMessage(null)
        setModalNotification(false)
    }

    const validForm = () => {
        let isValid = true;

        if (isEmpty(title)) {
            setErrorTitle("Debes ingresar un título a tu mensaje.")
            isValid = false
        }

        if (isEmpty(message)) {
            setErrorMessage("Debes ingresar un mensaje.")
            isValid = false
        }

        return isValid
    }

    return (
        <Modal
            isVisible={modalNotification}
            setVisible={setModalNotification}
        >
            <View style={styles.modalContainer}>
                <Text style={styles.textModal}>
                    Envíaale un mensaje a los amantes de {restaurant.name}
                </Text>
                <Input
                    placeholder="Título del mensaje..."
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                    errorMessage={errorTitle}
                />
                <Input
                    placeholder="Mensaje..."
                    multiline
                    inputStyle={styles.textArea}
                    onChangeText={(text) => setMessage(text)}
                    value={message}
                    errorMessage={errorMessage}
                />
                <Button
                    title="Enviar Mensaje"
                    buttonStyle={styles.btnSend}
                    containerStyle={styles.btnSendContainer}
                    onPress={sendNotification}
                />
            </View>
        </Modal>
    )
}

function RestaurantInfo ({ name, 
    location, 
    address, 
    email, 
    phone, 
    currentUser, 
    callingCode, 
    phoneNoFormat, 
    setLoading,
    setModalNotification }) {

    const listInfo =[
        { type: "addres", text: address, iconLeft: "map-marker", iconRight: "message-text-outline" },
        { type: "phone", text: phone, iconLeft: "phone", iconRight: "whatsapp" },
        { type: "email", text: email, iconLeft: "at" },
    ]

    const actionLeft = (type) => {
        if (type == "phone") {
            callNumber(phone)
        } else if (type == "email") {
            if (currentUser) {
                sendEmail(email, "Interesado", `Soy ${currentUser.displayName}, estoy interesado en sus servicios`)
            } else {
                sendEmail(email, "Interesado", `Estoy interesado en sus servicios`)
            }
        } 
    }


    const actionRight = (type) => {
        if (type == "phone") {
            if (currentUser) {
                sendWhatsApp(`${callingCode} ${phoneNoFormat}`, `Soy ${currentUser.displayName}, estoy interesado en sus servicios`)
            } else {
                sendWhatsApp(`${callingCode} ${phoneNoFormat}`, `Estoy interesado en sus servicios`)
            }
        } else if (type == "addres") {
            setModalNotification(true)
        }
    }

    return (
        <View style={styles.viewRestaurantInfo}>
            <Text
                style={styles.restaurantInfoTitle}
            >Informacion sbore el restaurante
            </Text>
            <MapRestaurant
                location={location}
                name={name}
                height={150}
            >
            </MapRestaurant>
            
            {
                map(listInfo, (item, index) => (
                    <ListItem
                        key={index}
                        style={styles.containerListItem}
                    >
                        <Icon
                            type="material-community"
                            name={item.iconLeft}
                            color="#e21e16"
                            onPress={() => actionLeft(item.type)}
                        >
                        </Icon>
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                        {
                            item.iconRight && (
                                <Icon
                                    type="material-community"
                                    name={item.iconRight}
                                    color="#442484"
                                    onPress={() => actionRight(item.type)}
                                />
                            )
                        }
                    </ListItem>
                ))
            }
        </View>
    )

}



const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    viewRestaurantTitle: {
        padding: 15
    },
    viewRestaurantContainer: {
        flexDirection: "row"
    },
    descriptionRestaurant: {
        marginTop: 5,
        color: "gray",
        textAlign: "justify"
    },
    rating: {
        position: "absolute",
        right: 0
    },
    nameRestaurant:{
        fontWeight: "bold"
    },
    viewRestaurantInfo: {
        margin: 15,
        marginTop: 25,
    },
    restaurantInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    containerListItem: {
        borderBottomColor: "#9b3a24",
        borderBottomWidth: 1
    },
    viewFavorite: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15
    },
    textArea: {
        height: 50,
        paddingHorizontal: 10
    },
    btnSend: {
        backgroundColor: "#442848"
    },
    btnSendContainer: {
        width: "95%"
    },
    textModal: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold"
    },
    modalContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
})
