import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Fragment } from "react"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";

function AddNotificationButton(props) {

    const onClick = () => {

    }

    return (
        <Fragment>
            <Pressable style={styles.row} onPress={onClick}>
                <Icon name="alarm-plus" size={30} style={styles.icon} />
                <Text style={styles.label}>Add new notification</Text>

            </Pressable>

            <Modal isVisible={false} style={styles.modal}>
                <View style={styles.modalBody}>
                    <Text>His</Text>
                </View>
            </Modal>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 40,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    icon: {
        marginRight: 5
    },
    label: {
        fontSize: 18
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBody: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        width: '80%'
    }
})

export default AddNotificationButton;