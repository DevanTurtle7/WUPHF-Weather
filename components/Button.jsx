import React, { useState } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
    const { title = 'Save', color = 'black', textColor = 'white', disabledColor = "#FF8A80" } = props;
    const [disabled, setDisabled] = useState(false)

    const onPress = async () => {
        console.log(1)
        if (!disabled) {
            console.log(2)
            setDisabled(true)
            console.log(3)
            await props.onPress()
            console.log(4)
            setDisabled(false)
            console.log(5)
        }
    }

    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: disabled ? disabledColor : color,
        },
        text: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: textColor,
        },
    });

    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}