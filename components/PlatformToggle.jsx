import { View, Switch, Text, StyleSheet } from 'react-native'
import { useState } from 'react'

const ACTIVE_THUMB_COLOR = "#D50000"
const INACTIVE_THUMB_COLOR = "#f4f3f4"
const ACTIVE_TRACK_COLOR = "#FF8A80"
const INACTIVE_TRACK_COLOR = "#a2a2a2"

function PlatformToggle(props) {
    const [enabled, setEnabled] = useState(true)

    const toggleSwitch = () => {
        setEnabled(!enabled)
    }

    return (
        <View style={styles.row}>
            <Switch
                value={enabled}
                onValueChange={toggleSwitch}
                thumbColor={enabled ? ACTIVE_THUMB_COLOR : INACTIVE_THUMB_COLOR}
                trackColor={{true: ACTIVE_TRACK_COLOR, false: INACTIVE_TRACK_COLOR}}
                style={styles.switch}
                />
            <Text style={styles.label}>{props.label}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        maxHeight: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: '600'
    },
    switch: {
        marginRight: 5
    }
});

export default PlatformToggle