import React,{useState, useContext} from "react";
import {Pressable, Text, TextInput, View,Image  } from "react-native";
import Button from "./Button";


const Reminder=({navigation})=>{

    return (

            <View>
                <Pressable hitSlop={20} onPress={()=>navigation.navigate('Chart')}>
                    <Image source={require('./back.png')}></Image>
                </Pressable>
                <Text>Meeldetuletused</Text>
                <TextInput/>
                <TextInput/>
            <Button title="lol"/>
        </View>
    )
}

export default React.memo(Reminder)