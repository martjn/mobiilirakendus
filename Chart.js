import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Modal } from "react-native";
import { Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import Button from "./Button";
import DatePicker from "react-native-date-picker";

const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return `${date.getHours().toString().padStart(2, "0")}`;
};

const getFullDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return `${date
    .getFullYear()
    .toString()}-${date
    .getMonth()
    .toString()
    .padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${date.getHours().toString().padStart(2, "0")}`;
};

const getDisplayableDate = (date) => {
  let convertedDate;
  if (date) {
    convertedDate = date.substring(0, 10);
    return convertedDate;
  } else {
    return null;
  }
};

const changeDate = (date) => {
  let newStartDate = `${date.getFullYear().toString()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}T${date.getUTCHours().toString().padStart(2, "0")}%3A00`;
  let newEndDate = `${date.getFullYear().toString()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${(date.getDate() + 1).toString().padStart(2, "0")}`;
  console.log("newStartDdate => ", newStartDate);
  console.log("newEndDate =>", newEndDate);

  return { newStartDate: newStartDate, newEndDate: newEndDate };
};
 
const generateDate = (dateString) => {
  // Replace %3A with a colon (:) to make it a valid date format
  const formattedDateString = dateString.replace(/%3A/g, ":");

  // Create a new Date object from the formatted string
  const dateObject = new Date(formattedDateString);

  return dateObject;
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

const Chart = ({ navigation }) => {
  const [priceData, setPriceData] = useState([]);
  const [prices, setPrices] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  const today = new Date();

  const [startTime, setStartTime] = useState(
    `${today.getUTCFullYear()}-${
      today.getUTCMonth() + 1
    }-${today
      .getUTCDate()
      .toString()
      .padStart(2, "0")}T${today
      .getUTCHours()
      .toString()
      .padStart(2, "0")}%3A00`
  );
  const [endTime, setEndTime] = useState(
    `${today.getFullYear()}-${today.getMonth() + 1}-${(today.getDate() + 1)
      .toString()
      .padStart(2, "0")}`
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDateObject, setSelectedDateObject] = useState({});

  useEffect(() => {
    const extractedPrices = priceData.map((dataObject) => {
      return dataObject.price * 0.12;
    });
    const extractedTimestamps = priceData.map((dataObject) => {
      console.log(getFullDateFromTimestamp(dataObject.timestamp));
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
    console.log("priceData => ", priceData);
    console.log("priceData length => ", priceData.length);
  }, [priceData]);

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
  }, [startTime]);

  const toggleDateModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDateConfirm = () => {
    setModalVisible(!isModalVisible);
    setStartTime(selectedDateObject.newStartDate);
    setEndTime(selectedDateObject.newEndDate);
  };

  return (
    <>
      {startTime && (
        <Text style={{fontWeight:'bold', fontSize: 24}}>
          {getDisplayableDate(startTime)} kuni {endTime}
        </Text>
      )}
      <Text style={{fontWeight:'bold', fontSize: 24}}>Elektri börsihind senti/kWh</Text>
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
      <View style={{ flexDirection: "row" }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
          onRequestClose={toggleDateModal}
        >
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <DatePicker
              date={generateDate(startTime)}
              onDateChange={(date) => {
                let newDateObject = changeDate(date);
                setSelectedDateObject(newDateObject);
              }}
            />
            <View
              style={{
                flexDirection: "row",
                flex: 0,
                justifyContent: "center",
              }}
            >
              <Button title="Katkesta" onPress={toggleDateModal} />
              <Button title="Kinnita" onPress={handleDateConfirm} />
            </View>
          </View>
        </Modal>
        <Button title="Vali kuupäev" onPress={toggleDateModal} />
        <Button
          onPress={() => navigation.navigate("Reminder")}
          title="Meeldetuletused"
        ></Button>
      </View>
    </>
  );
};

export default React.memo(Chart);
