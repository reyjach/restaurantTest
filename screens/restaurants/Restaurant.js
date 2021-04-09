import React, { useState, useCallback } from 'react'
import { map } from 'lodash'
import { Alert, Dimensions ,StyleSheet, Text, View, ScrollView } from 'react-native'
import { Icon, ListItem, Rating } from 'react-native-elements'

import CarouselImages from '../../components/CarouselImages'
import Loading from '../../components/Loading'
import MapRestaurant from '../../components/restaurants/MapRestaurant'
import { getDocumentById } from '../../utils/action'
import { formatPhone } from '../../utils/helpers'
import ListReview from '../../components/restaurants/ListReview'
import { useFocusEffect } from '@react-navigation/native'


const withScreen = Dimensions.get("window").width

export default function Restaurant({ navigation, route }) {

    const { id, name } = route.params

    const [restaurant, setRestaurant] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)

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

    

    if(!restaurant) {
        return <Loading isVisible={true} text="cargando..."></Loading>
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
            >
            </RestaurantInfo>
            <ListReview
                navigation={navigation}
                idRestaurant={restaurant.id}
            />
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

function RestaurantInfo ({ name, location, address, email, phone }) {

    const listInfo =[
        { text: address, iconName: "map-marker"},
        { text: phone, iconName: "phone"},
        { text: email, iconName: "at"},
    ]

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
                            name={item.iconName}
                            color="#e21e16"
                        >
                        </Icon>
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
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
    }
})
