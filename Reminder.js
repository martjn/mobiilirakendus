import React, { useState, useContext } from "react";
import { Pressable, Text, View, Image, StyleSheet } from "react-native";
import Button from "./Button";
import DatePicker from "react-native-date-picker";

const Reminder = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [reminders, setReminders] = useState(["13:50", "17:00"]);

  const onDateConfirm = (date) => {
    setDate(date);
    setOpen(false);
    console.log("set date =>", date);
  };
  const onDateCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <View style={styles.container}>
        <Pressable
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          onPress={() => navigation.navigate("Chart")}
        ></Pressable>
        <Image source={require("./back.png")} />
        <Text style={styles.title}>Meeldetuletused</Text>
        {reminders?.map((reminder, idx) => {
          return (
            <View key={idx}>
              <Text style={styles.reminders}>{reminder}</Text>
            </View>
          );
        })}
        <Text style={styles.subtitle}>Lisa meeldetuletus</Text>
        <Button title="Lisa" onPress={() => setOpen(true)} />
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(selectedDate) => {
          onDateConfirm(selectedDate);
        }}
        onCancel={() => {
          onDateCancel();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    width: "70%",
    padding: 8,
    marginTop: 24,
  },
  reminders: {
    borderWidth: 2,
    width: "70%",
  },
});

export default React.memo(Reminder);
