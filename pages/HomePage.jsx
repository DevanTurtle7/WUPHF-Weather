import { StyleSheet, Text, View, TextInput } from 'react-native';
import PlatformToggle from '../components/PlatformToggle';
import AddNotificationButton from '../components/AddNotificationButton';
import LogoutButton from '../components/LogoutButton';

function HomePage({ navigation }) {
    return (
        <View style={styles.body}>
            <View style={styles.content}>
                <View style={styles.logoutRow}>
                    <LogoutButton navigation={navigation} />
                </View>
                <View style={styles.notificationSection}>
                    <Text style={styles.title}>Home</Text>
                    <Text style={styles.header}>Notifications</Text>
                    <AddNotificationButton />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 50
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 5
    },
    infoText: {
        fontSize: 18
    },
    notificationSection: {
        flex: 1,
        marginTop: 40
    },
    logoutRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        maxHeight: 50,
        marginTop: 90,
    },
    title: {
        fontSize: 36,
        fontWeight: "700",
        marginBottom: 30
    }
});

export default HomePage