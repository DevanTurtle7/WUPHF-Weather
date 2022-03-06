import { View, Text, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function AddNotificationButton(props) {

    const onClick = () => {

    }

    return (
        <Pressable style={styles.row} onPress={onClick}>
            <Icon name="alarm-plus" size={30} style={styles.icon} />
            <Text style={styles.label}>Add new notification</Text>
        </Pressable>
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
    }
})

export default AddNotificationButton;