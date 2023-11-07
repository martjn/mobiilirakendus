import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import Navigation from "./Navigation";

export default function App() {
  return (
    <Navigation></Navigation>
  );
}

//<View style={styles.container}>
//      <Reminder />
//      <StatusBar style="auto" />
//    </View>