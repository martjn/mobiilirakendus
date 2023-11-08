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
        <View style={styles.back}>
            <Pressable 
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          onPress={() => navigation.navigate("Chart")}
        >
            <Image style={styles.icon} source={require("./back.png")} />
        </Pressable>
        
        </View>
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
    fontWeight:'bold',
    position:"absolute",
    top: '6%'
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
  icon:{
    height: 36,
    width:36
  },
  back:{
    position:"absolute",
    top: '6%',
    left: '2%'
  }
});

export default React.memo(Reminder);
