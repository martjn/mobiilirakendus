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

  const onReminderDelete = (idx) => {
    setReminders(
      reminders.filter((reminder, i) => {
        return i !== idx;
      })
    );
  };

  const devReset = () => {
    setReminders(["13:50", "17:00"]);
  };
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
        {reminders?.map((reminder, idx) => {
          return (
            <View key={idx}>
              <Text style={styles.reminders}>
                {reminder}
                <Button
                  style={styles.remindersButton}
                  onPress={() => {
                    onReminderDelete(idx);
                  }}
                >
                  x
                </Button>
              </Text>
            </View>
          );
        })}
        <Button
          style={styles.button}
          title="Lisa meeldetuletus"
          onPress={() => setOpen(true)}
        />
        <Button
          style={styles.button}
          title="Developer reset!!!"
          onPress={() => devReset()}
        />
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
    fontWeight: "bold",
    position: "absolute",
    top: "6%",
  },
  button: {
    width: "50%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    width: "70%",
    padding: 8,
    marginTop: 24,
  },
  icon: {
    height: 36,
    width: 36,
  },
  back: {
    position: "absolute",
    top: "6%",
    left: "2%",
  },
  back: {
    position: "absolute",
    top: "6%",
    left: "2%",
  },
  reminders: {
    borderWidth: 2,
    width: "70%",
  },
  remindersButton: {
    backgroundColor: "red",
    height: "auto",
    color: "black",
    paddingVertical: 0,
  },
});

export default React.memo(Reminder);
