import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { map } from 'lodash'
import { Icon, ListItem } from 'react-native-elements'

import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'

export default function AccountOption({ user, toastRef, setReloadUser }) {

    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    const generateOption = () => {
        return [
            {
                title: "Cambiar Nombres y Apellidos",
                iconNameLeft: "account-circle",
                iconColorLeft: "#ac7464",
                iconNameRight: "chevron-right",
                iconColorRight: "#ac7464",
                onPress: () => selectedComponent("displayName")
            },
            {
                title: "Cambiar Email",
                iconNameLeft: "at",
                iconColorLeft: "#ac7464",
                iconNameRight: "chevron-right",
                iconColorRight: "#ac7464",
                onPress: () => selectedComponent("displayEmail")
            },
            {
                title: "Cambiar Contraseña",
                iconNameLeft: "lock-reset",
                iconColorLeft: "#ac7464",
                iconNameRight: "chevron-right",
                iconColorRight: "#ac7464",
                onPress: () => selectedComponent("password")
            }
        ]
        
    }

    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                    setRenderComponent(
                        <ChangeDisplayNameForm
                            displayName= {user.displayName}
                            setShowModal= {setShowModal}
                            toastRef= {toastRef}
                            setReloadUser= {setReloadUser}
                        >
                        </ChangeDisplayNameForm>
                    )
                break;
            case "displayEmail":
                    setRenderComponent()
                break; 
            case "password":
                setRenderComponent()
            break;
            default:
                break;
        }
        setShowModal(true)
    }

    const menuOption = generateOption()
    
    return (
        <View>
            {
                map(menuOption, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
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
            <Modal
                isVisible={showModal}
                setVisible={setShowModal}
            >
                {
                    renderComponent
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#ac7464"
    }
})
