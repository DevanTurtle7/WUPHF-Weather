import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import { Fragment, useState } from "react"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";

import Button from './Button';
import TextButton from './TextButton';

function AddNotificationButton(props) {
    const [modalOpen, setModalOpen] = useState(false)

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <Fragment>
            <Pressable style={styles.row} onPress={openModal}>
                <Icon name="alarm-plus" size={30} style={styles.icon} />
                <Text style={styles.label}>Add new notification</Text>
            </Pressable>

            <Modal isVisible={modalOpen} style={styles.modal}>
                <View style={styles.modalBody}>
                    <Text style={styles.header}>New Notification</Text>

                    <View style={styles.configContent}>
                        <Text style={styles.text}>Repeats every</Text>
                        <View style={styles.inputRow}>
                            <TextInput
                                placeholder="0"
                                keyboardType='number-pad'
                                style={styles.input} />
                            <Text style={styles.text}>days</Text>
                        </View>
                        <Text style={styles.text}>at</Text>
                        <Text style={styles.text}>Time</Text>
                    </View>

                    <View style={styles.footer}>
                        <TextButton title="Cancel" onPress={closeModal} />
                        <Button title="Add" />
                    </View>
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
        fontSize: 18,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBody: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        width: '90%'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    header: {
        fontSize: 24,
        fontWeight: "700",
        marginTop: 10
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        fontSize: 16,
        width: 40
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 18
    }, 
    configContent: {
        marginTop: 20,
        marginBottom: 20
    }
})

export default AddNotificationButton;