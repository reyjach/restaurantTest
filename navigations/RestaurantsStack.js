import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Restaurants from '../screens/restaurants/Restaurants'
import AddRestaurants from '../screens/restaurants/AddRestaurants'
import Restaurant from '../screens/restaurants/Restaurant'
import AddReviewRestaurant from '../screens/restaurants/AddReviewRestaurant'

const Stack = createStackNavigator()

export default function RestaurantsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="restaurants" component={Restaurants} options={{ title: "Restaurantes" }}></Stack.Screen>
            <Stack.Screen name="add-restaurants" component={AddRestaurants} options={{ title: "Crear Restaurante" }}></Stack.Screen>
            <Stack.Screen name="restaurant" component={Restaurant}></Stack.Screen>
            <Stack.Screen name="add-review-restaurant" component={AddReviewRestaurant} options={{ title: "Nuevo comentario" }}></Stack.Screen>
        </Stack.Navigator>
        
    )
}
