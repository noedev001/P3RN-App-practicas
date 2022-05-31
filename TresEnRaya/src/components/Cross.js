/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants';

const Cross = () => {
    return (
        <View style={styles.cross}>
            <View style={styles.crossLine} />
            <View style={styles.crossLineReserved} />
        </View>
    );
};

export default Cross;

const styles = StyleSheet.create({
    cross: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    crossLine: {
        position: 'absolute',
        width: 12,
        height: 85,
        backgroundColor: COLORS.white,
        transform: [{ rotate: '45deg' }],
        borderRadius: 10,
    },
    crossLineReserved: {
        position: 'absolute',
        width: 12,
        height: 85,
        backgroundColor: COLORS.white,
        transform: [{ rotate: '-45deg' }],
        borderRadius: 10,
    },
});