import React from 'react'
import { Text, View, StyleSheet, TextInput} from 'react-native'

export default function UsernameInput({value, setValue, placeholder, secureTextEntry}){
    return (
        <View>
            <TextInput 
            value={value} 
            onChangeText={setValue} 
            placeholder={placeholder}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "gray",
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5, //spacing vertically when multiuple componensts
    },
    input: {}
})