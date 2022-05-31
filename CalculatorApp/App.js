/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, StatusBar } from 'react-native';
import { ThemeContext } from './src/context/themeContext';
import { myColors } from './src/styles/Colors';
import MykeyBoard from './src/components/MykeyBoard';



const App = () => {

  const [theme, setTheme] = useState('light');

  return (

    <ThemeContext.Provider value={theme}>
      <View style={theme === 'light' ? styles.container : [styles.container, { backgroundColor: myColors.dark }]}>
        <StatusBar backgroundColor={theme === 'light' ? 'transparent' : 'transparent'} barStyle={theme === 'light' ? 'dark-content' : 'light-content'} translucent />
        <Switch
          value={theme === 'light'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          style={{ marginTop: 40, transform: [{ scaleX: 1.3 }, { scaleY: 1.2 }] }}
          trackColor={{ false: myColors.white, true: myColors.dark }}
          thumbColor={theme === 'light' ? myColors.light : myColors.light}
        />

        <MykeyBoard />
      </View>
    </ThemeContext.Provider>
  );
};

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});