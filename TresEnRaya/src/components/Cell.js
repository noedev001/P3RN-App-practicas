/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { COLORS } from '../../constants';
import Cross from './Cross';

const Cell = (props) => {
    const { cell, onPress } = props;
    return (
        <Pressable style={styles.cell} onPress={onPress} >
            {cell === 'o' && <View style={styles.circle} />}
            {cell === 'x' && <Cross />}
        </Pressable>
    );
};

export default Cell;

const styles = StyleSheet.create({
    cell: {
        width: 100,
        height: 100,
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        flex: 1,
        width: 80,
        height: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderWidth: 10,
        borderColor: COLORS.white,
    },
});