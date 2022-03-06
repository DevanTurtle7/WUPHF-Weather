import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import { Fragment, useState } from "react"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';

import Button from './Button';
import TextButton from './TextButton';

function AddNotificationButton(props) {
    const [modalOpen, setModalOpen] = useState(false)
    const [hours, setHours] = useState(-1)
    const [minutes, setMinutes] = useState(-1)
    const [offset, setOffset] = useState(-1)

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = (event, selectedDate) => {
        const hours = selectedDate.getUTCHours()
        const minutes = selectedDate.getUTCMinutes()
        const offset = selectedDate.getTimezoneOffset()

        setHours(hours)
        setMinutes(minutes)
        setOffset(offset)

        setModalOpen(false)
    }

    const getTimePicker = () => {
        if (modalOpen) {
            return (
                <DateTimePicker
                value={new Date(0)}
                mode="time"
                onChange={closeModal}
                />
            )
        } else {
            return (null)
        }
    }

    const getButtonText = () => {
        if (hours === -1 || minutes === -1) {
            return "Add new notification"
        } else {
            return "Edit notification"
        }
    }
    
    const getNotificationLabel = () => {
        if (hours === -1 || minutes === -1) {
            return (null)
        } else {
            return (<Text style={styles.text}>Current timer: {hours - offset}:{minutes}</Text>)
        }
    }

    return (
        <Fragment>
            {getNotificationLabel()}
            <Pressable style={styles.row} onPress={openModal}>
                <Icon name="alarm-plus" size={30} style={styles.icon} />
                <Text style={styles.label}>{getButtonText()}</Text>
            </Pressable>
            {getTimePicker()}
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
        fontSize: 18,
        marginBottom: 5,
    }, 
    configContent: {
        marginTop: 20,
        marginBottom: 20
    }
})

export default AddNotificationButton;