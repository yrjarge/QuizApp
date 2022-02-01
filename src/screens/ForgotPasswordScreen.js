import React, {useState} from "react";
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import UsernameInput from "../components/usernameinput";
import CustomButton from "../components/custombutton";
import SomeButtons from "../components/somebuttons";
export default function ForgotPasswordScreen({navigation}){
    const [username, setUsername] = useState('');
    const onSendPressed = () => {
        navigation.navigate("Reset Password");
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text style={styles.title}>Reset your Password</Text>
            <UsernameInput 
            placeholder="Insert Username" 
            value={username} 
            setValue={setUsername} 
            secureTextEntry={true}/>  
            <CustomButton text="Send" onPress={onSendPressed} />
            
        </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 0,
        backgroundColor: 'white'
    },
    logo: {
        width: '70%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#051C60",
        margin: 10,
    }

})