import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";

const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return `${date.getHours().toString().padStart(2, "0")}`;
};

const chartConfig = {
  backgroundColor: "#f1f1f1",
  backgroundGradientFrom: "#f1f1f1",
  backgroundGradientTo: "#f1f1f1",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 1,
  },
  propsForDots: {
    r: "3",
    strokeWidth: "2",
    stroke: "#A1A1A1",
  },
};

const Chart = () => {
  const [priceData, setPriceData] = useState([]);
  const [prices, setPrices] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  useEffect(() => {
    const today = new Date();
    setStartTime(
      `${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today
        .getDate()
        .toString()
        .padStart(2, "0")}T${today.getHours().toString().padStart(2, "0")}%3A00`
    );
    setEndTime(
      `${today.getFullYear()}-${today.getMonth() + 1}-${(today.getDate() + 1)
        .toString()
        .padStart(2, "0")}`
    );
  }, []);

  useEffect(() => {
    console.log("startTime =>", startTime);
    console.log("endTime =>", endTime);
    axios
      .get(
        `https://dashboard.elering.ee/api/nps/price?start=${startTime}%3A00.999Z&end=${endTime}T23%3A59%3A59.999Z`
      )
      .then((response) => {
        setPriceData(response.data.data.ee);
      })
      .catch((error) => {
        console.error("API request error: ", error);
      });
  }, []);

  useEffect(() => {
    const extractedPrices = priceData.map((dataObject) => {
      return dataObject.price;
    });
    const extractedTimestamps = priceData.map((dataObject) => {
      return getDateFromTimestamp(dataObject.timestamp);
    });
    let modifiedTimestamps = [];
    for (let i = 0; i < extractedTimestamps.length; i++) {
      if (i % 2 == 0) {
        modifiedTimestamps.push(extractedTimestamps[i]);
      }
    }
    setPrices(extractedPrices);
    setTimestamps(modifiedTimestamps);
  }, [priceData]);

  return (
    <>
      <Text>Börsi kurss</Text>
      <LineChart
        data={{
          labels:
            timestamps.length != 0
              ? timestamps.map((timestamp) => {
                  return timestamp;
                })
              : ["????"],
          datasets: [
            {
              data: prices.length != 0 ? prices : [1, 2, 3, 4],
            },
          ],
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={Dimensions.get("window").height / 2}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        fromZero
        style={{
          marginVertical: 4,
          borderRadius: 4,
        }}
        yLabelsOffset={5}
      />
    </>
  );
};

export default React.memo(Chart);
