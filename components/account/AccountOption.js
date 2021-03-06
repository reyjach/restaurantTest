import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { map } from 'lodash'
import { Icon, ListItem } from 'react-native-elements'

export default function AccountOption({ user, toastRef }) {

    const menuOption = generateOption()



    return (
        <View>
            {
                map(menuOption, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}

                    >
                        <Icon
                            type="material-community"
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                        >
                        </Icon>
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        >
                        </Icon>
                    </ListItem>
                ))
            }
        </View>
    )
}

function generateOption () {
    return [
        {
            title: "Cambiar Nombres y Apellidos",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ac7464",
            iconNameRight: "chevron-right",
            iconColorRight: "#ac7464"
        },
        {
            title: "Cambiar Email",
            iconNameLeft: "at",
            iconColorLeft: "#ac7464",
            iconNameRight: "chevron-right",
            iconColorRight: "#ac7464"
        },
        {
            title: "Cambiar Contraseña",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ac7464",
            iconNameRight: "chevron-right",
            iconColorRight: "#ac7464"
        }
    ]
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#ac7464"
    }
})
