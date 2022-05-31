/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, Alert } from 'react-native';
import { images, COLORS } from './constants';
import Cell from './src/components/Cell';

const emptyMap = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const copyArray = (original) => {
  const copy = original.map((arr) => {
    return arr.slice();
  });
  return copy;
};

const App = () => {

  const [map, setMap] = useState(emptyMap);

  const [currentTurn, setCurrentTurn] = useState('x');

  const [gameMode, setGameMode] = useState('BOT_MEDIUM');


  useEffect(() => {
    if (currentTurn === 'o' && gameMode !== 'LOCAL') {
      botTurn();
    }
  }, [currentTurn, gameMode]);

  useEffect(() => {
    const winner = getWiner(map);
    if (winner) {
      gameWin(winner);
    } else {
      checkTieState();
    }
  }, [map]);

  const onPress = (rowIndex, columnIndex) => {
    if (map[rowIndex][columnIndex] !== '') {
      Alert.alert('Posion Ocupada');
      return;
    }

    setMap((existMap) => {
      const updateMap = [...existMap];
      updateMap[rowIndex][columnIndex] = currentTurn;
      return updateMap;
    });

    setCurrentTurn(currentTurn === 'x' ? 'o' : 'x');

  };


  const getWiner = (winnerMap) => {

    for (let i = 0; i < 3; i++) {
      const isRowXWinning = winnerMap[i].every((cell) => cell === 'x');
      const isRowOWinning = winnerMap[i].every((cell) => cell === 'o');

      if (isRowOWinning) {
        return 'x';
      }

      if (isRowXWinning) {
        return 'o';
      }
    }

    for (let col = 0; col < 3; col++) {

      let isColumnXWiner = true;
      let isColumnOWiner = true;

      for (let row = 0; row < 3; row++) {
        if (winnerMap[row][col] !== 'x') {
          isColumnXWiner = false;
        }
        if (winnerMap[row][col] !== 'o') {
          isColumnOWiner = false;
        }
      }

      if (isColumnXWiner) {
        return 'x';

      }
      if (isColumnOWiner) {
        return 'o';
      }

    }

    let isDiagonal10Winning = true;
    let isDiagonal1XWinning = true;
    let isDiagonal20Winning = true;
    let isDiagonal2XWinning = true;

    for (let j = 0; j < 3; j++) {
      if (winnerMap[j][j] !== 'o') {
        isDiagonal10Winning = false;
      }
      if (winnerMap[j][j] !== 'x') {
        isDiagonal1XWinning = false;
      }
      if (winnerMap[j][2 - j] !== 'o') {
        isDiagonal20Winning = false;
      }
      if (winnerMap[j][2 - j] !== 'x') {
        isDiagonal2XWinning = false;
      }
    }
    if (isDiagonal10Winning || isDiagonal20Winning) {
      return 'o';
    }
    if (isDiagonal1XWinning || isDiagonal2XWinning) {
      return 'x';
    }



  };

  const checkTieState = () => {
    if (!map.some((row) => row.some((cell) => cell === ''))) {
      Alert.alert('Es un empate', 'Empate', [
        {
          text: 'Reiniciar',
          onPress: resetGames,
        },
      ]);
    }
  };

  const gameWin = (player) => {
    Alert.alert('Felicitaciones', `Player ${player} Ganador`, [
      {
        text: 'Reiniciar',
        onPress: resetGames,
      },
    ]);
  };

  const resetGames = () => {
    setMap([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setCurrentTurn('x');
  };

  const botTurn = () => {
    const possiblePositions = [];
    map.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell === '') {
          possiblePositions.push({ row: rowIndex, col: columnIndex });
        }
      });
    });

    let chosenOption;

    if (gameMode === 'BOT_MEDIUM') {
      possiblePositions.forEach((possiblePosition) => {
        const mapCopy = copyArray(map);

        mapCopy[possiblePosition.row][possiblePosition.col] = 'o';

        const winner = getWiner(mapCopy);
        if (winner === 'x') {
          chosenOption = possiblePosition;
        }
      });

      if (!chosenOption) {
        possiblePositions.forEach((possiblePosition) => {
          const mapCopy = copyArray(map);

          mapCopy[possiblePosition.row][possiblePosition.col] = 'x';

          const winner = getWiner(mapCopy);
          if (winner === 'o') {
            chosenOption = possiblePosition;
          }
        });
      }
    }

    if (!chosenOption) {
      chosenOption =
        possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    }

    if (chosenOption) {
      onPress(chosenOption.row, chosenOption.col);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={COLORS.primary} />
      <ImageBackground source={images.bg} style={styles.bg} resizeMode="contain" >
        <Text
          style={{
            fontSize: 24,
            color: COLORS.white,
            position: 'absolute',
            top: 50,
          }}
        >
          El Turno de : {currentTurn.toUpperCase()}
        </Text>
        <View style={styles.map}>

          {
            map.map((row, rowIndex) => (
              <View style={styles.row} key={`row-${rowIndex}`}>
                {row.map((cell, columnIndex) => (
                  <Cell cell={cell} onPress={() => onPress(rowIndex, columnIndex)} key={`row-${rowIndex}-col-${columnIndex}`} />
                ))
                }
              </View>
            ))
          }
        </View>

        <View style={styles.buttons}>
          <Text
            onPress={() => setGameMode('LOCAL')}
            style={[
              styles.button,
              { backgroundColor: gameMode === 'LOCAL' ? '#4F5686' : '#191F24' },
            ]}
          >
            Local
          </Text>
          <Text
            onPress={() => setGameMode('BOT_MEDIUM')}
            style={[
              styles.button,
              {
                backgroundColor:
                  gameMode === 'BOT_MEDIUM' ? '#4F5686' : '#191F24',
              },
            ]}
          >
            Contra el Celular
          </Text>
        </View>
      </ImageBackground>

    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  map: {
    width: '80%',
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
  },
  button: {
    color: 'white',
    margin: 10,
    fontSize: 16,
    backgroundColor: '#191F24',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },


});