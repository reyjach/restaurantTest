import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import firebase from 'firebase/app'
import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash'

import Loading from '../../components/Loading'
import { getMoreRestaurants, getRestaurants } from '../../utils/action'
import ListRestaurants from '../../components/restaurants/ListRestaurants'
 
export default function Restaurants({ navigation }) {

    const [user, setUser] = useState(null)
    const [startRestaurant, setStartRestaurant] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false)

    const limitRestaurants = 7


    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            userInfo ? setUser(true) : setUser(false)
        })
    }, [])

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                setLoading(true)
                const response = await getRestaurants(limitRestaurants)
                if (response.statusResponse) {
                    setStartRestaurant(response.startRestaurant)
                    setRestaurants(response.restaurants)
                }
                setLoading(false)
            }
            getData()
        }, [])
    )

    const handleLoadMore = async() => {
        if(!startRestaurant){
            return
        }

        setLoading(true)

        const response = await getMoreRestaurants(limitRestaurants, startRestaurant)
                if (response.statusResponse) {
                    setStartRestaurant(response.startRestaurant)
                    setRestaurants([...restaurants, ...response.restaurants])
                }

        setLoading(false)
    }

    if(user === null) {
        return <Loading isVisible={true} text="Cargando..."></Loading>
    }

    return (
        <View style={styles.viewBody}>
            {
                size(restaurants) > 0 ? (
                    <ListRestaurants 
                        restaurants={restaurants} 
                        navigation={navigation} 
                        handleLoadMore={handleLoadMore}
                    >
                    </ListRestaurants>
                ) : (
                    <View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>No hay restaurantes registrados.</Text>
                    </View>
                )
            }
            {
                user && (
                    <Icon
                        type="material-community"
                        name="plus"
                        color="#e21e16"
                        reverse
                        containerStyle={styles.btnContainer}
                        onPress={() => navigation.navigate("add-restaurants")}
                    >
                    </Icon>
                )
            }
            <Loading isVisible={loading} text="cargando restaurantes"></Loading>
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
    },
    notFoundView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: "bold"
    }
})
