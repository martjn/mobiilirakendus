import React, { useEffect,useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Chart from './Chart';
import Reminder from './Reminder';
import axios from "axios";
import { StatusBar } from "expo-status-bar";


const Navigation = () => {
  const [currentScreen, setCurrentScreen] = useState('Chart');

  const navigateTo = (screenName) => {
    setCurrentScreen(screenName);
  };

  return (
    <React.Fragment>
        <View style={styles.container}>
            {currentScreen === 'Chart' && <Chart navigation={{ navigate: navigateTo }} />}
            {currentScreen === 'Reminder' && <Reminder navigation={{ navigate: navigateTo }} />}
            <StatusBar style="auto" />
        </View>
      
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default Navigation;
