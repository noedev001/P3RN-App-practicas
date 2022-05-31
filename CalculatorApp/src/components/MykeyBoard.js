/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Button from './Button';
import { Styles } from '../styles/GlobarlStyles';
import { myColors } from '../styles/Colors';
const MykeyBoard = () => {

    const [firstNumber, setFirstNumber] = useState('');
    const [secondNumber, setSecondsNumber] = useState('');
    const [operation, setOperation] = useState('');
    const [result, setResult] = useState(null);

    const handleNumberPress = (buttonValue) => {
        if (firstNumber.length < 10) {
            setFirstNumber(firstNumber + buttonValue);
        }
    };

    const handleOperationPress = (buttonValue) => {
        setOperation(buttonValue);
        setSecondsNumber(firstNumber);
        setFirstNumber('');
    };

    const clear = () => {
        setFirstNumber('');
        setSecondsNumber('');
        setOperation('');
        setResult(null);
    };

    const getResult = () => {
        switch (operation) {
            case '+':
                clear();
                setResult(parseInt(secondNumber) + parseInt(firstNumber));
                break;
            case '-':
                clear();
                setResult(parseInt(secondNumber) - parseInt(firstNumber));
                break;
            case '*':
                clear();
                setResult(parseInt(secondNumber) * parseInt(firstNumber));
                break;
            case '/':
                clear();
                setResult(parseInt(secondNumber) / parseInt(firstNumber));
                break;
            default:
                clear();
                setResult(0);
                break;
        }
    };

    const firstNumberDisplay = () => {
        if (result != null) {
            return (
                <Text style={result < 99999 ? [Styles.screenFirsNumber, { color: myColors.result }] : [Styles.screenFirsNumber, { fontSize: 50, color: myColors.result }]}>
                    {result}
                </Text>
            );
        }
        if (firstNumber && firstNumber.length < 6) {
            return (
                <Text style={Styles.screenFirsNumber}>{firstNumber}</Text>
            );
        }
        if (firstNumber === '') {
            return (
                <Text style={Styles.screenFirsNumber}>0</Text>
            );
        }
        if (firstNumber.length > 5 && firstNumber.length < 8) {
            return (
                <Text style={[Styles.screenFirsNumber, { fontSize: 70 }]}>{firstNumber}</Text>
            );
        }
        if (firstNumber.length > 7) {
            return (
                <Text style={[Styles.screenFirsNumber, { fontSize: 50 }]}>{firstNumber}</Text>
            );
        }
    };

    return (
        <View style={Styles.viewbottom}>

            <View style={{ height: 120, width: '90%', justifyContent: 'flex-end', alignSelf: 'center' }}>
                <Text style={Styles.screenSecondNumber}>
                    {secondNumber}
                    <Text style={{ color: 'purple', fontSize: 50, fontWeight: '500' }}>{operation}</Text>
                </Text>
                {firstNumberDisplay()}
            </View>

            <View style={Styles.row}>
                <Button title="C" isGray onPress={clear} />
                <Button title="+/-" isGray onPress={() => handleOperationPress('+/-')} />
                <Button title="%" isGray onPress={() => handleOperationPress('%')} />
                <Button title="+" isBlue isGray onPress={() => handleOperationPress('/')} />
            </View>
            <View style={Styles.row}>
                <Button title="7" onPress={() => handleNumberPress('7')} />
                <Button title="8" onPress={() => handleNumberPress('8')} />
                <Button title="9" onPress={() => handleNumberPress('9')} />
                <Button title="*" isBlue onPress={() => handleOperationPress('*')} />
            </View>
            <View style={Styles.row}>
                <Button title="4" onPress={() => handleNumberPress('4')} />
                <Button title="5" onPress={() => handleNumberPress('5')} />
                <Button title="6" onPress={() => handleNumberPress('6')} />
                <Button title="-" isBlue onPress={() => handleOperationPress('-')} />
            </View>
            <View style={Styles.row}>
                <Button title="1" onPress={() => handleNumberPress('1')} />
                <Button title="2" onPress={() => handleNumberPress('2')} />
                <Button title="3" onPress={() => handleNumberPress('3')} />
                <Button title="+" isBlue onPress={() => handleOperationPress('+')} />
            </View>
            <View style={Styles.row}>
                <Button title="." onPress={() => handleNumberPress('.')} />
                <Button title="0" onPress={() => handleNumberPress('0')} />
                <Button title="«" onPress={() => setFirstNumber(firstNumber.slice(0, -1))} />
                <Button title="=" isBlue onPress={() => getResult()} />
            </View>
        </View>
    );
};

export default MykeyBoard;

