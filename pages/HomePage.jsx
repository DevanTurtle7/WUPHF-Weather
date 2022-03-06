import { StyleSheet, Text, View, TextInput } from 'react-native';
import PlatformToggle from '../components/PlatformToggle';

function HomePage() {
    return (
        <View style={styles.body}>
            <View style={styles.content}>
                <Text style={styles.header}>Notifications</Text>

                <Text style={styles.header}>Platforms</Text>
                <PlatformToggle label="Call" />
                <PlatformToggle label="Text" />
                <PlatformToggle label="Email" />
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
        marginBottom: 10
    }
});

export default HomePage