import React, { useState, useContext } from "react";
import { Pressable, Text, View, Image, StyleSheet } from "react-native";
import Button from "./Button";
import DatePicker from "react-native-date-picker";
import PushNotification from "react-native-push-notification";

PushNotification.configure({
  // ...other configurations
  requestPermissions: true,
});


const Reminder = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [reminders, setReminders] = useState(["13:50", "17:00"]);

  const onDateConfirm = (selectedDate) => {
    // Convert selectedDate to timestamp
    const timestamp = selectedDate.getTime();
    const formattedTime = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Schedule the reminder
    scheduleReminder(timestamp, formattedTime);

    setDate(selectedDate);
    setOpen(false);
  };
 
  const scheduleReminder = (time, message) => {
    PushNotification.localNotificationSchedule({
      date: new Date(time),
      message: `Reminder at ${message}`,
    });

    // Update reminders state
    setReminders([...reminders, message]);
  };

  const onDateCancel = () => {
    setOpen(false);
  };

  const onReminderDelete = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
    // You might want to cancel the scheduled notification for this reminder as well
    // using PushNotification.cancelLocalNotifications({ id: reminderId });
  };

  const devReset = () => {
    setReminders(['13:50', '17:00']);
    // You might also want to clear all scheduled notifications here using PushNotification.cancelAllLocalNotifications();
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
            <View style={styles.innerContainer} key={idx}>
                <View style={styles.reminderItem}>
                    <Text style={styles.reminders}>
                    {reminder}</Text>
                    <Button title='X'
                    style={styles.remindersButton}
                    onPress={() => {
                        onReminderDelete(idx);
                    }}
                    ></Button>
                </View>
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
  innerContainer:{
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
    width: "50%",
    borderRadius:5,
    fontSize: 32,
    paddingLeft: '2%'
  },
  remindersButton: {
    backgroundColor: "#333",

    color: "#fff",
    marginTop: 0,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width:'11%',
    fontSize: 12
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft:'3%',
  }, 
});

export default React.memo(Reminder);
