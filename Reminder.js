import React, { useState, useContext } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
} from "react-native";
import Button from "./Button";
import DatePicker from "react-native-date-picker";

const Reminder = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <Pressable
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          onPress={() => navigation.navigate("Chart")}
        ></Pressable>
        <Image source={require("./back.png")} />
        <Text style={styles.title}>Meeldetuletused</Text>
        <Text style={styles.subtitle}>Lisa meeldetuletus</Text>
        <TextInput style={styles.input} />
        <Button title="Lisa" />
      </View>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
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
});

export default React.memo(Reminder);
