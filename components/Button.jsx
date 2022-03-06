import React, { useState } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
    const { title = 'Save', color = 'black', textColor = 'white', disabledColor = "#FF8A80" } = props;
    const [disabled, setDisabled] = useState(false)

    const onPress = async () => {
        if (!isDisabled()) {
            setDisabled(true)
            await props.onPress()
            setDisabled(false)
        }
    }

    const isDisabled = () => {
        const disabledProp = (props.disabled === true)
        return disabled || disabledProp
    }

    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: isDisabled() ? disabledColor : color,
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