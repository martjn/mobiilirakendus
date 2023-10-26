import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000).toLocaleDateString("et-EE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
  });
  return date;
};

export default function App() {
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://dashboard.elering.ee/api/nps/price?start=2023-10-25T20%3A59%3A59.999Z&end=2023-10-26T20%3A59%3A59.999Z`
      )
      .then((response) => {
        setPriceData(response.data.data.ee);
        //console.log("priceData => ", priceData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text>
        {priceData.map((value) => {
          return (
            <Text>
              {getDateFromTimestamp(value.timestamp)}@{value.price}|
            </Text>
          );
        })}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
