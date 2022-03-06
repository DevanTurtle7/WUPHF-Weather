import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
    const { onPress, title = 'Save', color = 'black', textColor = 'white' } = props;

    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: color,
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